'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Attempting login to:", process.env.NEXT_PUBLIC_API_URL);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                // Force a hard refresh/navigation to ensure state updates
                window.location.href = '/dashboard';
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Connection failed. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md glass-panel p-8 md:p-12 animate-fade-in-up">

                <div className="text-center mb-10">
                    <Link href="/" className="inline-block relative w-20 h-20 mb-4 hover:scale-105 transition-transform">
                        <Image src="/logo.png" alt="ANGOLEYUS" fill className="object-contain" />
                    </Link>
                    <h2 className="text-2xl font-bold uppercase tracking-wider">Access Terminal</h2>
                    <p className="text-gray-500 text-sm mt-2">Enter credentials to proceed.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                        <input
                            type="email"
                            required
                            className="glass-input w-full p-4 outline-none"
                            placeholder="founder@startup.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="glass-input w-full p-4 outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Enter System'}
                    </button>
                </form>

                <div className="text-center mt-8 pt-8 border-t border-white/10">
                    <Link href="/register" className="text-gray-500 hover:text-brutal-purple text-sm transition-colors">
                        New user? Initialize Protocol
                    </Link>
                </div>
            </div>
        </div>
    );
}
