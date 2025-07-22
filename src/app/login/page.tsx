'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            const token = await user.getIdToken();

            document.cookie = `authToken=${ token }; path=/; max-age=3600; Secure; SameSite=Lax`;

            setFormData({ email: '', password: '' });
            router.push('/');
        } catch (error) {
            console.error(error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-60 animate-blob" />
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000" />
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-60 animate-blob animation-delay-4000" />

            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl">
                            <RiDashboardHorizontalFill color='white' size={ 40 } />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome Back</h2>
                        <p className="text-gray-500 text-sm">Please login to continue</p>
                    </div>

                    { error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-center gap-2">
                            <MdErrorOutline size={ 25 } color='red' />
                            <p className="text-sm text-red-600">{ error }</p>
                        </div>
                    ) }

                    <form onSubmit={ handleLogin } className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={ formData.email }
                                onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={ formData.password }
                                onChange={ (e) => setFormData({ ...formData, password: e.target.value }) }
                                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={ loading }
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 Rounded-xl rounded-xl font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            { loading ? 'Signing in…' : 'Sign In' }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
