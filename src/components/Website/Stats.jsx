import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Award, Briefcase } from 'lucide-react';

const stats = [
    { id: 1, name: 'Happy Clients', value: '5,000+', icon: <Users className="text-lime-400" size={32} /> },
    { id: 2, name: 'Data Bundles Delivered', value: '50k+', icon: <Zap className="text-brand-neon" size={32} /> },
    { id: 3, name: 'Projects Completed', value: '200+', icon: <Briefcase className="text-yellow-400" size={32} /> },
    { id: 4, name: 'Awards Won', value: '15', icon: <Award className="text-warm-gold" size={32} /> },
];

const Stats = () => {
    return (
        <section className="py-20 relative border-t border-white/5 bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-neon/5 to-transparent opacity-50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl backdrop-blur-md hover:bg-white/10 hover:border-lime-400/30 transition-all duration-300"
                        >
                            <div className="mb-3 md:mb-4 p-3 md:p-4 rounded-2xl bg-black/50 shadow-inner">
                                {stat.icon}
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-outfit mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
                                {stat.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
