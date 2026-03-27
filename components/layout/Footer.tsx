"use client";

import React from "react";
import { Flame, MessageCircle, PlayCircle, Camera, Globe } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Watch",
    links: ["Browse Anime", "Simulcast", "Movies", "Schedule", "Genres"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Blog", "Partners"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Privacy Policy", "Terms", "Cookie Settings"],
  },
];

export const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[--bg-surface] px-6 lg:px-12 py-24 border-t border-[--border-gold]">
      {/* Top Section */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-24">
        {/* Brand Column */}
        <div className="flex flex-col gap-6 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Flame size={28} className="text-[--orange]" />
            <span className="text-2xl font-black uppercase tracking-tight text-[--cream]">
              SageStream
            </span>
          </div>
          <p className="max-w-xs text-sm font-medium leading-relaxed text-[--cream-muted]">
            The world's most cinematic anime platform. Crafted for fans, by fans. 
            Where Every Arc Begins.
          </p>
          <div className="flex gap-4">
            <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-[--border] text-[--cream-muted] hover:text-[--orange] hover:border-[--orange]/40 transition-all">
              <Globe size={18} />
            </a>
            <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-[--border] text-[--cream-muted] hover:text-[--orange] hover:border-[--orange]/40 transition-all">
              <PlayCircle size={18} />
            </a>
            <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-[--border] text-[--cream-muted] hover:text-[--orange] hover:border-[--orange]/40 transition-all">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full border border-[--border] text-[--cream-muted] hover:text-[--orange] hover:border-[--orange]/40 transition-all">
              <Camera size={18} />
            </a>
          </div>
        </div>

        {/* Links Columns */}
        {FOOTER_LINKS.map(column => (
          <div key={column.title} className="flex flex-col gap-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[--cream-muted]">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {column.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm font-medium text-[--cream-secondary] hover:text-[--cream] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[1440px] border-t border-[--border] pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs text-[--cream-muted]">
          © {new Date().getFullYear()} SageStream Anime Platform. Built for the Sage.
        </p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[--cream-muted]">
          <a href="#" className="hover:text-[--orange] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[--orange] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[--orange] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
