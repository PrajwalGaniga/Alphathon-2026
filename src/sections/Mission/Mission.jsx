import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldAlert, ThermometerSun, 
  CheckCircle, Brain, Download, 
  AlertTriangle 
} from 'lucide-react';
import styles from './Mission.module.css';

const Mission = () => {
  // STATES: 'origin' (Story) | 'snapping' (Flash) | 'renaissance' (Main Content)
  const [timeline, setTimeline] = useState('origin'); 

  const handleThanosSnap = () => {
    setTimeline('snapping');

    // TIMING: 2.5s for the GIF snap animation + flash build-up
    setTimeout(() => {
      setTimeline('renaissance');
    }, 2800); 
  };

  return (
    <section className={styles.missionWrapper}>
      <div className={styles.fixedBackground}></div>

      {/* --- PHASE 1: THE ORIGIN STORY (Pre-Snap) --- */}
      <AnimatePresence mode="wait">
        {timeline === 'origin' && (
          <motion.div 
            key="prologue"
            className={styles.prologueWrapper}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1, transition: { duration: 1.5 } }}
          >
            <Prologue />
            
            {/* THE THANOS TRIGGER */}
            <div className={styles.thanosContainer}>
              <p className={styles.snapInstruction}>CLICK THE GAUNTLET TO REWRITE HISTORY</p>
              <motion.button 
                className={styles.gauntletBtn}
                onClick={handleThanosSnap}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/thanos.gif" alt="Thanos Snap" className={styles.gauntletImg} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PHASE 2: THE WHITE FLASH TRANSITION --- */}
      <AnimatePresence>
        {timeline === 'snapping' && (
          <motion.div 
            className={styles.whiteFlash}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }} // Slow cinematic fade out
          />
        )}
      </AnimatePresence>

      {/* --- PHASE 3: THE RENAISSANCE (Post-Snap) --- */}
      {timeline === 'renaissance' && (
        <motion.div 
          className={styles.newWorldContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* THEME REVEAL */}
          <ThemeReveal />

          {/* DIAGNOSTICS */}
          <DiagnosticsGrid />

          {/* MISSION (HULK) */}
          <HulkCTA />
        </motion.div>
      )}
      
    </section>
  );
};

// --- SUB-COMPONENTS ---

const Prologue = () => {
  return (
    <div className={styles.prologueContainer}>
      <div className={styles.storyLine}>
        <motion.div 
          className={styles.storyBlock}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className={styles.chapterLabel}>CHAPTER 01: THE ORIGIN</span>
          <h2>5,000 Years Ago...</h2>
          <p>
            The sages didn't see the body as a machine that counts calories. 
            They saw a <strong>living ecosystem</strong> governed by nature.
          </p>
        </motion.div>

        <motion.div 
          className={styles.storyBlockRight}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2>But Today...</h2>
          <p>
            We have more health apps than ever, yet we are sicker. 
            We track "numbers" but ignore "nature."
          </p>
        </motion.div>

        <motion.div 
          className={styles.storyCenter}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h1 className={styles.glitchTitle}>WE LOST THE MANUAL.</h1>
          <p className={styles.glitchSub}>System Critical. Reboot Required.</p>
        </motion.div>
      </div>
    </div>
  );
};

