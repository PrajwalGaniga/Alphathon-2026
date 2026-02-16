import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Calendar, MapPin, 
  Target, Clock, Users, Trophy, ChevronDown 
} from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax for text
  const y2 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax for Spidey

  const navItems = [
    { id: 'mission', label: 'The Mission', icon: <Target size={20} />, color: '#10b981' }, // Hulk
    { id: 'timeline', label: 'Timeline', icon: <Clock size={20} />, color: '#8b5cf6' }, // Strange
    { id: 'pools', label: 'Pools', icon: <Users size={20} />, color: '#ef4444' }, // Civil War
    { id: 'winners', label: 'Results', icon: <Trophy size={20} />, color: '#eab308' }, // Trophy
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.heroWrapper}>
      {/* 1. NOISE TEXTURE OVERLAY (Premium Feel) */}
      <div className={styles.noise}></div>

      {/* 2. BACKGROUND BLOBS */}
      <div className={styles.bgGlows}>
        <div className={styles.glowBlue}></div>
        <div className={styles.glowRed}></div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className={styles.container}>
        
        {/* TOP BAR: Info Pills */}
        <motion.div 
          className={styles.topBar}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <div className={styles.infoPill}>
            <Calendar size={16} /> <span>FEB 17, 2026</span>
          </div>
          <div className={styles.infoPill}>
            <MapPin size={16} /> <span>SIT, INDIA</span>
          </div>
        </motion.div>

        {/* MASSIVE TYPOGRAPHY (Layer 1) */}
        <motion.div style={{ y: y1 }} className={styles.titleContainer}>
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={styles.megaText}
          >
            ALPHA
          </motion.h1>
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${styles.megaText} ${styles.outline}`}
          >
            THON
          </motion.h1>
        </motion.div>

        {/* SPIDERMAN (Layer 2 - Floats above text) */}
        <motion.div 
          className={styles.spideyWrapper}
          style={{ y: y2 }}
          initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img 
            src="/spi-removebg-preview.png" 
            className={styles.spiderman}
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* SUBTITLE & CTA */}
        <div className={styles.bottomContent}>
          <motion.p 
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The hunt for the real <span className={styles.highlight}>Alpha</span> begins.
          </motion.p>
        </div>
      </div>

      {/* 4. THE COMMAND DOCK (Navigation) */}
      <motion.div 
        className={styles.dockWrapper}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className={styles.glassDock}>
          {navItems.map((item) => (
            <button 
              key={item.id} 
              className={styles.dockItem}
              onClick={() => scrollToSection(item.id)}
            >
              <div className={styles.iconBox} style={{ color: item.color }}>
                {item.icon}
              </div>
              <span className={styles.dockLabel}>{item.label}</span>
            </button>
          ))}
          
          
        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={24} color="#94a3b8" />
      </motion.div>
    </section>
  );
};

export default Hero;