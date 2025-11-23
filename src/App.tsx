// src/App.tsx
import { useEffect, useState } from "react";
// FIX: Separated type imports from value imports for verbatimModuleSyntax
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import Spotlight from "./components/ui/Spotlight";
import Features from "./components/ui/Features";
import FinalCTA from "./components/ui/FinalCTA";
import Footer from "./components/ui/Footer";

// ==============================
// 1. GAMING CURSOR COMPONENT
// ==============================
const GamingCursor = () => {
  const [isClicking, setIsClicking] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the trailing effect
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Offset by half the cursor size
      mouseY.set(e.clientY - 16);
    };
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Hide default cursor globally
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main glowing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-blue-500/50 rounded-full pointer-events-none z-50 backdrop-blur-sm mix-blend-screen border border-blue-300/80"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          boxShadow: isClicking
            ? "0 0 20px 5px rgba(59, 130, 246, 0.8)" // Intense glow on click
            : "0 0 10px 2px rgba(59, 130, 246, 0.4)", // Normal glow
        }}
      />
      {/* Trailing small dot for precision feel */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: 12, translateY: 12 }}
      />
    </>
  );
};

// ==============================
// 2. ANIMATION VARIANTS
// ==============================
// Main Container variants (for Title and Spotlight)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// How individual elements enter the screen (Title, SpotlightWrapper
const itemVariants: Variants = {
  // HIDDEN: Element starts off-screen (100px), shrunk (0.7), blurry, and tilted.
  hidden: { 
    opacity: 0, 
    y: 100, 
    scale: 0.7, 
    rotate: 10, 
    filter: 'blur(8px)',
  },
  // SHOW: Element snaps back to normal size, sharpness, and position.
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { 
      type: "spring", 
      stiffness: 80,   // Slightly reduced stiffness
      damping: 18,     // Added damping for a softer stop
      mass: 0.5,       // Added mass for a heavier, more dramatic feel
      duration: 0.6
    },
  },
};

// Subheading container variants (for AWS, GCP list)
const containerVariants2: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for the list items
    },
  },
};

// Subheading individual word variants
const wordVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

// ==============================
// 3. MAIN APP COMPONENT
// ==============================
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-x-hidden relative selection:bg-blue-500/30 selection:text-blue-100">
      {/* Inject the custom cursor */}
      <GamingCursor />

      {/* Subtle animated background gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-[#ffff] to-[#0a0a0a] -z-10 pointer-events-none"></div>

      {/* Main content container with staggered animation */}
      {/* CHANGE 1: Updated main container to use whileInView and viewport */}
      <motion.div
        className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center z-10 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="show" // Changed from animate="show"
        viewport={{ margin: "-100px" }} // Removed once: true, added margin so it triggers before fully on screen
      >
        {/* --- Header Section (Responsive Layout) --- */}
        <motion.div
          className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mb-16 md:mb-24"
          variants={itemVariants}
        >
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-white to-gray-800 inline-block pb-2">
              Open
            </span>
            <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Console
            </span>
          </h1>

          {/* Call to Action Button */}
          <motion.a
            href="https://openconsole-dashboard-deploy.pages.dev/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-linear-to-br from-blue-500 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-black"
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-200 bg-[#0a0a0a] rounded-md group-hover:bg-opacity-0 text-xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-blue-200 to-purple-200  group-hover:text-white">
              Get Started <span className="ml-2">→</span>
            </span>
            {/* Button Glow Effect */}
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-500/20 blur-xl"></div>
          </motion.a>
        </motion.div>

        {/* CHANGE 2: Updated subheading container to also use whileInView for reverse animation */}
        <motion.div
          className="text-xl md:text-2xl font-medium tracking-wide mb-12 uppercase flex flex-wrap justify-center"
          variants={containerVariants2}
          initial="hidden"
          whileInView="visible" // Changed from animate="visible"
          viewport={{ margin: "-50px" }} // Add viewport prop so it triggers repeatedly on scroll
        >
          <motion.span
            className="text-yellow-300/90 drop-shadow-md"
            variants={wordVariants}
          >
            AWS
          </motion.span>

          <motion.span className="mx-3 text-white" variants={wordVariants}>
            |
          </motion.span>

          <motion.span
            className="text-blue-500 drop-shadow-md"
            variants={wordVariants}
          >
            GCP
          </motion.span>

          <motion.span className="mx-3 text-white" variants={wordVariants}>
            |
          </motion.span>

          <motion.span
            className="text-sky-400 drop-shadow-md"
            variants={wordVariants}
          >
            Azure
          </motion.span>

          <motion.span className="mx-3 text-white" variants={wordVariants}>
            |
          </motion.span>

          <motion.span className="text-neutral-200" variants={wordVariants}>
            Private Servers
          </motion.span>
        </motion.div>

        {/* --- Spotlight Component Wrapper --- */}
        {/* This inherits from the main containerVariants, so it will also reverse animate */}
        <motion.div className="w-full mb-50" variants={itemVariants}><Spotlight /></motion.div>
        <motion.div className="w-full mb-50" variants={itemVariants}><Features /></motion.div>
        <motion.div className="w-full mb-50" variants={itemVariants}><FinalCTA /></motion.div>
        <motion.div className="w-full" variants={itemVariants}><Footer /></motion.div>
      </motion.div>
    </div>
  );
}

export default App;