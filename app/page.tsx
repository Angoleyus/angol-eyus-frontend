import Link from 'next/link';
import { ArrowRight, Skull, Zap } from 'lucide-react';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-brutal-black p-4 text-center overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brutal-purple to-transparent opacity-50"></div>

            {/* Hero Section */}
            <div className="z-10 max-w-4xl w-full space-y-8 animate-fade-in-up">

                <div className="mb-4 relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                    {/* User: Save your image as public/logo.png */}
                    <img src="/logo.png" alt="Angol Eyus Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none purple-glow">
                    Most Ideas<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Deserve To Die.</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-mono">
                    Stop wasting years on products nobody wants. <br />
                    <span className="text-brutal-purple font-bold">Angol Eyus</span> decides if yours survives.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12">
                    <Link href="/dashboard" className="group relative px-8 py-4 bg-white text-black font-bold text-xl uppercase tracking-widest hover:bg-brutal-purple hover:text-white transition-all duration-300 clip-path-slant">
                        Kill My Idea
                        <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/login" className="text-gray-500 hover:text-white underline decoration-brutal-purple decoration-2 underline-offset-4">
                        Login
                    </Link>
                </div>

                {/* Viral Hooks / Social Proof Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
                    {[
                        { title: "Ruthless Logic", desc: "No sugarcoating. We destroy bad ideas before the market does." },
                        { title: "Instant Verdict", desc: "Get a clear KILL or PROCEED decision in seconds." },
                        { title: "Save Your Time", desc: "Better to cry now than bankrupt later." }
                    ].map((item, i) => (
                        <div key={i} className="p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-brutal-purple/50 transition-colors">
                            <Zap className="w-6 h-6 text-brutal-purple mb-4" />
                            <h3 className="text-xl font-bold mb-2 uppercase">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
