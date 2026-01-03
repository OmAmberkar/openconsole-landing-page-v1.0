import { motion } from "framer-motion";
// Assuming this import path is correct based on your provided snippet
import DashboardSmallBlock from "./DashboardSample";

// Define animation variants for a clean, staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between animating children
      delayChildren: 0.2,   // Initial delay before starting
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

function Spotlight() {
  return (
    <motion.div
      // --- Animation Props ---
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Animate when 100px into viewpoint
      // --- Styling Props ---
      // 1. Layout & Responsiveness: flex-col for mobile, lg:flex-row for desktop
      className="flex flex-col lg:flex-row items-center justify-between gap-8
                 bg-blue-950/20 backdrop-blur-xl
                 p-6 m-4 md:p-12 md:m-10
                overflow-hidden relative border-2 border-t-blue-700 border-x-0 border-b-0 shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-4xl"
    >
      {/* Optional subtle background glow effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-neutral-800/20 to-transparent pointer-events-none -z-10"></div>

      {/* --- Text Section --- */}
      <motion.div className="flex-1 max-w-2xl" variants={textVariants}>
        <p
          className="font-normal text-lg md:text-xl text-neutral-300 leading-relaxed
                     text-center lg:text-left lg:pr-10"
        >
          Stop juggling tabs across distinct cloud providers. OpenConsole
          unifies your infrastructure —spanning AWS, GCP, and scalable for
          future integrations like Azure—into a single, secure pane of glass.
          Abstract away the complexity of native consoles, automate deployments
          with Flowise, and secure your accounts with mandatory MFA, all while
          AI optimizes your spend.
        </p>
      </motion.div>

      {/* --- Dashboard Section --- */}
      {/* "hidden lg:flex" fulfills the requirement to exclude on mobile */}
      <motion.div
        variants={imageVariants}
        // Add a subtle hover effect for interactivity
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        className="hidden lg:flex flex-1 w-full justify-end justify-items-end items-center relative z-10"
      >
        {/* We remove fixed w-180 h-120. We use aspect-video to maintain shape
            and w-full/max-w to ensure it scales responsively within its flex container. */}
        <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
          {/*
             Ensure DashboardSmallBlock is designed to fill its parent container (e.g., w-full h-full).
             If it isn't, you might need to wrap it in another div with 'h-full w-full object-cover'
          */}
          <DashboardSmallBlock />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Spotlight;