import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import Navbar from '@/components/home/Navbar';

export default function MoroccoSafetyHome() {
    return (
        <div className="bg-[#2B3337] text-[#CCCCCC] min-h-screen font-sans selection:bg-[#D84040] selection:text-white">


            {/* Header / Navbar */}
         
                <Navbar />
            {/* --- 1. NOUVELLE SECTION HERO (1/2 Texte, 1/2 Map.png) --- */}
            <section className="relative min-h-screen flex items-center  overflow-hidden border-b border-[#8E1616]/20">
                {/* Background très discret */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <img src="/photo7.png" className="w-full h-full object-cover" alt="Background context" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 py-12">
                    {/* Colonne GAUCHE : Texte & Mission */}
                    <div className="text-left space-y-6">
                        <h1 className="text-5xl md:text-7xl font-serif text-[#D84040] tracking-tighter leading-tight drop-shadow-xl">
                            MoroccoSafety
                        </h1>
                        <p className="text-xl md:text-2xl font-black   tracking-[0.2em] text-white  ">
                            Unir nos forces face aux <span className="text-[#D84040]">risques</span>
                        </p>
                        <div className="h-1 w-20 bg-[#8E1616]"></div>
                        <p className="text-lg md:text-xl font-light leading-relaxed text-[#CCCCCC] max-w-xl">
                            Le Maroc est exposé à diverses catastrophes naturelles : séismes, inondations et incendies.
                            <br /><br />
                            <span className="text-white font-bold  ">MoroccoSafety</span> est une plateforme citoyenne conçue pour <strong>donner l'alerte</strong> instantanément. En signalant un incident, vous aidez la communauté et les secours à réagir plus vite.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href='/signup' className="bg-[#D84040] hover:bg-[#8E1616] text-white px-8 py-4 rounded-sm font-bold   tracking-widest transition-all shadow-lg border border-white/10">
                                S'inscrire aux alertes
                            </Link>
                            <Link  href='/login' className="bg-transparent border border-[#8E1616] text-white px-8 py-4 rounded-sm font-bold   tracking-widest hover:bg-[#8E1616]/20 transition-all">
                                Signaler un danger
                            </Link>
                        </div>
                    </div>

                    {/* Colonne DROITE : Map.png */}
                    <div className="relative h-[500px] lg:h-[600px] rounded-sm overflow-hidden border-2 border-[#8E1616]/40 shadow-[0_0_50px_rgba(142,22,22,0.2)] group">
                        <img src="/map.png" alt="Carte du Maroc" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3337] via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#2B3337]/90 border border-[#8E1616]/30 backdrop-blur-sm">
                            <p className="text-[#D84040] font-bold text-xs   tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#D84040] rounded-full animate-ping"></span> Live Monitoring
                            </p>
                            <p className="text-white text-sm  ">Zones de surveillance active : Al Haouz, Rif, Atlas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION EXPLICATIONS --- */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl font-serif   text-white mb-4   text-[#D84040]">Vigilance & Prévention</h2>
                    <div className="h-[2px] w-24 bg-[#8E1616] mx-auto"></div>
                </div>

                {/* 1. SEISMES (Photo 6) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
                    <div className="relative h-[450px] rounded-sm overflow-hidden border border-[#8E1616]/30 shadow-2xl group">
                        <div className="absolute inset-0 bg-[#3a2a1a]/40 group-hover:bg-transparent transition-all duration-700"></div>
                        <img src="/photo6.png" alt="Séismes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3337] via-transparent to-transparent opacity-80"></div>
                        <h3 className="absolute bottom-6 left-8 text-4xl font-bold text-[#D84040]    ">Séismes</h3>
                    </div>
                    <div className="space-y-6">
                        <p className="text-2xl font-light leading-relaxed border-l-4 border-[#8E1616] pl-8 py-4">
                            Le Maroc est au cœur d'une zone tectonique active. <br />
                            <span className="text-white font-bold   text-sm tracking-widest block mt-4 mb-2 text-[#D84040]">Impact & Origine</span>
                            Comprendre les mouvements des plaques est vital pour la résilience des infrastructures et la sécurité des citoyens dans les zones à risque comme Al Haouz.
                        </p>
                        <p className="text-[#CCCCCC] pl-10  ">
                            Notre plateforme centralise les données sismiques pour une diffusion immédiate des alertes de sécurité.
                        </p>
                    </div>
                </div>

                {/* 2. INCENDIES (Photo 4) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
                    <div className="order-2 lg:order-1 space-y-6 text-right">
                        <p className="text-2xl font-light leading-relaxed border-r-4 border-[#D84040] pr-8 py-4">
                            Les vagues de chaleur menacent nos forêts du Nord. <br />
                            <span className="text-white font-bold   text-sm tracking-widest block mt-4 mb-2 text-[#D84040]">Surveillance Satellite</span>
                            La détection précoce via imagerie thermique permet de déployer les secours avant que le feu ne devienne incontrôlable.
                        </p>
                        <p className="text-[#CCCCCC] pr-10  ">
                            Chaque minute compte. Signalez et suivez la progression des incendies en temps réel.
                        </p>
                    </div>
                    <div className="relative h-[450px] rounded-sm overflow-hidden border border-[#8E1616]/30 shadow-2xl group order-1 lg:order-2">
                        <div className="absolute inset-0 bg-orange-950/30 group-hover:bg-transparent transition-all duration-700"></div>
                        <img src="/photo4.png" alt="Incendies" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3337] via-transparent to-transparent opacity-80"></div>
                        <h3 className="absolute bottom-6 right-8 text-4xl font-bold text-[#D84040]    ">Incendies</h3>
                    </div>
                </div>

                {/* 3. METEO (Photo 5) */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[450px] rounded-sm overflow-hidden border border-[#8E1616]/30 shadow-2xl group">
                        <div className="absolute inset-0 bg-blue-950/30 group-hover:bg-transparent transition-all duration-700"></div>
                        <img src="/photo5.png" alt="Météo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3337] via-transparent to-transparent opacity-80"></div>
                        <h3 className="absolute bottom-6 left-8 text-4xl font-bold text-[#D84040]    ">Tempêtes</h3>
                    </div>
                    <div className="space-y-6">
                        <p className="text-2xl font-light leading-relaxed border-l-4 border-[#8E1616] pl-8 py-4">
                            Inondations et vents violents. <br />
                            <span className="text-white font-bold   text-sm tracking-widest block mt-4 mb-2 text-[#D84040]">Alerte Précoce</span>
                            Nos algorithmes météo analysent les risques de crues subites pour protéger les populations vivant à proximité des Oueds.
                        </p>
                        <p className="text-[#CCCCCC] pl-10   font-bold">
                            Restez à l'abri grâce aux notifications géo-localisées.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION REVIEWS --- */}
            <section className="bg-[#1e2427] py-32 border-y border-[#8E1616]/20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-center text-3xl font-serif   text-white mb-20 tracking-widest     font-bold">Avis de la Communauté</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { name: "Omar T.", text: "Une application indispensable pour les résidents des zones rurales du Rif.", stars: 5 },
                            { name: "Leila M.", text: "Clarté, rapidité et précision. Le service dont le Maroc avait besoin.", stars: 5 },
                            { name: "Karim B.", text: "L'interface est intuitive même sous pression. Bravo pour l'initiative.", stars: 4 }
                        ].map((review, index) => (
                            <div key={index} className="relative bg-[#2B3337] p-10 border-t-2 border-[#D84040] shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-[#D84040] mb-4 text-sm tracking-widest">
                                    {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                                </div>
                                <p className="text-white/80 mb-8   leading-relaxed font-light">"{review.text}"</p>
                                <p className="font-black text-[#D84040]   text-xs tracking-[0.2em]">— {review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-16 text-center">
                <div className="mb-8 opacity-50 flex justify-center gap-4 text-[10px]   tracking-widest font-bold">
                    <a href="#">Privacy Policy</a>
                    <span>•</span>
                    <a href="#">Contact</a>
                    <span>•</span>
                    <a href="#">Emergency Numbers</a>
                </div>
                <p className="text-[#CCCCCC]/30 text-[10px] tracking-[0.3em]  ">
                    © 2026 MoroccoSafety | Proteger. Alerter. Sauver.
                </p>
            </footer>
        </div>
    );
}