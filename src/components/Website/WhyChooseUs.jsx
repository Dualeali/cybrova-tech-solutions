import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Cpu, Headphones } from 'lucide-react';

const features = [
    {
        title: "Instant Delivery",
        description: "Our automated systems ensure you receive your Bingwa bundles and services within seconds of purchase.",
        icon: <Clock size={32} className="text-lime-400" />
    },
    {
        title: "Bank-Grade Security",
        description: "Your data and transactions are encrypted and secured with top-tier technology. Privacy is our priority.",
        icon: <ShieldCheck size={32} className="text-yellow-400" />
    },
    {
        title: "24/7 Expert Support",
        description: "Encounter an issue? Our AI assistant and human experts are available round the clock to help you out.",
        icon: <Headphones size={32} className="text-brand-neon" />
    },
    {
        title: "Cutting-Edge Tech",
        description: "From web development to system integrations, we use the latest frameworks to build fast, scalable solutions.",
        icon: <Cpu size={32} className="text-warm-gold" />
    }
];

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-lime-400/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-white"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-yellow-400">CYBROVA</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        We combine speed, security, and innovation to deliver digital services that actually move the needle for you.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            className="bg-black/40 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:border-lime-400/40 hover:bg-white/5 transition-all duration-300 group flex items-start gap-6"
                        >
                            <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-lime-400/10 transition-all duration-300 shadow-lg">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold font-outfit text-white mb-3 group-hover:text-lime-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
