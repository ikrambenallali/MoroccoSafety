import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen w-full font-sans text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photo1.png"
          alt="Crisis background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay pour assombrir l'image et améliorer le contraste */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header / Navbar Component */}
      <Navbar />

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-20">
        <h1 
          className="text-6xl md:text-8xl font-bold text-[#D84040] drop-shadow-lg mb-4"
          style={{ fontFamily: 'serif' }}
        >
          MoroccoSafety
        </h1>

        <p className="text-xl md:text-3xl font-light tracking-widest mb-10 max-w-4xl">
          Real-time crisis alerts across Morocco <br />
          <span className="font-semibold">Stay informed, Stay safe</span>
        </p>

        <Link href="/signup">
          <button className="bg-[#D84040] text-white text-2xl px-10 py-3 rounded-xl transition-all duration-300 shadow-xl lowercase font-semibold">
            get started
          </button>
        </Link>
      </main>
    </div>
  );
}