const ThemeReveal = () => {
  return (
    <div className={styles.revealContainer}>
      <motion.div 
        className={styles.mandalaLayer}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      <div className={styles.revealContent}>
        <motion.span 
          className={styles.themeTag}
          initial={{ opacity: 0, letterSpacing: "10px" }}
          animate={{ opacity: 1, letterSpacing: "4px" }}
          transition={{ duration: 1 }}
        >
          DECODING ANCIENT WISDOM FOR THE MODERN WORLD
        </motion.span>
        
        <motion.h1 
          className={styles.themeTitle}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          THE AYURVEDA <br />
          <span className={styles.goldText}>RENAISSANCE</span>
        </motion.h1>

        <motion.div 
          className={styles.sanskritBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>शरीरमाद्यं खलु धर्मसाधनम्</p>
          <small>"The body is the primary instrument for fulfilling all duties."</small>
        </motion.div>
      </div>
    </div>
  );
};

const DiagnosticsGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const diagnostics = [
    {
      id: 1,
      error: "STATIC_DIAGNOSTICS",
      problem: "Apps only check birth nature (Prakriti) but fail to detect current stress (Vikriti).",
      patch: "REAL-TIME IMBALANCE DETECTION",
      icon: <Activity />
    },
    {
      id: 2,
      error: "FATAL_INTERACTION",
      problem: "Mixing Ashwagandha with modern meds blindly? That's a safety blindspot.",
      patch: "AI DRUG-HERB INTERACTION CHECKER",
      icon: <ShieldAlert />
    },
    {
      id: 3,
      error: "SEASONAL_SYNC_FAIL",
      problem: "Eating ice cream in winter? Ignoring Ritucharya crushes immunity.",
      patch: "DYNAMIC SEASONAL SYNC",
      icon: <ThermometerSun />
    },
    {
      id: 4,
      error: "TRUST_DEFICIT",
      problem: "Is that oil fake? Consumers have no way to verify authenticity.",
      patch: "BLOCKCHAIN / VERIFIED SOURCE",
      icon: <CheckCircle />
    },
    {
      id: 5,
      error: "MIND_ALGO_ERROR",
      problem: "Generic meditation makes 'Kapha' lazy and 'Vata' anxious.",
      patch: "DOSHA-SPECIFIC MIND THERAPY",
      icon: <Brain />
    }
  ];

  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridHeader}>
        <h3>2. THE REALITY CHECK</h3>
        <p>Modern Tech Fails Here. Hover to Run Diagnostics.</p>
      </div>

      <div className={styles.grid}>
        {diagnostics.map((item, index) => (
          <motion.div 
            key={index}
            className={`${styles.card} ${hoveredIndex === index ? styles.cardActive : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div 
              className={styles.scanLine}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className={styles.cardHeader}>
              <div className={hoveredIndex === index ? styles.iconSuccess : styles.iconDanger}>
                {item.icon}
              </div>
              <span className={styles.errorCode}>ERR_0{item.id}</span>
            </div>

            <div className={styles.cardContent}>
              {hoveredIndex === index ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.patchContent}>
                  <h4>PATCH FOUND</h4>
                  <h3>{item.patch}</h3>
                </motion.div>
              ) : (
                <div className={styles.errorContent}>
                  <h4>{item.error}</h4>
                  <p>{item.problem}</p>
                </div>
              )}
            </div>

            <div className={styles.statusFooter}>
              {hoveredIndex === index ? (
                <span className={styles.statusGreen}>SYSTEM OPTIMIZED</span>
              ) : (
                <span className={styles.statusRed}>ACTION REQUIRED</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HulkCTA = () => {
  return (
    <div className={styles.hulkSection}>
      <div className={styles.hulkContent}>
        <motion.div 
          className={styles.hulkText}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
        >
          <h2>3. THE MISSION</h2>
          <h1>SMASH THE STATIC.</h1>
          <p>
            You are not just building an app. You are building a tool to protect the greatest instrument we have—Life.
            <br/><br/>
            <strong>Your Goal:</strong> Build a functional web/mobile app that solves ONE of these critical gaps.
          </p>

          <a href="/Alphathon Mission.pdf" download className={styles.downloadBtn}>
            <Download size={24} />
            <div>
              <span className={styles.btnMain}>DOWNLOAD MISSION BRIEF</span>
              <span className={styles.btnSub}>Official PDF Protocol</span>
            </div>
          </a>
        </motion.div>

        <div className={styles.hulkVisual}>
          <motion.img 
            src="/hulk-removebg-preview.png" 
            className={styles.hulkImg}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Mission;