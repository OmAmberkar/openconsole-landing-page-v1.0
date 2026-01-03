// src/components/FinalCTA.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Github, LayoutDashboard } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
// ==============================
// 1. ANIMATION VARIANTS
// ==============================

// Define how the container will stagger the animation of its children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Delay the start of children animations slightly
      delayChildren: 0.2,
      // Stagger the animation of each child by 0.15 seconds
      staggerChildren: 0.15,
    },
  },
};

// Define the animation for each individual item (headline, text, buttons)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, // Start a bit lower and invisible
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // Use a spring transition for a bouncy, natural feel
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.6,
    },
  },
};

// ==============================
// 2. COMPONENT
// ==============================

export default function FinalCTA() {
    const {playClick} = useSound();
    return (
        <section className="py-20 md:py-24 w-full bg-neutral-950/70 relative z-10 overflow-hidden">
            {/* Turn the container into a motion component.
              It will trigger the 'visible' animation state when it enters the viewport.
            */}
            <motion.div
                className="text-center max-w-4xl mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                // Triggers animation when the element is 100px from the bottom of the viewport
                viewport={{ margin: "-100px", once: true }}
            >
                {/* Headline - Animate as an individual item */}
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    variants={itemVariants}
                >
                    Ready to Experience Unified Cloud Ops?
                </motion.h2>

                {/* Description Text - Animate as an individual item */}
                <motion.p
                    className="text-xl text-neutral-300 mb-10"
                    variants={itemVariants}
                >
                    Jump straight into the demo dashboard to see real-time metrics, automated workflows, and cost insights in action.
                </motion.p>

                {/* Buttons Container - Animate the entire button group together */}
                <motion.div
                    className="flex flex-col md:flex-row justify-center gap-4"
                    variants={itemVariants}
                >
                    {/* Primary Button (Demo) */}
                    <a href='https://openconsole-dashboard-deploy.pages.dev/sign-in' target="_blank" rel="noreferrer">
                        <button className="group w-full md:w-auto px-10 py-3.5 rounded-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        onClick={ playClick}>
                            <LayoutDashboard size={20} />
                            Go to Live Demo
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </a>

                    {/* Secondary Button (Source) */}
                    <a
                        href="https://github.com/openconsole-cloud/openconsole-workspace"
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick }
                        className="group w-full md:w-auto px-10 py-3.5 rounded-full border border-neutral-700 bg-neutral-800/70 text-neutral-300 font-medium hover:bg-neutral-700 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer no-underline"
                    >
                        <Github size={20} className="group-hover:rotate-6 transition-transform" />
                        View Project Source
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}