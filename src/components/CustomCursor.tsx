import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Optimized Cursor logic using Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isVisible) setIsVisible(true);
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' ||
      target.closest('a') || 
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('.cursor-pointer') ||
      target.getAttribute('role') === 'button';
    
    setIsHovering(!!isInteractive);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block mix-blend-difference">
      {/* Outer Circle */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div 
          animate={{
            scale: isHovering ? 2.2 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5px] border-white/60" 
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </div>
  );
}
