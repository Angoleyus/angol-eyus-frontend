'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
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
            alert('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brutal-black p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center flex flex-col items-center">
                    <Link href="/">
                        <img src="/logo.png" alt="ANGOLEYUS" className="h-24 w-auto mb-4 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                    </Link>
                    <h2 className="mt-4 text-gray-400">Join the resistance</h2>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
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
                    <button type="submit" className="w-full bg-brutal-purple text-white py-3 font-bold uppercase hover:bg-purple-600">
                        Create Account
                    </button>
                </form>
                <div className="text-center">
                    <Link href="/login" className="text-gray-500 hover:text-white text-sm">Already executed? Login</Link>
                </div>
            </div>
        </div>
    );
}
