"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Tv, Calendar, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, path: "#home" },
  { id: "browse", label: "Browse", icon: Search, path: "/search" },
  { id: "trending", label: "Trending", icon: Tv, path: "#trending" },
  { id: "simulcast", label: "Simulcast", icon: Calendar, path: "#simulcast" },
  { id: "auth", label: "Login", icon: LogIn, path: "/auth/login" },
];

export const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  const handleNav = (id: string, path: string) => {
    setActiveTab(id);
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(path);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[94%] max-w-[400px] -translate-x-1/2 md:hidden">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
        className="relative flex items-center justify-around rounded-[2rem] border border-white/10 bg-[--bg-surface]/80 p-2 shadow-2xl backdrop-blur-xl"
      >
        <AnimatePresence mode="popLayout">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id, item.path)}
                className={cn(
                  "relative flex flex-1 flex-col items-center justify-center py-3 outline-none cursor-pointer transition-all duration-300",
                  isActive ? "min-w-[100px]" : "min-w-[48px]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-[--orange] shadow-[0_0_20px_rgba(232,125,74,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className={cn(
                  "relative z-10 flex items-center gap-2 transition-colors duration-300",
                  isActive ? "text-[--bg-base]" : "text-[--cream-muted]"
                )}>
                  <Icon size={isActive ? 18 : 22} strokeWidth={isActive ? 3 : 2} />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] font-black uppercase tracking-widest"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </button>
            );
          })}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
