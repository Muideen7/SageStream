"use client";

import React, { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", path: "#home" },
  { label: "Browse", path: "/search" },
  { label: "Trending", path: "#trending" },
  { label: "Simulcast", path: "#simulcast" },
  { label: "Originals", path: "#originals" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[--border] bg-[--bg-base]/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
          <Flame size={24} className="text-[--orange]" />
          <span className="text-xl font-bold tracking-tight text-[--cream]">
            SageStream
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.path}
              className="text-sm font-medium text-[--cream-secondary] transition-colors hover:text-[--cream] cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-6 mr-4">
            <Link 
              href="/auth/login"
              className="text-sm font-medium text-[--cream-secondary] hover:text-[--cream] transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Button
              className="h-9 rounded-full bg-[--orange] px-5 font-bold text-sm text-[--bg-base] hover:bg-[--orange-bright] chakra-glow active:scale-95 transition-all"
            >
              Start Watching
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
