import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';

const CrossfaderComponent = ({ value, onChange }) => {
  const handleValueChange = (newValue) => {
    onChange(newValue[0]);
  };

  const getGradientPosition = () => {
    // Convert value from -100,100 to 0,100 for gradient
    return ((value + 100) / 200) * 100;
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg font-bold tracking-wider">
          CROSSFADER
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual indicator */}
        <div className="relative h-16 bg-gray-800 rounded-lg overflow-hidden">
          <div 
            className="absolute inset-y-0 transition-all duration-150 ease-out"
            style={{
              left: value < 0 ? '0%' : '50%',
              width: value < 0 ? '50%' : `${((value + 100) / 200) * 50}%`,
              background: value < 0 
                ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' 
                : 'linear-gradient(90deg, #1d4ed8, #7c3aed)'
            }}
          />
          
          {/* Center line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white opacity-50 transform -translate-x-0.5" />
          
          {/* Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium">
            <span className={`transition-colors ${value < -50 ? 'text-white' : 'text-gray-400'}`}>
              DECK A
            </span>
            <span className={`transition-colors ${value > 50 ? 'text-white' : 'text-gray-400'}`}>
              DECK B
            </span>
          </div>
        </div>

        {/* Crossfader Slider */}
        <div className="space-y-4">
          <div className="relative">
            <Slider
              value={[value]}
              onValueChange={handleValueChange}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Position indicator */}
          <div className="text-center">
            <span className="text-2xl font-mono font-bold">
              {value.toString().padStart(3, value >= 0 ? ' ' : '')}
            </span>
          </div>
        </div>

        {/* Mix level indicators */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex flex-col items-center space-y-1">
            <div className="text-blue-400 font-medium">A</div>
            <div className="w-12 h-2 bg-gray-700 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-150"
                style={{ width: `${Math.max(0, 100 + value)}%` }}
              />
            </div>
            <span className="text-gray-400">{Math.max(0, 100 + value)}%</span>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <div className="text-purple-400 font-medium">B</div>
            <div className="w-12 h-2 bg-gray-700 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500 transition-all duration-150"
                style={{ width: `${Math.max(0, 100 - value)}%` }}
              />
            </div>
            <span className="text-gray-400">{Math.max(0, 100 - value)}%</span>
          </div>
        </div>

        {/* Quick mix buttons */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => onChange(-100)}
            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            A
          </button>
          <button
            onClick={() => onChange(0)}
            className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded transition-colors"
          >
            CENTER
          </button>
          <button
            onClick={() => onChange(100)}
            className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-700 rounded transition-colors"
          >
            B
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrossfaderComponent;