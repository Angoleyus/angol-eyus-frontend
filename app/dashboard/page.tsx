'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Zap, Clock, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [idea, setIdea] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/login');

        // Check for URL params (Stripe success)
        const params = new URLSearchParams(window.location.search);
        if (params.get('upgrade') === 'success') {
            // In a real app, backend webhook handles this.
            // Here we force a re-fetch or simulated upgrade if needed.
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => {
                setUser(data.user);
                setHistory(data.history);
            })
            .catch(() => router.push('/login'));
    }, [router]);

    const handleJudge = async (e) => {
        e.preventDefault();
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
            // Refresh history
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }).then(res => res.json()).then(d => setHistory(d.history));

        } catch (err) {
            alert('Judgment failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
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
            alert('Upgrade failed');
        }
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center text-brutal-purple animate-pulse">Initializing System...</div>;

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="font-mono text-sm text-gray-400">{user.email}</span>
                        {user.is_pro ? (
                            <span className="px-2 py-1 bg-brutal-purple/20 text-brutal-purple text-xs font-bold rounded border border-brutal-purple/50">PRO ACCESS</span>
                        ) : (
                            <button onClick={handleUpgrade} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs font-bold rounded border border-gray-700 hover:border-white hover:text-white transition-colors">
                                FREE TIER
                            </button>
                        )}
                    </div>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">

                {/* Submit Section */}
                <section className="animate-fade-in-up">
                    <h1 className="text-3xl font-bold mb-6 text-glow">SUBMIT IDEA FOR EXECUTION</h1>
                    <form onSubmit={handleJudge} className="glass-panel p-1 rounded-2xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brutal-purple to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
                        <div className="relative bg-brutal-black rounded-xl p-6">
                            <textarea
                                className="w-full bg-transparent text-white text-lg placeholder-gray-600 outline-none resize-none font-mono"
                                rows={4}
                                placeholder="Describe your startup idea in detail..."
                                value={idea}
                                onChange={e => setIdea(e.target.value)}
                            />
                            <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                                <span className="text-xs text-gray-500 font-mono">AI MODEL: BRUTAL_V1</span>
                                <button
                                    type="submit"
                                    disabled={loading || !idea}
                                    className="btn-primary py-2 px-6 text-sm flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? 'ANALYZING...' : 'GET VERDICT'} <Zap className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Verdict Result */}
                {verdict && (
                    <section className="animate-fade-in-up">
                        <div className={`p-8 rounded-xl border-l-4 ${verdict.verdict === 'KILL' ? 'border-red-500 bg-red-900/10' : 'border-green-500 bg-green-900/10'} glass-panel`}>
                            <div className="flex items-center gap-4 mb-6">
                                {verdict.verdict === 'KILL' ? <AlertTriangle className="text-red-500 w-8 h-8" /> : <CheckCircle className="text-green-500 w-8 h-8" />}
                                <h2 className="text-4xl font-black tracking-tighter uppercase">{verdict.verdict}</h2>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Brutal Feedback</h3>
                                <ul className="space-y-2">
                                    {verdict.reasons.map((r, i) => (
                                        <li key={i} className={`flex items-start gap-2 ${verdict.is_blurred ? 'blur-sm select-none' : ''}`}>
                                            <span className="text-brutal-purple">›</span>
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        Hidden Risk <Lock className="w-3 h-3" />
                                    </h3>
                                    <p className={`mt-2 font-mono text-red-400 ${verdict.is_blurred ? 'blur-sm select-none' : ''}`}>
                                        {verdict.hidden_risk}
                                    </p>
                                </div>

                                {verdict.is_blurred && (
                                    <div className="mt-6 text-center">
                                        <button onClick={handleUpgrade} className="btn-primary w-full md:w-auto">
                                            UNLOCK FULL REPORT ($5)
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* History */}
                <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" /> RECENT VERDICTS
                    </h2>
                    <div className="grid gap-4">
                        {history.map((item) => (
                            <div key={item.id} className="glass-panel p-4 flex justify-between items-center group hover:bg-white/5 transition-colors">
                                <div className="truncate max-w-md">
                                    <p className="text-white font-medium truncate">{item.idea_text}</p>
                                    <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className={`font-bold px-3 py-1 rounded text-xs ${item.verdict.verdict === 'KILL' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                    {item.verdict.verdict}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}
