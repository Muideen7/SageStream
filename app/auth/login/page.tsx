"use client";

import React from "react";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[--bg-base] px-6 py-12">
      {/* Brand Header */}
      <Link href="/" className="mb-12 flex items-center gap-2">
        <Flame size={32} className="text-[--orange]" />
        <span className="text-2xl font-black tracking-tighter text-[--cream]">
          SageStream
        </span>
      </Link>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border border-[--border] bg-[--bg-surface] p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-[--cream]">Welcome Back</h1>
          <p className="mt-2 text-sm text-[--cream-muted]">
            Continue your journey across the arcs.
          </p>
        </div>

        {/* Social Logins */}
        <div className="flex flex-col gap-3">
          <Button 
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[--border] bg-white font-bold text-black hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="h-5 w-5"
            />
            Sign in with Google
          </Button>

          <Button 
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#02a9ff] font-bold text-white hover:bg-[#0091db] transition-all active:scale-95 cursor-pointer"
          >
            <img 
              src="https://anilist.co/img/icons/android-chrome-512x512.png" 
              alt="AniList" 
              className="h-6 w-6"
            />
            Sign in with AniList
          </Button>
        </div>

        <div className="my-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[--cream-muted]">
          <div className="h-px flex-1 bg-[--border]" />
          OR
          <div className="h-px flex-1 bg-[--border]" />
        </div>

        {/* Manual Login (Stub) */}
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[--cream-muted]">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="naruto@uzumaki.com"
              className="h-12 rounded-xl border border-[--border] bg-[--bg-raised] px-4 text-sm text-[--cream] focus:border-[--orange] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[--cream-muted]">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="h-12 rounded-xl border border-[--border] bg-[--bg-raised] px-4 text-sm text-[--cream] focus:border-[--orange] focus:outline-none transition-colors"
            />
          </div>

          <Button className="mt-4 h-12 rounded-xl bg-[--orange] font-bold text-[--bg-base] hover:brightness-110 active:scale-95 transition-all">
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-[--cream-muted]">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-bold text-[--orange] hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
