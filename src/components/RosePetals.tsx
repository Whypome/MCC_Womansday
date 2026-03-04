import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const RosePetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Reduced count for mobile performance
    const initialPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 10,
      size: 10 + Math.random() * 20,
      rotation: Math.random() * 360,
      isLeaf: Math.random() > 0.7, // 30% chance to be a leaf
    }));
    setPetals(initialPetals);

    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev.slice(1),
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: 0,
          duration: 12 + Math.random() * 10,
          size: 10 + Math.random() * 20,
          rotation: Math.random() * 360,
          isLeaf: Math.random() > 0.7,
        },
      ]);
    }, 2500); // Slower interval for less overhead

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -50, x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              x: `${petal.x + (Math.random() * 15 - 7.5)}vw`,
              opacity: [0, 1, 1, 0],
              rotate: petal.rotation + 720,
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: 'linear',
              repeat: Infinity,
            }}
            className={`absolute ${petal.isLeaf ? 'text-green-800/30' : 'text-red-400/40'} will-change-transform`}
            style={{ width: petal.size, height: petal.size }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              {petal.isLeaf ? (
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              ) : (
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              )}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
