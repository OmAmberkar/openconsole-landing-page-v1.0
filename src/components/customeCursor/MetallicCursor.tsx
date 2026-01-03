import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MetallicCursor = () => {
  const [isClicking, setIsClicking] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    // --- FIX: FORCE HIDE DEFAULT CURSOR EVERYWHERE ---
    // We create a style tag to override 'cursor: pointer' on buttons/links
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    style.id = 'metallic-cursor-style';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);

      // Cleanup the style tag when component unmounts
      const existingStyle = document.getElementById('metallic-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      // Added 'pointer-events-none' to ensure the custom cursor doesn't block clicks
      className='fixed top-0 left-0 z-9999 pointer-events-none hidden md:block'
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-2px',
        translateY: '-2px',
      }}
      animate={{
        scale: isClicking ? 0.9 : 1,
        rotate: isClicking ? -10 : 0,
      }}
    >
      <svg
        width='32'
        height='32'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]'
      >
        <defs>
          <linearGradient id='metalGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' />
            <stop offset='50%' stopColor='#E2E2E2' />
            <stop offset='100%' stopColor='#9CA3AF' />
          </linearGradient>

          <linearGradient id='metalShine' x1='100%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFFFFF' stopOpacity='0.8' />
            <stop offset='100%' stopColor='#FFFFFF' stopOpacity='0' />
          </linearGradient>
        </defs>

        <path
          d='M2 2L10.5 26L14.5 16.5L24 12.5L2 2Z'
          fill='url(#metalGradient)'
          stroke='white'
          strokeWidth='1'
        />

        <path d='M4.5 5L10.5 21L13.5 14.5L20 11.5L4.5 5Z' fill='url(#metalShine)' />
      </svg>
    </motion.div>
  );
};

export default MetallicCursor;