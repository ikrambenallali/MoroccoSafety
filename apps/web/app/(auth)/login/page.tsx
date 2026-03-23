'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/authSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { token } = useSelector((state: any) => state.auth)

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(loginUser(form));
    };

    useEffect(() => {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token || storedToken) {
            router.replace('/admin/dashboard') // ✅ replace better que push
        }
    }, [token, router])

    return (
        <div className="flex min-h-screen w-full bg-[#2D3336]">

            {/* SECTION GAUCHE : Formulaire */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 md:px-20">
                <div className="w-full max-w-md">

                    <h1
                        className="text-[#D84040] text-5xl font-bold mb-12 italic uppercase tracking-wider text-center"
                        style={{ fontFamily: 'serif' }}
                    >
                        LOGIN
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <input
                            type="email"
                            placeholder="email"
                            className="bg-[#4A5154] text-gray-200 placeholder-gray-400 p-4 outline-none border-none text-xl w-full focus:ring-2 focus:ring-red-500 transition-all"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="password"
                            placeholder="password"
                            className="bg-[#4A5154] text-gray-200 placeholder-gray-400 p-4 outline-none border-none text-xl w-full focus:ring-2 focus:ring-red-500 transition-all"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button
                            type="submit"
                            className="bg-[#D84040] text-white text-2xl font-bold py-1 rounded-lg w-1/3 max-w-xs mx-auto"
                        >
                            Login
                        </button>
                    </form>

                </div>
                <p className="text-gray-400 text-center mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-[#D84040] cursor-pointer font-bold"
                        onClick={() => router.push('/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </div>

            {/* SECTION DROITE : Image */}
            <div className="hidden md:block md:w-1/2 relative">
                <Image
                    src="/photo2.png"
                    alt="Security background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

        </div>
    );
}