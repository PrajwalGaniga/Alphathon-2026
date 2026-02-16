import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  // --- HANDLER: SMOOTH EXIT ---
  const handleVideoEnd = () => {
    setIsExiting(true);
    // Wait for the fade-out animation before unmounting
    setTimeout(onComplete, 1000);
  };

  // --- SAFETY NET ---
  // Forces entry if video takes too long (e.g., slow connection)
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isExiting) handleVideoEnd();
    }, 9000); // Set slightly longer than your video duration

    return () => clearTimeout(safetyTimer);
  }, [isExiting]);

  return (
    <motion.div 
      className={styles.loaderWrapper}
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <video
        ref={videoRef}
        className={styles.cinematicVideo}
        src="/alphathon.mp4" 
        autoPlay
        muted
        playsInline // Crucial for iOS/Mobile to prevent fullscreen takeover
        onEnded={handleVideoEnd}
      />
      
      {/* Skip Button - Appears gracefully */}
      <motion.button
        className={styles.skipBtn}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={handleVideoEnd}
      >
        ENTER SITE &gt;&gt;
      </motion.button>
    </motion.div>
  );
};

export default Preloader;