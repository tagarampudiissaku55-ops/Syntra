"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Settings, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const SETTINGS_SECTIONS = [
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("appearance");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 flex flex-col h-full">
      <PageHeader 
        title="Settings"
        description="Configure your workspace appearance."
        icon={Settings}
      />

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id 
                  ? "bg-indigo-500/10 text-indigo-400" 
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeSection === "appearance" && mounted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Appearance</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Customize the look and feel of your workspace.</p>
              </div>

              <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          theme === "light" 
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" 
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="w-full h-16 bg-white border border-zinc-200 rounded-lg shadow-sm mb-3"></div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Light</span>
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          theme === "dark" 
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" 
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="w-full h-16 bg-zinc-950 border border-zinc-800 rounded-lg shadow-sm mb-3"></div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Dark</span>
                      </button>

                      <button
                        onClick={() => setTheme("system")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                          theme === "system" 
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" 
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="w-full h-16 rounded-lg shadow-sm mb-3 flex overflow-hidden border border-zinc-200 dark:border-zinc-800">
                          <div className="w-1/2 h-full bg-white"></div>
                          <div className="w-1/2 h-full bg-zinc-950"></div>
                        </div>
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">System</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
