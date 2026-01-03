import React from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  CloudCog,
  ShieldCheck,
  Workflow,
  BrainCircuit,
  ChartAreaIcon,
  BlocksIcon,
  type LucideIcon,
} from "lucide-react";

// ==============================
// 1. CONFIGURATION & DATA
// ==============================

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // Tailwind color class base (e.g., "blue", "purple")
}

const featuresData: FeatureItem[] = [
  {
    title: "Unified Multi-Cloud Control",
    description:
      "Stop tab switching. Manage AWS, GCP, Azure, and private servers from a single, real-time glass pane.",
    icon: CloudCog,
    color: "blue",
  },
  {
    title: "Automated Workflows",
    description:
      "Integrate with tools like Flowise to automate deployments, scaling, and routine infrastructure tasks.",
    icon: Workflow,
    color: "indigo",
  },
  {
    title: "Enforced Security & MFA",
    description:
      "Standardize security protocols across all providers with mandatory multi-factor authentication and policy enforcement.",
    icon: ShieldCheck,
    color: "purple",
  },
  {
    title: "AI-Powered Cost Intel",
    description:
      "AI analyzes your cross-cloud spend to identify idle resources and recommend actionable savings.",
    icon: BrainCircuit,
    color: "pink",
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Get unified dashboards with real-time metrics, alerts, and logs from all your cloud and on-premise resources.",
    icon: ChartAreaIcon,
    color: "indigo",
  },
  {
    title: "Customizable Dashboards",
    description:
      "Tailor your control panel with widgets and views that matter most to your operations.",
    icon: BlocksIcon,
    color: "purple",
  }
];

// ==============================
// 2. ANIMATION VARIANTS
// ==============================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};


// 3. INDIVIDUAL FEATURE CARD
// ==============================

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => {
  const Icon = item.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group h-90 relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/50 "
    >
      {/* Internal Glow Gradient on Hover - Changed to Cyan */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-linear(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-600/30 to-transparent -z-10"></div>

      {/* Icon Wrapper - Changed color to Cyan */}
      <div className="mb-6 inline-block p-4 rounded-xl bg-cyan-950/50 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white shadow-lg shadow-cyan-900/20">
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors">
        {item.title}
      </h3>
      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
        {item.description}
      </p>
    </motion.div>
  );
};

// ==============================
// 4. MAIN FEATURES SECTION COMPONENT
// ==============================

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 relative z-10 overflow-hidden">
      {/* ... (keep background glow) */}

      <div className="container mx-auto px-4">
        {/* ... (keep section header) */}

        {/* Features Grid - Removed align-middle as it's not needed here */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers when 100px from the viewport top
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuresData.map((item, index) => (
            // Each card uses the 'Crazy' spring animation and contributes to the stagger
            <FeatureCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;