import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Send, Infinity as InfinityIcon } from 'lucide-react';

// ==============================
// 1. DATA & CONFIGURATION
// ==============================
// (Keep existing data...)
const footerLinks = {
  project: [
    { label: 'Dashboard Demo', href: '#demo' },
    { label: 'Features Overview', href: '#features' },
    { label: 'API Documentation', href: '#docs' },
    { label: 'Roadmap (Future)', href: '#roadmap' },
  ],
  community: [
    { label: 'GitHub Discussions', href: '#' },
    { label: 'Contribute', href: 'https://github.com/openconsole-cloud' },
    { label: 'Meet the Team', href: '#' },
    { label: 'Support', href: 'mailto:support@openconsole.cloud' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/openconsole-cloud', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

// ==============================
// 2. ANIMATION VARIANTS
// ==============================
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// ==============================
// 3. SUB-COMPONENTS
// ==============================
const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  // RESPONSIVE: Center text on mobile, left-align on larger screens
  <div className='flex flex-col gap-5 text-center sm:text-left items-center sm:items-start'>
    <h4 className='text-sm font-extrabold text-white uppercase tracking-widest border-b-2 border-blue-600/50 pb-1 w-fit'>
      {title}
    </h4>
    <ul className='flex flex-col gap-2.5'>
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className='text-sm text-neutral-400 hover:text-cyan-400 transition-colors duration-200 inline-block relative group'
          >
            {link.label}
            <span className='absolute left-0 bottom-0.5 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full'></span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// ==============================
// 4. MAIN FOOTER COMPONENT
// ==============================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // RESPONSIVE: Reduced top padding on mobile (pt-16) -> (md:pt-24)
    <footer className='pt-16 md:pt-24 relative z-10 overflow-hidden bg-blue-950/30 border-2 border-b-blue-600 border-t-0 border-x-0 shadow-[0_0_30px_rgba(59,130,246,0.3)] rounded-4xl'>
      {/* Black Hole Radial Gradient */}
      <div className='absolute inset-0 z-0 opacity-20 mask-[radial-gradient(100%_100%_at_center_bottom,black,transparent)]'>
        <div className='w-full h-full bg-black/50 bg-[radial-gradient(50%_50%_at_center_bottom,rgba(59,130,246,0.3)_0%,transparent_70%)]'></div>
      </div>

      {/* Main Footer Content */}
      <motion.div
        className='container mx-auto px-4 relative z-10 max-w-7xl'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* RESPONSIVE: Changed grid gap and padding */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 lg:gap-8 mb-12 md:mb-16 border-b border-neutral-800 pb-12 md:pb-16'>
          {/* Column 1: Brand & Newsletter */}
          {/* RESPONSIVE: Center text on mobile */}
          <div className='md:col-span-4 lg:col-span-4 flex flex-col gap-6 text-center md:text-left items-center md:items-start'>
            {/* Brand */}
            <div>
              <h3 className='text-3xl font-extrabold text-white tracking-tight mb-2'>
                Open<span className='text-blue-500'>Console</span>{' '}
                <InfinityIcon className='w-6 h-6 text-cyan-400 inline-block' />
              </h3>
              {/* RESPONSIVE: Max width auto on mobile */}
              <p className='text-neutral-400 text-base leading-relaxed max-w-sm mx-auto md:mx-0'>
                Unified cloud operations platform built for modern standards. Simplify ops, enhance
                security, and optimize costs.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className='mt-4 w-full max-w-sm mx-auto md:mx-0'>
              {/* RESPONSIVE: Center heading on mobile */}
              <h4 className='text-lg font-bold text-cyan-400 mb-3 flex items-center justify-center md:justify-start gap-2'>
                <Mail className='w-5 h-5' /> Join the Console Newsletter
              </h4>
              <form className='flex gap-2 relative'>
                <input
                  type='email'
                  placeholder='Your work email'
                  className='w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-4 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all'
                  required
                />
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200 shrink-0 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50'
                  aria-label='Subscribe'
                >
                  <Send className='w-5 h-5' />
                </button>
              </form>
            </div>
          </div>

          {/* Columns 2, 3, 4: Link Sections */}
          {/* RESPONSIVE: Changed to 1 column on mobile, 3 on larger screens */}
          <div className='md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8'>
            <FooterColumn title='Project' links={footerLinks.project} />
            <FooterColumn title='Community' links={footerLinks.community} />
            <FooterColumn title='Legal' links={footerLinks.legal} />
          </div>
        </div>

        {/* Sub-Footer: Copyright & Socials */}
        <div className='pt-8 pb-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6'>
          <p className='text-sm text-neutral-500 text-center md:text-left'>
            Built by BEIT Group 5 • Atharva College of Engineering • © {currentYear} OpenConsole
            Inc.
          </p>

          <div className='flex gap-4'>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 rounded-full bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-neutral-700 hover:border-blue-600 shadow-md hover:shadow-blue-500/50'
                  aria-label={social.label}
                >
                  <Icon className='w-5 h-5' />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
