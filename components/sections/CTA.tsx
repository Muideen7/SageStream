"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CTABanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[--bg-base] py-24 lg:py-48">
      {/* Subtle orange radial glow at center */}
      <div className="absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--orange]/10 blur-[80px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 text-center"
      >
        <span className="text-xs font-black uppercase tracking-[0.3em] text-[--gold]">
          FREE TO START
        </span>
        <h2 className="text-4xl font-black leading-[1.1] text-[--cream] md:text-5xl lg:text-7xl">
          Start Your Journey. <br className="hidden md:block" /> No Credit Card.
        </h2>
        <p className="text-lg text-[--cream-secondary] md:text-xl">
          Join 50 million watchers. New episodes every week. 
          Become a part of the SageStream legacy today.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="h-14 rounded-full bg-[--orange] px-10 font-bold text-lg text-[--bg-base] hover:bg-[--orange-bright] chakra-glow active:scale-95 transition-all">
            Watch Free Now
          </Button>
          <Button variant="ghost" className="h-14 rounded-full border border-[--border] px-10 font-bold text-lg text-[--cream] hover:border-[--orange]/40 hover:text-[--orange] transition-all">
            See Plans
          </Button>
        </div>
        
        <p className="text-xs font-medium uppercase tracking-widest text-[--cream-muted]">
          Cancel anytime · No commitment required
        </p>
      </motion.div>
    </section>
  );
};
