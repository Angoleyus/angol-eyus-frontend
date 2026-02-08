'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
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
                router.push('/dashboard');
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brutal-black p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center flex flex-col items-center">
                    <Link href="/">
                        <img src="/logo.png" alt="ANGOLEYUS" className="h-24 w-auto mb-4 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                    </Link>
                    <h2 className="mt-4 text-gray-400">Login to your account</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-900 border border-gray-800 p-3 text-white focus:border-brutal-purple focus:outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-900 border border-gray-800 p-3 text-white focus:border-brutal-purple focus:outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-white text-black py-3 font-bold uppercase hover:bg-gray-200">
                        Enter
                    </button>
                </form>
                <div className="text-center">
                    <Link href="/register" className="text-gray-500 hover:text-white text-sm">Need an account? Register</Link>
                </div>
            </div>
        </div>
    );
}
