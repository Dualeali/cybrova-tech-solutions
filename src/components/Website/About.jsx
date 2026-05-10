import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Story Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-6">
                            About <span className="text-brand-accent">CYBROVA</span>
                        </h2>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                CYBROVA TECH SOLUTIONS is a fast, reliable, and premium online digital service hub. Based in <span className="text-white font-semibold">Habaswein, Wajir County, Kenya</span>, we are dedicated to serving tech-savvy clients and businesses across the entire country.
                            </p>
                            <p>
                                Our mission is to bridge the digital divide by offering instant, top-tier services ranging from web development, branding, and smart cyber services, to government and student portal assistance. Your digital success is our blueprint.
                            </p>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl">
                                <h4 className="text-brand-neon text-3xl font-outfit font-bold mb-1">24/7</h4>
                                <p className="text-sm text-gray-400">Online Support</p>
                            </div>
                            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl">
                                <h4 className="text-brand-neon-light text-3xl font-outfit font-bold mb-1">100%</h4>
                                <p className="text-sm text-gray-400">Reliable Services</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animated Graphic/Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] rounded-3xl overflow-hidden group border border-white/10 shadow-[0_0_30px_rgba(204,255,0,0.15)]"
                    >
                        <img src="/ceo.jpeg" alt="CYBROVA Leadership" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                        {/* Floating Glass Box */}
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-sm md:text-base font-bold text-lime-400 tracking-wide">Innovation in Wajir. Serving the World.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
