"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { BarChart2, TrendingUp, Users, Clock, DollarSign, Activity, ChevronUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = 50;
    const steps = duration / incrementTime;
    const stepValue = end / steps;
    
    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function AnalyticsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeRange, setTimeRange] = useState('1M');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  // Mock data based on time range to make it interactive
  const getMetrics = () => {
    switch (timeRange) {
      case '1D': return { workflows: 428, hours: 284, cost: 14200, agents: 42, growth: '+2.1%', dateLabels: ['8AM', '12PM', '4PM', '8PM', '12AM'] };
      case '1W': return { workflows: 3240, hours: 2150, cost: 108500, agents: 42, growth: '+5.4%', dateLabels: ['Mon', 'Wed', 'Fri', 'Sun', 'Tue'] };
      case '3M': return { workflows: 36450, hours: 24800, cost: 1240000, agents: 39, growth: '+45.2%', dateLabels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
      case 'YTD': return { workflows: 112845, hours: 78450, cost: 3925000, agents: 35, growth: '+124.5%', dateLabels: ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'] };
      case '1M':
      default: return { workflows: 12845, hours: 8450, cost: 425000, agents: 42, growth: '+14.2%', dateLabels: ['Oct 1', 'Oct 4', 'Oct 7', 'Oct 10', 'Oct 13'] };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="max-w-7xl mx-auto py-6 flex flex-col min-h-full">
      <div className="flex items-center justify-between mb-8">
        <PageHeader 
          title="Enterprise Analytics"
          description="Real-time business impact and AI workforce metrics."
          icon={BarChart2}
        />
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium shadow-sm shadow-emerald-500/10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Live Sync
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Metric Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="h-24 w-24 text-indigo-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl">
              <Activity className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm">Workflows Executed</h3>
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            <AnimatedNumber value={metrics.workflows} />
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{metrics.growth}</span>
            <span className="text-zinc-400 dark:text-zinc-500 ml-2 font-normal">vs previous</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="h-24 w-24 text-amber-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-amber-500/10 rounded-xl">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm">Total Hours Saved</h3>
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            <AnimatedNumber value={metrics.hours} suffix="h" />
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+8.4%</span>
            <span className="text-zinc-400 dark:text-zinc-500 ml-2 font-normal">vs previous</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="h-24 w-24 text-emerald-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm">Cost Efficiency</h3>
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            <AnimatedNumber value={metrics.cost} prefix="$" />
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+22.1%</span>
            <span className="text-zinc-400 dark:text-zinc-500 ml-2 font-normal">ROI generated</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="h-24 w-24 text-cyan-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl">
              <Users className="h-5 w-5 text-cyan-500" />
            </div>
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-400 text-sm">Active Agents</h3>
          </div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            <AnimatedNumber value={metrics.agents} />
          </div>
          <div className="flex items-center text-sm font-medium text-zinc-500">
            <span className="text-emerald-500 flex items-center"><ChevronUp className="h-4 w-4 mr-1" />3</span>
            <span className="ml-2 font-normal">deployed recently</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Placeholder for Main Chart - We'll use CSS shapes to make a beautiful faux chart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Execution Volume</h3>
              <p className="text-sm text-zinc-500">Tasks processed per hour across all agents</p>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', 'YTD'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${t === timeRange ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          {/* Faux Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 pb-4 mt-8">
            {/* Generate some pseudo-random data based on time range */}
            {Array.from({length: 15}).map((_, i) => {
              // Create a deterministic but different looking chart based on the string timeRange + index
              const seed = (timeRange.charCodeAt(0) + i) * 17;
              const height = 20 + (seed % 80); // between 20 and 100
              
              return (
                <motion.div 
                  key={`${timeRange}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: (i * 0.03), ease: "easeOut" }}
                  className="w-full bg-gradient-to-t from-indigo-600/80 to-indigo-400 rounded-t-sm relative group cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs font-semibold py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 shadow-lg">
                    {Math.floor(height * (metrics.workflows / 1500))} executions
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-3">
            {metrics.dateLabels.map((lbl, i) => <span key={i}>{lbl}</span>)}
          </div>
        </motion.div>

        {/* Top Workflows List */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Top Workflows</h3>
          <p className="text-sm text-zinc-500 mb-6">By execution volume</p>
          
          <div className="space-y-4 flex-1">
            {[
              { name: "Customer Complaint Triage", category: "Support", baseCount: 4231, growth: "+12%" },
              { name: "Employee Onboarding", category: "HR", baseCount: 3104, growth: "+5%" },
              { name: "Vendor Contract Review", category: "Legal", baseCount: 2840, growth: "+18%" },
              { name: "Expense Report Audit", category: "Finance", baseCount: 1956, growth: "-2%" },
              { name: "Daily Standup Summary", category: "Engineering", baseCount: 1200, growth: "+42%" },
            ].map((wf, idx) => {
              // Scale the count based on the selected time range roughly
              const multiplier = timeRange === '1D' ? 0.03 : timeRange === '1W' ? 0.25 : timeRange === '3M' ? 2.8 : timeRange === 'YTD' ? 8.5 : 1;
              const actualCount = Math.floor(wf.baseCount * multiplier) + (timeRange.charCodeAt(0) % 50);
              
              return (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-500">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors cursor-pointer">{wf.name}</p>
                      <p className="text-xs text-zinc-500">{wf.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{actualCount.toLocaleString()}</p>
                    <p className={`text-xs ${wf.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{wf.growth}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
