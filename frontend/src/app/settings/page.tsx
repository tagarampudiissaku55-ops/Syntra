"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Settings, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SETTINGS_SECTIONS = [
  { id: "ai", label: "AI Models", icon: Brain },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("ai");

  // State for AI Models settings
  const [planningModel, setPlanningModel] = useState("Gemini 2.5 Flash");
  const [generationModel, setGenerationModel] = useState("Gemini 2.5 Flash");
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    const savedPlanning = localStorage.getItem("syntra_planning_model");
    const savedGeneration = localStorage.getItem("syntra_generation_model");
    const savedApiKey = localStorage.getItem("syntra_google_api_key");

    if (savedPlanning) setPlanningModel(savedPlanning);
    if (savedGeneration) setGenerationModel(savedGeneration);
    if (savedApiKey) setApiKey(savedApiKey);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Save to local storage
    localStorage.setItem("syntra_planning_model", planningModel);
    localStorage.setItem("syntra_generation_model", generationModel);
    localStorage.setItem("syntra_google_api_key", apiKey);

    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Settings saved successfully.");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 flex flex-col h-full">
      <PageHeader 
        title="Settings"
        description="Configure your enterprise workspace, AI models, and access controls."
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
                  : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeSection === "ai" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-zinc-100">AI Models</h3>
                <p className="text-sm text-zinc-400 mt-1">Configure default models for planning, execution, and embeddings.</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 space-y-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Default Planning Model</label>
                    <select 
                      value={planningModel}
                      onChange={(e) => setPlanningModel(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    >
                      <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                      <option value="Gemini 2.5 Pro">Gemini 2.5 Pro</option>
                    </select>
                    <p className="mt-1 text-xs text-zinc-500">Used by the Conductor for complex reasoning and plan generation.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Default Generation Model</label>
                    <select 
                      value={generationModel}
                      onChange={(e) => setGenerationModel(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    >
                      <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
                      <option value="Gemini 2.5 Pro">Gemini 2.5 Pro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Google Provider API Key</label>
                    <input 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                    <p className="mt-1 text-xs text-zinc-500">Saved securely in your browser's local storage.</p>
                  </div>

                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-400">
                    {saveMessage}
                  </span>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
