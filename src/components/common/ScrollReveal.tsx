import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  scale?: boolean;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 30,
  className = '',
  scale = false,
  animation,
}) => {
  const getEffectiveDirection = (): 'up' | 'down' | 'left' | 'right' | 'none' => {
    if (animation) {
      if (animation === 'fade-up') return 'up';
      if (animation === 'fade-down') return 'down';
      if (animation === 'fade-left') return 'left';
      if (animation === 'fade-right') return 'right';
      if (animation === 'fade') return 'none';
    }
    return direction;
  };

  const getInitialPosition = () => {
    switch (getEffectiveDirection()) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
    ...(scale ? { scale: 0.95 } : {}),
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale ? { scale: 1 } : {}),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for snappy, smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStagger: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
