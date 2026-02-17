import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Activity, Users, ShieldCheck, Lock } from 'lucide-react';
import styles from './Winners.module.css';

// --- SOUND UTILITY ---
const playSound = (type) => {
  const sounds = {
    flip: new Audio('/sounds/flip.mp3'),
    tick: new Audio('/sounds/tick.mp3'),
    boom: new Audio('/sounds/boom.mp3'),
  };
  if (sounds[type]) {
    sounds[type].volume = 0.6;
    sounds[type].play().catch(() => {});
  }
};

const Winners = () => {
  // --- CONTROLS ---
  const REVEAL_TOP_4 = true;       
  const REVEAL_PODIUM = false;      

  // --- STATE ---
  const [podiumStep, setPodiumStep] = useState(0); 
  const [countDown, setCountDown] = useState(5);
  const [readyText, setReadyText] = useState(""); 
  
  const winnerAudioRef = useRef(null);

  useEffect(() => {
    winnerAudioRef.current = new Audio('/winners.mp3');
    winnerAudioRef.current.volume = 1.0; 
  }, []);

  // --- DATA ---
  const finalists = {
    poolA: [
      { 
        id: 1, 
        name: "Apex team", 
        dept: "CSE", 
        members: ["Kushil bangera", "Mazum", "Tejas", "Pramod"], 
        logo: "/team-logo/apex.jpeg" 
      },
            { 
        id: 5, 
        name: "Sloutions", 
        dept: "AIDS", 
        members: ["M.Prajwal", "K Mohammed Mudassir", "Hithesh", "Dhyan"], 
        logo: "/team-logo/sloution.jpeg" 
      },
    ],
    poolB: [
      
      { 
        id: 6, 
        name: "Vibe Coders", 
        dept: "ISE", 
        members: ["Nishan", "Shriharsha", "Rohit", "Mukta Ramadas Bhat"], 
        logo: "/team-logo/vibeCoder.jpeg" 
      },
      { 
        id: 8, 
        name: "DHAMAKA", 
        dept: "CSE", 
        members: ["Abhishek Shrivastav", "Manish G Suvarna", "Dhanya M Kotian", "KJ Harshini"], 
        logo: "/team-logo/DHARA.png" 
      },
    ]
  };

  const winners = {
    first: { name: "Team Stark", score: 98, logo: "/team-logo/luffy.jpg", members: "Tony, Jarvis, Friday", dept: "AIML" },
    second: { name: "Wakanda Forever", score: 96, logo: "/team-logo/wakanda.jpg", members: "Shuri, Okoye, T'Challa", dept: "ECE" },
    third: { name: "Web Slingers", score: 89, logo: "/team-logo/spidey.jpg", members: "Peter, Ned", dept: "CSE" },
    fourth: { name: "Gamma Rays", score: 85, logo: "/team-logo/hulk.jpg", members: "Bruce, Jen", dept: "EEE" }
  };

  // --- LOGIC ---
  const handleGrandReveal = () => {
    if (winnerAudioRef.current) {
      winnerAudioRef.current.currentTime = 0;
      winnerAudioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setPodiumStep(4); // Scramble

    setTimeout(() => {
      setPodiumStep(5); // Text
      triggerReadySequence();
    }, 12000);

    setTimeout(() => {
      setPodiumStep(6); // Countdown
      let counter = 5;
      setCountDown(counter);
      playSound('tick');

      const interval = setInterval(() => {
        counter--;
        if (counter > 0) playSound('tick');
        setCountDown(counter);
        
        if (counter === 0) {
          clearInterval(interval);
          setPodiumStep(7); // Reveal
          playSound('boom');
          triggerEpicConfetti();
        }
      }, 1000); 
    }, 24000); 
  };

  

  const triggerEpicConfetti = () => {
    const duration = 5000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ particleCount: 10, spread: 80, origin: { x: Math.random(), y: 0.5 }, colors: ['#fbbf24', '#ffffff', '#ef4444'] });
    }, 100);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.animatedBg}></div>

      {/* --- PHASE 1 --- */}
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={styles.tag}>PHASE 01</motion.div>
          <StaggeredTitle text="THE ELITE FINALISTS" />
          <p className={styles.subText}>{REVEAL_TOP_4 ? "The top 2 teams from each pool." : "Calculating Jury Scores... Decrypting..."}</p>
        </div>

        <div className={styles.poolSplit}>
          <div className={styles.poolColumn}>
            <div className={styles.poolHeader}><Users size={18} /> POOL A CHAMPIONS</div>
            <div className={styles.cardStack}>
              {finalists.poolA.map((team, i) => <FinalistCard key={i} team={team} isRevealed={REVEAL_TOP_4} delay={i * 0.1} />)}
            </div>
          </div>
          <div className={styles.vsDivider}>
            <div className={styles.line}></div><span className={styles.vsText}>VS</span><div className={styles.line}></div>
          </div>
          <div className={styles.poolColumn}>
            <div className={styles.poolHeader}><ShieldCheck size={18} /> POOL B CHAMPIONS</div>
            <div className={styles.cardStack}>
              {finalists.poolB.map((team, i) => <FinalistCard key={i} team={team} isRevealed={REVEAL_TOP_4} delay={0.2 + (i * 0.1)} />)}
            </div>
          </div>
        </div>
      </div>

      {/* --- PHASE 2 --- */}
      <div className={styles.container}>
        <div className={styles.headerBoxAlpha}>
          <StaggeredTitle text="THE REAL ALPHA" isAlpha={true} />
        </div>

        {!REVEAL_PODIUM ? (
          <div className={styles.lockedPodium}>
             <div className={styles.scanner}></div>
             <h3>AWAITING GRAND JURY VERDICT</h3>
          </div>
        ) : (
          <div className={styles.podiumArena}>
            <div className={styles.lowerTierRow}>
              <FlipCard rank={4} team={winners.fourth} isRevealed={podiumStep >= 1} onReveal={() => { setPodiumStep(1); playSound('flip'); }} />
              <FlipCard rank={3} team={winners.third} isRevealed={podiumStep >= 2} onReveal={() => { setPodiumStep(2); playSound('flip'); }} />
            </div>
            <div className={styles.finaleTrigger}>
              <button className={styles.triggerBtn} onClick={() => setPodiumStep(3)} disabled={podiumStep < 2}>
                {podiumStep < 3 ? "INITIATE FINAL SHOWDOWN" : "SHOWDOWN IN PROGRESS"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- OVERLAY & REVEAL --- */}
      <AnimatePresence>
        {podiumStep >= 3 && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {podiumStep === 7 && <motion.div className={styles.flash} animate={{ opacity: [1, 0] }} transition={{ duration: 1.5, ease: "circOut" }} />}
            
            {/* CENTRAL STAGE FOR TEXT & COUNTDOWN (Z-INDEX HIGH) */}
            <div className={styles.centerStage}>
               {podiumStep === 5 && (
                <motion.h1 
                  className={styles.readyText}
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)", transition: { duration: 0.4 } }}
                >
                  {readyText}
                </motion.h1>
              )}

              {podiumStep === 6 && (
                <motion.div 
                  className={styles.countdownNumber}
                  key={countDown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                >
                  {countDown}
                </motion.div>
              )}
            </div>

            {/* CARDS CONTAINER (Z-INDEX MEDIUM) */}
            <div className={styles.showdownContainer}>
              <ShowdownCard 
                rank="2ND PLACE" 
                medal="🥈" 
                team={winners.second} 
                revealed={podiumStep === 7} 
                scramble={podiumStep >= 4}
                styleClass="silver"
              />
              <ShowdownCard 
                rank="THE ALPHA" 
                medal="🥇" 
                team={winners.first} 
                revealed={podiumStep === 7} 
                scramble={podiumStep >= 4}
                styleClass="gold"
                isWinner={true}
                showRevealBtn={podiumStep === 3}
                onRevealTrigger={handleGrandReveal}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- SUB COMPONENTS ---

const FinalistCard = ({ team, isRevealed, delay }) => (
  <motion.div className={`${styles.glassCard} ${!isRevealed ? styles.lockedCard : ''}`} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay }}>
    {isRevealed ? (
      <div className={styles.cardContent}>
        <img src={team.logo} onError={(e) => e.target.src = "/team-logo/def-logo.jpg"} className={styles.teamLogo} alt="Team Logo"/>
        <div className={styles.teamDetails}><h4>{team.name}</h4><span className={styles.deptBadge}>{team.dept}</span></div>
        <div className={styles.verifiedIcon}><ShieldCheck size={16} /></div>
      </div>
    ) : (
      <div className={styles.lockedContent}>
        <div className={`${styles.skeleton} ${styles.skeletonLogo}`}></div>
        <div className={styles.skeletonTextGroup}><div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div><div className={`${styles.skeleton} ${styles.skeletonSub}`}></div></div>
        <div className={styles.lockOverlay}><Lock size={16} /><span>ENCRYPTED</span></div>
      </div>
    )}
  </motion.div>
);

const FlipCard = ({ rank, team, isRevealed, onReveal }) => (
  <div className={styles.flipContainer} onClick={!isRevealed ? onReveal : null}>
    <motion.div className={styles.flipInner} animate={{ rotateY: isRevealed ? 180 : 0 }} transition={{ duration: 0.6 }}>
      <div className={styles.flipFront}><span className={styles.rankBig}>{rank}</span><span className={styles.tapToReveal}>TAP TO DECRYPT</span></div>
      <div className={styles.flipBack}><span className={styles.rankSmall}>{rank}TH PLACE</span><img src={team.logo} className={styles.backLogo} onError={(e) => e.target.src = "/team-logo/def-logo.jpg"} alt="Team Logo"/><h3>{team.name}</h3><div className={styles.scoreBadge}>{team.score} PTS</div></div>
    </motion.div>
  </div>
);

const ShowdownCard = ({ rank, medal, team, revealed, scramble, styleClass, isWinner, showRevealBtn, onRevealTrigger }) => (
  <motion.div className={`${styles.finalCard} ${styles[styleClass]} ${isWinner && revealed ? styles.winnerGlow : ''}`} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    {isWinner && revealed && <motion.div className={styles.crownContainer} initial={{ y: -50, opacity: 0 }} animate={{ y: -44, opacity: 1 }} transition={{ type: "spring" }}><Crown size={50} fill="#fbbf24" stroke="#b45309" /></motion.div>}
    <div className={styles.medalBanner}>{medal} {rank}</div>
    <div className={styles.finalBody}>
      {revealed ? (
        <>
          <img src={team.logo} className={isWinner ? styles.winnerLogo : styles.runnerLogo} onError={(e) => e.target.src = "/team-logo/def-logo.jpg"} alt="Winner Logo"/>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className={styles.finalName}>{team.name}</h1>
            <p className={styles.finalMembers}>{team.members}</p>
          </motion.div>
          <div className={styles.finalScore}><Counter target={team.score} /> <small>PTS</small></div>
        </>
      ) : (
        <div className={styles.mysteryBody}>
          <div className={styles.mysteryIcon}>{scramble ? <Activity className={styles.pulseIcon} /> : "?"}</div>
          <h3>{scramble ? "ANALYZING..." : "HIDDEN"}</h3>
          <div className={styles.scrambleScore}>{scramble ? <RandomScrambler /> : "00"}</div>
          {showRevealBtn && <button className={styles.revealBtn} onClick={onRevealTrigger}>REVEAL WINNER</button>}
        </div>
      )}
    </div>
  </motion.div>
);

const StaggeredTitle = ({ text, isAlpha }) => (
  <div className={isAlpha ? styles.alphaTitle : styles.staggerTitle}>
    {text.split("").map((char, i) => <motion.span key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>{char}</motion.span>)}
  </div>
);

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => { let start = 0; const timer = setInterval(() => { start += 1; setCount(start); if (start >= target) clearInterval(timer); }, 20); return () => clearInterval(timer); }, [target]);
  return <span>{count}</span>;
};

const RandomScrambler = () => {
  const [val, setVal] = useState(0);
  useEffect(() => { const t = setInterval(() => setVal(Math.floor(Math.random() * 99)), 50); return () => clearInterval(t); }, []);
  return <span>{val}</span>;
};

export default Winners;