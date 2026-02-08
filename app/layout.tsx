import './globals.css'
import { Inter, Space_Mono } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

export const metadata = {
    title: 'ANGOLEYUS | The Idea Killer',
    description: 'Most ideas deserve to die. Find out if yours is one of them.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceMono.variable} font-sans min-h-screen flex flex-col relative overflow-x-hidden`}>

                {/* Background Gradients */}
                <div className="fixed inset-0 z-[-1] bg-brutal-black">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brutal-purple/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]"></div>
                </div>

                {/* Navbar */}
                <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-brutal-black/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/logo.png"
                                    alt="ANGOLEYUS"
                                    fill
                                    className="object-contain group-hover:brightness-125 transition-all"
                                />
                            </div>
                            <span className="font-mono font-bold text-lg md:text-xl tracking-tighter text-white">
                                ANGOLEYUS
                            </span>
                        </Link>
                        <div className="flex gap-6 items-center">
                            <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest hidden md:block">
                                Login
                            </Link>
                            <Link href="/register" className="btn-secondary text-xs md:text-sm">
                                Join
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow pt-24">
                    {children}
                </main>

                <footer className="border-t border-white/5 py-12 mt-20 bg-black/50">
                    <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm font-mono">
                        <p>&copy; {new Date().getFullYear()} ANGOLEYUS. All rights reserved.</p>
                        <p className="mt-2">Built for the ruthless.</p>
                    </div>
                </footer>

            </body>
        </html>
    )
}
