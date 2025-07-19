import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Play, Pause, Square, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const DeckComponent = ({ 
  deckId, 
  track, 
  volume, 
  onVolumeChange, 
  isActive,
  onTrackEnd 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.s3Uri;
      audioRef.current.load();
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (value) => {
    const newTime = (value[0] / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={`h-full transition-all duration-300 ${isActive ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <CardContent className="p-6 h-full flex flex-col">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            onTrackEnd && onTrackEnd();
          }}
          onLoadedMetadata={handleTimeUpdate}
        />

        {/* Deck Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <h3 className="font-bold text-lg">DECK {deckId}</h3>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {track?.bpm || 0} BPM
          </Badge>
        </div>

        {/* Track Info */}
        {track && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
            <h4 className="font-semibold text-lg truncate">{track.title}</h4>
            <p className="text-gray-600 truncate">{track.artist}</p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{track.genre}</span>
              <span>{track.duration}</span>
            </div>
          </div>
        )}

        {/* Waveform Visualization */}
        <div className="mb-6 h-20 bg-black rounded-lg p-2 relative overflow-hidden">
          <div className="flex items-end justify-center h-full space-x-1">
            {track?.waveform.slice(0, 50).map((height, index) => (
              <div
                key={index}
                className={`w-1 transition-all duration-150 ${
                  index < (progressPercentage / 2) 
                    ? 'bg-gradient-to-t from-blue-400 to-purple-400' 
                    : 'bg-gray-600'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          {/* Progress Line */}
          <div 
            className="absolute top-0 w-0.5 h-full bg-white opacity-75 transition-all duration-100"
            style={{ left: `${progressPercentage / 2}%` }}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[progressPercentage]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Button variant="outline" size="sm">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button onClick={handleStop} variant="outline" size="sm">
            <Square className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="mt-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">Volume</span>
          </div>
          <Slider
            value={[volume]}
            onValueChange={(value) => onVolumeChange(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-500 mt-1">
            {volume}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeckComponent;