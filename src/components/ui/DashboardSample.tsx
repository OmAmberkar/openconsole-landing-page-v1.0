// src/components/ui/DashboardSample.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, HardDrive, Database, Share2, Rocket, Cloud, ShieldCheck, DollarSign, TrendingUp, CircleCheck, AlertTriangle, CircleX, LayoutDashboard, Settings, Search, ChevronDown, Filter, RotateCcw } from 'lucide-react';

// ===================================
// PART 0: UTILITIES & STYLES
// ===================================

// CSS to hide scrollbars but keep scrolling functionality (works on Chrome, Safari, Firefox, Edge)
const hideScrollbarCss = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// A reusable skeleton pulsing block for loading states
const SkeletonBlock = ({ className }: { className?: string }) => (
    <div className={`bg-neutral-800/50 animate-pulse rounded-lg ${className}`}></div>
);

// The Loading Skeleton layout matching the dashboard grid
const DashboardSkeleton = () => (
    <div className="w-full h-full font-sans flex flex-col space-y-3 p-2 animate-in fade-in duration-500">
        {/* Top Row Skeletons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
                <SkeletonBlock key={i} className="h-[120px]" />
            ))}
        </div>
        {/* Bottom Row Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 grow">
            <SkeletonBlock className="col-span-2 h-40" />
            <SkeletonBlock className="col-span-1 h-40" />
        </div>
    </div>
);


// ===================================
// PART 1: UI COMPONENTS
// ===================================

interface HealthStatusProps {
    healthy: number;
    warning: number;
    critical: number;
    total: number;
}

// --- Health Status Component ---
const HealthStatus: React.FC<HealthStatusProps> = ({ healthy, warning, critical, total }) => {
    const safeTotal = total > 0 ? total : 1;
    const healthyPercentage = (healthy / safeTotal) * 100;
    const warningPercentage = (warning / safeTotal) * 100;
    const criticalPercentage = (critical / safeTotal) * 100;

    return (
        <div className="mt-1 text-[0.55rem] text-neutral-400 ">
            <div className="flex h-1 rounded-full overflow-hidden bg-neutral-700 mb-0.5">
                {healthy > 0 && <div className="h-full bg-green-500 transition-all duration-500 ease-out" style={{ width: `${healthyPercentage}%` }}></div>}
                {warning > 0 && <div className="h-full bg-yellow-500 transition-all duration-500 ease-out" style={{ width: `${warningPercentage}%` }}></div>}
                {critical > 0 && <div className="h-full bg-red-500 transition-all duration-500 ease-out" style={{ width: `${criticalPercentage}%` }}></div>}
                {total === 0 && <div className="h-full bg-neutral-600 w-full"></div>}
            </div>
            <div className="flex justify-between text-[0.5rem]">
                <span className="flex items-center text-green-500 mr-1">{healthy} <CircleCheck className="w-2 h-2 ml-0.5" /></span>
                <span className="flex items-center text-yellow-500 mr-1">{warning} <AlertTriangle className="w-2 h-2 ml-0.5" /></span>
                <span className="flex items-center text-red-500">{critical} <CircleX className="w-2 h-2 ml-0.5" /></span>
            </div>
        </div>
    );
};

// --- Generic Resource Block Component ---
interface ResourceBlockProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string;
    health: HealthStatusProps;
    iconBgColor: string;
    delay: number;
}

const ResourceBlock: React.FC<ResourceBlockProps> = ({ title, icon, value, description, health, iconBgColor, delay }) => {
    return (
        <motion.div
            className="bg-neutral-900 rounded-lg p-3 shadow-md flex flex-col justify-between text-white border border-neutral-800 min-h-[100px] flex-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-semibold">{title}</h4>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white [&>svg]:w-3.5 [&>svg]:h-3.5 ${iconBgColor}`}>{icon}</div>
            </div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-[0.6rem] text-neutral-400 mb-1">{description}</p>
            <HealthStatus {...health} total={health.healthy + health.warning + health.critical} />
        </motion.div>
    );
};

// --- Quick Actions Block ---
const QuickAction: React.FC<{ label: string; icon: React.ReactNode; description: string; }> = ({ label, icon, description }) => (
    <button className="bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 transition-colors rounded-lg p-2 text-white flex flex-col items-center justify-center text-center shadow-sm border border-neutral-700 cursor-pointer min-h-[70px]">
        <div className="w-7 h-7 flex items-center justify-center mb-0.5 text-purple-400 [&>svg]:w-4 [&>svg]:h-4">{icon}</div>
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-[0.55rem] text-neutral-400 mt-0.5">{description}</p>
    </button>
);

const QuickActionsBlock: React.FC<{ delay: number }> = ({ delay }) => (
    <motion.div
        className="bg-neutral-900 rounded-lg p-3 shadow-md flex flex-col justify-between text-white border border-neutral-800 col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-neutral-300">Quick Actions</h3>
            <span className="text-[0.6rem] text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">AWS</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <QuickAction label="Deploy Resource" icon={<Rocket />} description="Launch new instances" />
            <QuickAction label="Create Backup" icon={<Cloud />} description="Backup resources" />
            <QuickAction label="View Costs" icon={<DollarSign />} description="Analyze spending" />
            <QuickAction label="Security Scan" icon={<ShieldCheck />} description="Run compliance" />
        </div>
    </motion.div>
);

// --- Cost Overview Block ---
const CostOverviewBlock: React.FC<{ delay: number }> = ({ delay }) => {
    useEffect(() => {
        // Small delay to ensure DOM is ready for the width transition
        setTimeout(() => {
            const progressBar = document.querySelector('.cost-overview-progress') as HTMLElement;
            if (progressBar) progressBar.style.width = '83%';
        }, 100);
    }, []);

    return (
        <motion.div
            className="bg-neutral-900 rounded-lg p-3 shadow-md flex flex-col justify-between text-white border border-neutral-800 col-span-1 md:col-span-2 lg:col-span-1 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-amber-500">$ Cost Overview</h3>
                <span className="text-[0.6rem] text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">AWS</span>
            </div>
            <div className="cost-summary">
                <p className="text-[0.6rem] text-neutral-400">This Month</p>
                <p className="text-xl font-bold text-white my-0.5">$1,247.89</p>
                <p className="text-[0.6rem] text-neutral-500 flex items-center">
                    vs $1,180.50 last month <TrendingUp className="w-2.5 h-2.5 text-red-500 rotate-90 ml-1" /> <span className="text-red-500 ml-0.5">-5.7%</span>
                </p>
                <div className="mt-2">
                    <p className="text-[0.6rem] text-neutral-400">Budget Usage <span className="float-right">83%</span></p>
                    <div className="h-1.5 rounded-full bg-neutral-700 my-1 overflow-hidden">
                        <div className="cost-overview-progress h-full bg-green-500 transition-all duration-1000 ease-out" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-[0.6rem] text-neutral-500">$1,500.00 monthly budget</p>
                </div>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-700">
                <h3 className="text-xs font-semibold text-amber-500 mb-1">Top Services</h3>
                <ul className="list-none p-0 m-0 text-[0.65rem]">
                    <li className="flex justify-between mb-0.5 text-neutral-300">Compute <span className="text-amber-500 font-semibold">$561.55</span></li>
                    <li className="flex justify-between mb-0.5 text-neutral-300">Storage <span className="text-amber-500 font-semibold">$311.97</span></li>
                    <li className="flex justify-between text-neutral-300">Network <span className="text-amber-500 font-semibold">$249.58</span></li>
                </ul>
            </div>
        </motion.div>
    );
};


// ===================================
// PART 2: LAYOUT COMPONENTS
// ===================================

const SimpleSidebar: React.FC = () => {
    return (
        <div className="w-35 bg-neutral-950 border-r border-neutral-800 flex flex-col py-4 h-auto sticky top-0 select-none">
            <h1 className="text-normal font-bold text-white mb-6 px-4">OpenConsole</h1>
            <nav className="space-y-1 px-3">
                <a href="#dashboard" className="flex items-center space-x-2 p-2 rounded-lg text-sm bg-blue-600 text-white font-semibold">
                    <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
                </a>
                <a href="#resources" className="flex items-center space-x-2 p-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 transition-colors">
                    <Server className="w-4 h-4" /> <span>Resources</span>
                </a>
                <a href="#costs" className="flex items-center space-x-2 p-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 transition-colors">
                    <DollarSign className="w-4 h-4" /> <span>Costs</span>
                </a>
            </nav>
            <div className="mt-auto px-3 pt-4 border-t border-neutral-800">
                <a href="#settings" className="flex items-center space-x-2 p-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 transition-colors">
                    <Settings className="w-4 h-4" /> <span>Settings</span>
                </a>
            </div>
        </div>
    );
};

const SimpleNavbar: React.FC = () => {
    return (
        <div className="h-9 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 sticky top-0 z-20 select-none">
            <div className="flex items-center space-x-4">
                <h2 className="text-normal font-semibold text-white">Dashboard</h2>
                <button className="flex items-center space-x-1 px-2  bg-blue-600 rounded-md text-white text-sm font-medium transition-colors hover:bg-blue-700">
                    <span>AWS</span><ChevronDown className="w-4 h-4" />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 group-focus-within:text-blue-500 transition-colors" />
                    <input type="text" placeholder="Search resources..." className="max-w-44 md:w-64 pl-9 pr-3 py-1 bg-neutral-800 rounded-md text-sm text-white placeholder-neutral-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all" />
                </div>
                <button className="text-neutral-400 hover:text-white p-1.5 rounded-md transition-colors"><Filter className="w-4 h-4" /></button>
                <button className="text-neutral-400 hover:text-white p-1.5 rounded-md transition-colors"><RotateCcw className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

// --- Dashboard Content Component ---
const DashboardContent: React.FC = () => {
    return (
        <div className="w-full h-full font-sans flex flex-col space-y-3 p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <ResourceBlock title="Compute Instances" icon={<Server />} value={1} description="VMs & Containers" health={{ healthy: 1, warning: 0, critical: 0, total: 1 }} iconBgColor="bg-indigo-600" delay={0} />
                <ResourceBlock title="Storage Buckets" icon={<HardDrive />} value={1} description="Object storage" health={{ healthy: 1, warning: 0, critical: 0, total: 1 }} iconBgColor="bg-green-600" delay={0.05} />
                <ResourceBlock title="Databases" icon={<Database />} value={1} description="SQL & NoSQL DBs" health={{ healthy: 1, warning: 0, critical: 0, total: 1 }} iconBgColor="bg-purple-600" delay={0.1} />
                <ResourceBlock title="Network Resources" icon={<Share2 />} value={0} description="Load balancers" health={{ healthy: 0, warning: 0, critical: 0, total: 0 }} iconBgColor="bg-orange-600" delay={0.15} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 grow">
                <QuickActionsBlock delay={0.2} />
                <CostOverviewBlock delay={0.25} />
            </div>
        </div>
    );
};


// ===================================
// PART 3: THE EXPORTED LAYOUT WRAPPER
// ===================================

const DashboardSample: React.FC = () => {
    // Simulate loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request fetch time (e.g., 2 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        // Inject styles for hiding scrollbars
        <>
            <style>{hideScrollbarCss}</style>
            <div className="flex h-full w-full bg-neutral-950 rounded-2xl shadow-glow overflow-hidden border border-neutral-800/50">
                {/* 1. Sidebar: Fixed */}
                <div className="h-full shrink-0 z-30">
                    <SimpleSidebar />
                </div>

                {/* 2. Main Content Area */}
                <div className="flex flex-col flex-1 h-full overflow-hidden relative">
                    {/* 2a. Navbar: Fixed */}
                    <div className="shrink-0 z-20">
                        <SimpleNavbar />
                    </div>

                    {/* 2b. Content Wrapper: Scrolls internally, but scrollbar is hidden via CSS */}
                    <main className="flex-1 p-4 overflow-y-auto overflow-x-hidden bg-neutral-950 no-scrollbar relative">
                        {/* AnimatePresence handles the exit/enter animations between loading states */}
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 p-4 z-10"
                                >
                                    <DashboardSkeleton />
                                </motion.div>
                            ) : (
                                <DashboardContent />
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </>
    );
};

export default DashboardSample;