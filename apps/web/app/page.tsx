import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

      {/* Header / Navbar */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md h-16 flex justify-between items-center px-8  md:px-16">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="MoroccoSafety Logo"
            width={120}
            height={50}
            className="object-contain"
          />
        </div>
        <nav>
          <ul className="flex gap-8 text-lg font-medium tracking-wide uppercase">
            <Link href="/home">
              <li className="cursor-pointer hover:text-[#D84040] transition-colors">Home</li>
            </Link>

            <Link href="/map">
              <li className="cursor-pointer hover:text-[#D84040] transition-colors">MAP</li>
            </Link>
            <Link href="/signup">
              <li className="cursor-pointer hover:text-[#D84040] transition-colors">Signup</li>
            </Link>
          </ul>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-20">
        <h1 className="text-6xl md:text-8xl font-bold text-[#D84040] drop-shadow-lg mb-4"
          style={{ fontFamily: 'serif' }}>
          MoroccoSafety
        </h1>

        <p className="text-xl md:text-3xl font-light tracking-widest uppercase mb-10 max-w-4xl">
          Real-time crisis alerts across Morocco <br />
          <span className="font-semibold">Stay informed, Stay safe</span>
        </p>
        <Link href="/signup">

          <button className="bg-[#D84040]  text-white text-2xl px-10 py-3 rounded-xl transition-all duration-300 shadow-xl lowercase italic font-semibold">
            get Started
          </button>
        </Link>
      </main>

      {/* Effet visuel du bas (Nodes/Réseau) */}
      <div className="absolute bottom-0 w-full h-1/3 pointer-events-none">
        {/* On peut ajouter ici un overlay ou des éléments SVG pour simuler les connexions blanches */}
      </div>
    </div>
  );
}