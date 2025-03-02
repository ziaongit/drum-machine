import { useState, useEffect } from "react";

interface DrumPad {
  key: string;
  sound: string;
  src: string;
}

const drumPads: DrumPad[] = [
  { key: "Q", sound: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3" },
  { key: "S", sound: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];

const DrumMachine: React.FC = () => {
  const [display, setDisplay] = useState<string>("Press a key");

  const playSound = (key: string, sound: string) => {
    const audio = document.getElementById(key) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(sound);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const pad = drumPads.find((pad) => pad.key === event.key.toUpperCase());
    if (pad) {
      playSound(pad.key, pad.sound);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">{display}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <button
            key={pad.key}
            className="drum-pad"
            id={pad.sound}
            onClick={() => playSound(pad.key, pad.sound)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;