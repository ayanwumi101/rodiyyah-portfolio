'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // GSAP animation for the logo
    gsap.set('.preloader-logo', { scale: 0.5, opacity: 0 });
    gsap.to('.preloader-logo', {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.to('.preloader-logo', {
      scale: 1.1,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="preloader-logo relative">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white">
              <img 
                src="/fd0ac90efa8c4848d9a117ede8d73eb572412d06.png" 
                alt="Arowona Logo" 
                className="w-16 h-16 object-contain"
              />
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
            </div>
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-sm text-muted-foreground font-light tracking-wider">
                AROWONA PHOTOGRAPHY
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}