// Mock data for DJ app - simulating S3 URI array stored in JSON
export const mockTracks = [
  {
    id: 1,
    title: "Electric Dreams",
    artist: "Synth Wave",
    duration: "4:32",
    genre: "Electronic",
    bpm: 128,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  },
  {
    id: 2,
    title: "Midnight Groove",
    artist: "Deep House Collective",
    duration: "5:18",
    genre: "House",
    bpm: 122,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  },
  {
    id: 3,
    title: "Bass Drop",
    artist: "EDM Masters",
    duration: "3:45",
    genre: "Dubstep",
    bpm: 140,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  },
  {
    id: 4,
    title: "Smooth Operator",
    artist: "Jazz Fusion",
    duration: "6:12",
    genre: "Jazz",
    bpm: 95,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  },
  {
    id: 5,
    title: "Techno Thunder",
    artist: "Industrial Beats",
    duration: "4:55",
    genre: "Techno",
    bpm: 132,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  },
  {
    id: 6,
    title: "Chillout Vibes",
    artist: "Ambient Sounds",
    duration: "7:20",
    genre: "Ambient",
    bpm: 85,
    s3Uri: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Using free sample
    waveform: Array.from({length: 100}, (_, i) => Math.random() * 100)
  }
];

export const djSettings = {
  crossfaderPosition: 0, // -100 to 100 (left to right)
  masterVolume: 75,
  deckAVolume: 80,
  deckBVolume: 80
};