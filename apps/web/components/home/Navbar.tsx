import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Map, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="relative z-10 bg-white/10 backdrop-blur-md h-16 flex justify-between items-center px-8 md:px-16">
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
        <ul className="flex gap-8 text-lg font-medium tracking-wide items-center">
          <li>
            <Link href="/home" aria-label="Home" className="hover:text-[#D84040] transition-colors flex items-center">
              <Home size={24} />
            </Link>
          </li>
          <li>
            <Link href="/map" aria-label="Map" className="hover:text-[#D84040] transition-colors flex items-center">
              <Map size={24} />
            </Link>
          </li>
          <li>
            <Link href="/signup" aria-label="Sign Up" className="hover:text-[#D84040] transition-colors flex items-center">
              <UserPlus size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}