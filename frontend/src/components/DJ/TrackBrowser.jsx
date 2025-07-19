import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, Music, Clock, Zap } from 'lucide-react';
import { mockTracks } from '../../data/mock';

const TrackBrowser = ({ onTrackSelect, selectedTrackA, selectedTrackB }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', ...new Set(mockTracks.map(track => track.genre))];
  
  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const isTrackLoaded = (trackId) => {
    return selectedTrackA?.id === trackId || selectedTrackB?.id === trackId;
  };

  return (
    <Card className="h-full bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Music className="w-5 h-5" />
          <span>Track Browser</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tracks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className="text-xs"
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Track List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTracks.map(track => (
            <div
              key={track.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                isTrackLoaded(track.id) 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{track.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{track.artist}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{track.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{track.bpm} BPM</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {track.genre}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant={selectedTrackA?.id === track.id ? "default" : "outline"}
                      onClick={() => onTrackSelect('A', track)}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      Load A
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedTrackB?.id === track.id ? "default" : "outline"}
                      onClick={() => onTrackSelect('B', track)}
                      className="text-xs px-2 py-1 h-auto"
                    >
                      Load B
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No tracks found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackBrowser;