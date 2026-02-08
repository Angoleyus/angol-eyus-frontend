'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogOut, Crown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Fetch User
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) setUser(data.user);
            })
            .catch(() => router.push('/login'));

        // Check for upgrade success
        if (searchParams.get('upgrade') === 'success') {
            // In a real app, verify with backend. Here we assume success.
            if (user && !user.is_pro) {
                // trigger simulated upgrade if needed or refresh
                // actually /me should return updated status if webhook fired
                // or we manually call simulate-upgrade for demo if webhook failed
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulate-upgrade`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` }
                }).then(() => window.location.href = '/dashboard');
            }
        }
    }, [router, searchParams]); // Simplified deps

    const handleJudge = async () => {
        if (!idea.trim()) return;
        setLoading(true);
        setVerdict(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/judge`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ idea })
            });
            const data = await res.json();
            setVerdict(data);
        } catch (err) {
            alert('Judgment failed. The server is likely sleeping (Render free tier).');
        } finally {
            setLoading(false);
        }
    };

    const handleUpgrade = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (err) {
            alert('Stripe Setup Required in ENV');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (!user) return <div className="text-white p-10">Loading Protocol...</div>;

    return (
        <div className="min-h-screen bg-brutal-black text-white p-4 md:p-8 font-mono">
            <nav className="flex justify-between items-center mb-12 border-b border-gray-800 pb-4">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <img src="/logo.png" alt="ANGOL EYUS" className="h-12 w-auto" />
                </Link>
                <div className="flex gap-4 items-center">
                    <span className="text-xs text-gray-500">{user.email}</span>
                    {user.is_pro ? (
                        <span className="bg-brutal-purple text-black px-2 py-1 text-xs font-bold uppercase">PRO AGENT</span>
                    ) : (
                        <button onClick={handleUpgrade} className="bg-white text-black px-3 py-1 text-xs font-bold uppercase hover:bg-gray-200">
                            Upgrade to Pro
                        </button>
                    )}
                    <button onClick={logout}><LogOut className="w-5 h-5 text-gray-400 hover:text-white" /></button>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4 uppercase">Submit your startup idea</h2>
                    <textarea
                        className="w-full h-40 bg-black border border-gray-700 p-4 text-lg focus:border-brutal-purple focus:outline-none transition-colors"
                        placeholder="Describe your idea in detail. Don't be shy. I will destroy it anyway."
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                    />
                    <button
                        onClick={handleJudge}
                        disabled={loading}
                        className="mt-4 w-full bg-brutal-purple text-white py-4 font-bold text-xl uppercase tracking-widest hover:bg-purple-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'ANALYZING...' : 'JUDGE ME'}
                    </button>
                </div>

                {verdict && (
                    <div className="border border-gray-700 bg-gray-900/50 p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
                            <h3 className="text-sm text-gray-400 uppercase tracking-widest">Verdict</h3>
                            <div className={`text-4xl font-black ${verdict.verdict === 'KILL' ? 'text-red-500' : 'text-green-500'}`}>
                                {verdict.verdict}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-brutal-purple font-bold mb-2 uppercase text-sm">Reasoning</h4>
                                <ul className="space-y-2">
                                    {verdict.reasons.map((r, i) => (
                                        <li key={i} className={`flex items-start gap-2 ${verdict.is_blurred ? 'blur-sm select-none' : ''}`}>
                                            <span className="text-gray-500">0{i + 1}</span>
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-red-900/10 border border-red-900/30 p-4">
                                <div className="flex items-center gap-2 mb-2 text-red-500">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span className="font-bold uppercase text-xs">Hidden Risk</span>
                                </div>
                                <p className={`${verdict.is_blurred ? 'blur-md select-none' : ''}`}>
                                    {verdict.hidden_risk}
                                </p>
                            </div>

                            {verdict.is_blurred && (
                                <div className="text-center py-4">
                                    <p className="text-gray-400 mb-4 text-sm">You are viewing the Free Tier verdict.</p>
                                    <button onClick={handleUpgrade} className="bg-white text-black px-6 py-3 font-bold uppercase hover:bg-gray-200">
                                        Unlock Full Analysis
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
