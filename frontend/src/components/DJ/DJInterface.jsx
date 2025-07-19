import React, { useState } from 'react';
import DeckComponent from './DeckComponent';
import CrossfaderComponent from './CrossfaderComponent';
import TrackBrowser from './TrackBrowser';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Volume2, Settings } from 'lucide-react';
import { djSettings } from '../../data/mock';

const DJInterface = () => {
  const [trackA, setTrackA] = useState(null);
  const [trackB, setTrackB] = useState(null);
  const [crossfaderValue, setCrossfaderValue] = useState(djSettings.crossfaderPosition);
  const [masterVolume, setMasterVolume] = useState(djSettings.masterVolume);
  const [deckAVolume, setDeckAVolume] = useState(djSettings.deckAVolume);
  const [deckBVolume, setDeckBVolume] = useState(djSettings.deckBVolume);

  const handleTrackSelect = (deck, track) => {
    if (deck === 'A') {
      setTrackA(track);
    } else {
      setTrackB(track);
    }
  };

  const getActiveDeck = () => {
    if (crossfaderValue < -25) return 'A';
    if (crossfaderValue > 25) return 'B';
    return 'both';
  };

  const activeDeck = getActiveDeck();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DJ MIXER PRO
          </h1>
          <p className="text-gray-300">Professional Multi-Audio DJ Experience</p>
        </div>

        {/* Master Controls */}
        <Card className="bg-black/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Master Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-4">
                <Volume2 className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Master Volume</span>
                <div className="w-32">
                  <Slider
                    value={[masterVolume]}
                    onValueChange={(value) => setMasterVolume(value[0])}
                    max={100}
                    className="w-full"
                  />
                </div>
                <Badge variant="secondary">{masterVolume}%</Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Active:</span>
                <Badge 
                  variant={activeDeck === 'A' ? 'default' : activeDeck === 'B' ? 'secondary' : 'outline'}
                  className="uppercase"
                >
                  {activeDeck === 'both' ? 'Mixed' : `Deck ${activeDeck}`}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main DJ Interface */}
        <div className="grid grid-cols-12 gap-6 min-h-[600px]">
          
          {/* Deck A */}
          <div className="col-span-4">
            <DeckComponent
              deckId="A"
              track={trackA}
              volume={deckAVolume}
              onVolumeChange={setDeckAVolume}
              isActive={activeDeck === 'A' || activeDeck === 'both'}
            />
          </div>

          {/* Crossfader & Controls */}
          <div className="col-span-4 space-y-6">
            <CrossfaderComponent
              value={crossfaderValue}
              onChange={setCrossfaderValue}
            />
            
            {/* Track Browser */}
            <div className="h-96">
              <TrackBrowser
                onTrackSelect={handleTrackSelect}
                selectedTrackA={trackA}
                selectedTrackB={trackB}
              />
            </div>
          </div>

          {/* Deck B */}
          <div className="col-span-4">
            <DeckComponent
              deckId="B"
              track={trackB}
              volume={deckBVolume}
              onVolumeChange={setDeckBVolume}
              isActive={activeDeck === 'B' || activeDeck === 'both'}
            />
          </div>
        </div>

        {/* Status Bar */}
        <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
          <CardContent className="py-3">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center space-x-6">
                <span>Status: Ready</span>
                <span>Tracks Loaded: {[trackA, trackB].filter(Boolean).length}/2</span>
              </div>
              <div className="flex items-center space-x-6">
                <span>Sample Rate: 44.1 kHz</span>
                <span>Latency: Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DJInterface;