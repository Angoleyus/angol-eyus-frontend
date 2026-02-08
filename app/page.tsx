import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Target, Clock, ShieldAlert } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center">

            {/* Hero Section */}
            <section className="w-full max-w-5xl mx-auto px-6 py-20 md:py-32 text-center relative">

                <div className="animate-float mb-8 relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                    <Image
                        src="/logo.png"
                        alt="ANGOLEYUS Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]"
                        priority
                    />
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                    Most Ideas<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brutal-purple to-purple-400 text-glow">
                        Deserve To Die.
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-mono mb-12">
                    Stop wasting years on products nobody wants.<br />
                    <span className="text-white font-bold">ANGOLEYUS</span> decides if yours survives.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/dashboard" className="btn-primary group w-full sm:w-auto">
                        KILL MY IDEA
                        <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Value Props */}
            <section className="w-full max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Target className="w-8 h-8 text-brutal-purple" />,
                            title: "Ruthless Logic",
                            desc: "No sugarcoating. We destroy bad ideas using AI trained on failure patterns before the market does."
                        },
                        {
                            icon: <Zap className="w-8 h-8 text-brutal-purple" />,
                            title: "Instant Verdict",
                            desc: "Get a clear KILL or PROCEED decision in seconds. No waiting, no bias, just raw data."
                        },
                        {
                            icon: <Clock className="w-8 h-8 text-brutal-purple" />,
                            title: "Save Your Time",
                            desc: "Better to cry now than bankrupt later. We validate your core assumptions instantly."
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass-panel p-8 hover:border-brutal-purple/50 transition-colors group">
                            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
