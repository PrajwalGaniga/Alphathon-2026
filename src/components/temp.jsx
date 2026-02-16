import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './App.module.css';
import Hero from './components/Hero/Hero';
import Mission from './sections/Mission/Mission';
import Timeline from './sections/Timeline/Timeline';
import Pools from './sections/Pool/Pools';
import Winners from './sections/Winners/Winners';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize Audio once
  useEffect(() => {
    audioRef.current = new Audio("/Avengers.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Start at 50% volume for better UX

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Browser policy requires user interaction to play audio
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <main className={styles.container}>
      
      {/* --- MUSIC CONTROLLER (Fixed) --- */}
      <button 
        className={`${styles.musicBtn} ${isPlaying ? styles.playing : ''}`} 
        onClick={toggleMusic}
        title={isPlaying ? "Pause Music" : "Play Avengers Theme"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        
        {/* Optional: Sound Wave Visualizer Animation when playing */}
        {isPlaying && (
          <span className={styles.soundWave}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </span>
        )}
      </button>

      {/* --- PAGE SECTIONS --- */}
      <Hero />
      <Mission />
      <Timeline />
      <Pools />
      <Winners />

    </main>
  );
}

export default App;