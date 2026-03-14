import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import About from '../About';
import CEOProfile from '../CEOProfile';

const CoreValues = () => (
    <section className="py-20 relative z-10 overflow-hidden bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12">
                Our <span className="text-brand-accent">Mission & Core Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Zap className="text-brand-neon" size={32} />, title: "Speed", desc: "Lightning fast digital deliverables." },
                    { icon: <ShieldCheck className="text-brand-neon-light" size={32} />, title: "Reliability", desc: "100% uptime for Bingwa packages." },
                    { icon: <Users className="text-brand-accent" size={32} />, title: "Community", desc: "Empowering Wajir and beyond." },
                    { icon: <Globe className="text-warm-gold" size={32} />, title: "Global Standard", desc: "World-class web architectures." }
                ].map((val, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-neon/40 transition-colors shadow-lg"
                    >
                        <div className="w-16 h-16 rounded-full bg-brand-dark/50 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                            {val.icon}
                        </div>
                        <h4 className="text-xl font-bold font-outfit text-white mb-2">{val.title}</h4>
                        <p className="text-gray-400 text-sm">{val.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const AboutPage = () => {
    return (
        <div className="pt-24 min-h-screen">
            <About />
            <CoreValues />
            <CEOProfile />
        </div>
    );
};

export default AboutPage;
