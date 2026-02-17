import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, Zap, Code, Mic, Trophy, 
  Gavel, Smartphone, Maximize2, Minimize2, AlertCircle 
} from 'lucide-react';
import styles from './Timeline.module.css';

const Timeline = () => {
  // --- STATE ---
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStatus, setTimerStatus] = useState('running');

  // --- TIMER LOGIC ---
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-02-17T14:30:00'); // TARGET: Feb 17, 2:30 PM
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      if (newTime) {
        setTimeLeft(newTime);
      } else {
        setTimeLeft(null);
        setTimerStatus('ended');
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- DATA ---
  const schedule = [
    { time: "09:00 AM", end: "09:30 AM", title: "Assembly & Reveal", desc: "Inauguration & Problem Statement Drop", icon: <Users size={18}/>, color: "#3b82f6" },
    { time: "09:30 AM", title: "Hacking Begins", desc: "The hunt for the Alpha starts now.", icon: <Zap size={18}/>, color: "#f97316" },
    { time: "12:00 PM", title: "Mentoring Round", desc: "Expert feedback checkpoint. Pivot or persevere.", icon: <Code size={18}/>, color: "#10b981" },
    { time: "02:30 PM", title: "CODE FREEZE", desc: "Stop coding. Submissions close immediately.", icon: <Clock size={18}/>, color: "#ef4444" },
    { time: "02:30 PM", end: "03:30 PM", title: "Jury Evaluation", desc: "Top 2 teams selected from each pool.", icon: <Gavel size={18}/>, color: "#8b5cf6" },
    { time: "03:30 PM", end: "04:30 PM", title: "Grand Finale", desc: "Shark Tank style pitch to the Final Jury.", icon: <Mic size={18}/>, color: "#ec4899" },
    { time: "04:30 PM", title: "Coronation", desc: "Winner Announcement.", icon: <Trophy size={18}/>, color: "#eab308" }
  ];

  const rules = [
    { title: "Team Structure", items: ["2-4 Members", "₹20 Entry Fee", "BYOD (Laptops + Chargers)"] },
    { title: "Code Policy", items: ["Fresh Code Only", "No Pre-built Templates", "Open Source Libs Allowed"] },
    { title: "Judging Criteria for Top 4", items: ["Innovation (30%)", "Functionality (30%)", "UI/UX (20%)", "Pitch (20%)"] },
    { title: "Judging Criteria for Final's", items: ["Innovation (20%)", "Functionality (20%)", "UI/UX (20%)", "Pitch (20%)","Market Viability (20%)"] }
  ];

  return (
    <section className={styles.wrapper}>
      
      {/* Background Decor */}
      <div className={styles.bgDecor}></div>

      {/* --- STANDARD VIEW CONTAINER --- */}
      <div className={styles.container}>
        
        {/* TIMER CARD (Mini) */}
        <div className={styles.timerWrapper}>
          <motion.div 
            className={styles.timerCard}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.timerHeader}>
              <div className={styles.liveBadge}>
                <span className={styles.pulseDot}></span> LIVE
              </div>
              <span className={styles.timerLabel}>ROUND 1 DEADLINE</span>
              <button 
                className={styles.expandBtn} 
                onClick={() => setIsFullScreen(true)}
                title="Enter Focus Mode"
              >
                <Maximize2 size={20} />
              </button>
            </div>

            {timerStatus === 'running' && timeLeft ? (
              <div className={styles.miniClock}>
                <TimeUnit val={timeLeft.days} label="DAYS" />
                <span className={styles.miniColon}>:</span>
                <TimeUnit val={timeLeft.hours} label="HRS" />
                <span className={styles.miniColon}>:</span>
                <TimeUnit val={timeLeft.minutes} label="MIN" />
                <span className={styles.miniColon}>:</span>
                <TimeUnit val={timeLeft.seconds} label="SEC" />
              </div>
            ) : (
              <div className={styles.timeUpMini}>TIME UP</div>
            )}
          </motion.div>
        </div>

        {/* CONTENT GRID */}
        <div className={styles.contentGrid}>
          
          {/* LEFT: TIMELINE */}
          <div className={styles.colLeft}>
            <div className={styles.colHeader}>
              <h2>The Event Roadmap</h2>
              <p>Your journey from start to finish.</p>
            </div>
            
            <div className={styles.timelineList}>
              <div className={styles.trackLine}></div>
              {schedule.map((item, i) => (
                <div key={i} className={styles.timeRow}>
                  <div className={styles.timeMarker}>
                    <span className={styles.timeText}>{item.time}</span>
                    <div className={styles.dot} style={{ background: item.color }}>{item.icon}</div>
                  </div>
                  <div className={styles.eventCard}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    {item.end && <span className={styles.durationTag}>Until {item.end}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: RULES */}
          <div className={styles.colRight}>
            <div className={styles.colHeader}>
              <h2>The Rulebook</h2>
              <p>Guidelines to keep the game fair.</p>
            </div>

            <div className={styles.rulesGrid}>
              {rules.map((rule, i) => (
                <div key={i} className={styles.ruleBox}>
                  <div className={styles.ruleIconHeader}>
                    {i === 0 && <Users className={styles.ruleIcon} />}
                    {i === 1 && <Code className={styles.ruleIcon} />}
                    {i === 2 && <Gavel className={styles.ruleIcon} />}
                    <h3>{rule.title}</h3>
                  </div>
                  <ul>
                    {rule.items.map((txt, idx) => (
                      <li key={idx}>{txt}</li>
                    ))}
                  </ul>
                </div>
              ))}
              
              <div className={styles.noteBox}>
                <AlertCircle size={20} />
                <p><strong>Note:</strong> Decisions made by the jury are final and binding.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- FULL SCREEN OVERLAY (THE PORTAL) --- */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            className={styles.fsOverlay}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Background Animation */}
            <div className={styles.fsBackground}>
              <motion.img 
                src="/doctor-strange-removed-bg.png" 
                className={styles.fsStrange} 
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className={styles.fsMandala}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Content */}
            <div className={styles.fsContent}>
              <div className={styles.fsHeader}>
                <span className={styles.fsTitle}>ALPHATHON 2026</span>
                <span className={styles.fsSubtitle}>ROUND 1 ENDS IN</span>
              </div>

              {timerStatus === 'running' && timeLeft ? (
                <div className={styles.fsClock}>
                  <FSTimeUnit val={timeLeft.days} label="DAYS" />
                  <span className={styles.fsColon}>:</span>
                  <FSTimeUnit val={timeLeft.hours} label="HOURS" />
                  <span className={styles.fsColon}>:</span>
                  <FSTimeUnit val={timeLeft.minutes} label="MINUTES" />
                  <span className={styles.fsColon}>:</span>
                  <FSTimeUnit val={timeLeft.seconds} label="SECONDS" />
                </div>
              ) : (
                <h1 className={styles.fsTimeUp}>TIME'S UP!</h1>
              )}
            </div>

            <button 
              className={styles.minimizeBtn}
              onClick={() => setIsFullScreen(false)}
            >
              <Minimize2 size={24} />
              <span>EXIT FOCUS MODE</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

// --- SUB-COMPONENTS for Clean Code ---

const TimeUnit = ({ val, label }) => (
  <div className={styles.timeUnit}>
    <span className={styles.val}>{val < 10 ? `0${val}` : val}</span>
    <span className={styles.lbl}>{label}</span>
  </div>
);

const FSTimeUnit = ({ val, label }) => (
  <div className={styles.fsUnit}>
    <div className={styles.fsValBox}>
      {val < 10 ? `0${val}` : val}
    </div>
    <span className={styles.fsLbl}>{label}</span>
  </div>
);

export default Timeline;