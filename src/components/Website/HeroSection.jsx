import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">

            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Animated Particles/Blobs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-brand-neon/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-brand-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-warm-gold/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Animated Logo Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto w-32 h-32 mb-8 relative flex items-center justify-center animate-pulse-slow"
                >
                    <img src="/logo.png" alt="CYBROVA Logo" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,255,136,0.4)]" />
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold font-outfit tracking-tight mb-6"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-sm">CYBROVA TECH</span><br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-neon to-brand-neon-light drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">SOLUTIONS</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium"
                >
                    Your premium digital service hub. We deliver cutting-edge web development, KUCCPS assistance, Bingwa Deals, and comprehensive tech support.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a href="#services" className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-brand-neon to-brand-neon-light text-brand-dark font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all hover:scale-105">
                        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-in-out -translate-x-full skew-x-12"></div>
                        Explore Services
                    </a>
                    <a href="#contact" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm hover:scale-105">
                        Contact Us
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
