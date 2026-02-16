import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Shield, Cpu, Lock } from 'lucide-react';
import styles from './Pools.module.css';

const Pools = () => {
  // --- CONTROL VARIABLE ---
  // Set this to TRUE after 12:00 PM to reveal the pools
  const POOLS_ANNOUNCED = false; 

  const [activePool, setActivePool] = useState('A');

  // --- TEAM DATA ---
  // Once teams are finalized, fill this data.
  // If logo is "", it defaults to the placeholder.
  const poolData = {
    A: [
      { 
        id: 1, 
        name: "Team Stark", 
        dept: "AIML", 
        members: ["Tony S.", "Jarvis", "Friday"], 
        logo: "/team-logo/luffy.jpg" // Leave empty to use default
      },
      { 
        id: 2, 
        name: "Web Slingers", 
        dept: "CSE", 
        members: ["Peter P.", "Ned", "MJ"], 
        logo: "" 
      },
      { 
        id: 3, 
        name: "Asgardians", 
        dept: "ISE", 
        members: ["Thor", "Loki", "Heimdall"], 
        logo: "" 
      },
    ],
    B: [
      { 
        id: 4, 
        name: "Wakanda Forever", 
        dept: "ECE", 
        members: ["T'Challa", "Shuri", "Okoye"], 
        logo: "" 
      },
      { 
        id: 5, 
        name: "Gamma Rays", 
        dept: "EEE", 
        members: ["Bruce B.", "She-Hulk"], 
        logo: "" 
      },
      { 
        id: 6, 
        name: "Guardians", 
        dept: "MECH", 
        members: ["Quill", "Gamora", "Groot", "Rocket"], 
        logo: "" 
      },
    ]
  };

  return (
    <section className={styles.poolWrapper}>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>PHASE 04</span>
          <h2 className={styles.title}>CLASSIFIED POOLS</h2>
        </div>

        <AnimatePresence mode="wait">
          {!POOLS_ANNOUNCED ? (
            // --- STATE 1: LOCKED (PRE-REVEAL) ---
            <motion.div 
              key="locked"
              className={styles.lockedContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={styles.scannerOverlay}></div>
              
              <div className={styles.lockedContent}>
                <motion.div 
                  className={styles.statusBadge}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock size={16} />
                  <span>MENTORING IN PROGRESS</span>
                </motion.div>

                <h1>ANALYZING TEAM CAPABILITIES...</h1>
                <p>The AI is currently evaluating team stacks and project viability. <br/>Pools will be declared after the 12:00 PM Checkpoint.</p>
                
                <div className={styles.loaderBar}>
                  <motion.div 
                    className={styles.loaderFill}
                    animate={{ width: ["0%", "80%", "100%"] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* IRON MAN FLYING IMAGE */}
              <motion.img 
                src="/iron man.png" 
                alt="Iron Man Scanning"
                className={styles.ironManFlying}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            // --- STATE 2: REVEALED (CIVIL WAR) ---
            <motion.div 
              key="revealed"
              className={styles.warContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* CIVIL WAR IMAGE */}
              <div className={styles.warHeader}>
                <motion.img 
                  src="/war-pool-removed-bg.png" 
                  alt="Civil War" 
                  className={styles.warImage}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <h3>CHOOSE YOUR SIDE</h3>
              </div>

              {/* POOL TOGGLES */}
              <div className={styles.toggleContainer}>
                <button 
                  className={activePool === 'A' ? styles.activeBtn : styles.btn}
                  onClick={() => setActivePool('A')}
                >
                  POOL A (CAP'S SIDE)
                </button>
                <button 
                  className={activePool === 'B' ? styles.activeBtnB : styles.btn}
                  onClick={() => setActivePool('B')}
                >
                  POOL B (TONY'S SIDE)
                </button>
              </div>

              {/* TEAM GRID */}
              <motion.div 
                key={activePool}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.teamGrid}
              >
                {poolData[activePool].map((team) => (
                  <div key={team.id} className={styles.teamCard}>
                    <div className={styles.cardHeader}>
                      <img 
                        src={team.logo || "/team-logo/def-logo.jpg"} 
                        alt="Logo" 
                        className={styles.teamLogo}
                        onError={(e) => {e.target.src = "/team-logo/def-logo.jpg"}} // Fallback safety
                      />
                      <div>
                        <h4>{team.name}</h4>
                        <span className={styles.deptTag}><Briefcase size={12}/> {team.dept}</span>
                      </div>
                    </div>
                    
                    <div className={styles.divider}></div>
                    
                    <div className={styles.membersList}>
                      <span className={styles.memberLabel}><Users size={14}/> SQUAD:</span>
                      <p>{team.members.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Pools;