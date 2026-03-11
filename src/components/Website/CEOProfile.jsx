import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const CEOProfile = () => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl p-1 bg-gradient-to-r from-brand-accent via-brand-neon to-brand-accent group shadow-[0_0_40px_rgba(122,60,255,0.2)]"
                >
                    {/* Inner Card */}
                    <div className="bg-brand-dark rounded-[22px] p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">

                        {/* Background Glows inside card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/10 rounded-full blur-[80px] group-hover:bg-brand-neon/20 transition-colors duration-700"></div>

                        {/* Profile Image Space */}
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-brand-neon/40 shrink-0 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                            <img src="/ceo.jpeg" alt="Descrapper Tech" className="w-full h-full object-cover" />
                        </div>

                        {/* Profile Data */}
                        <div className="flex-1 text-center md:text-left z-10">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-neon-light text-xs font-bold tracking-wider uppercase mb-4"
                            >
                                Lead Architect & CEO
                            </motion.span>

                            <h3 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-brand-neon transition-all duration-300">
                                Descrapper Tech (Duale)
                            </h3>

                            <p className="text-xl text-brand-accent font-medium mb-6">CYBROVA TECH SOLUTIONS</p>

                            <p className="text-gray-300 leading-relaxed mb-8">
                                A passionate technology enthusiast and visionary from <strong className="text-white">Habaswein</strong>. Duale studied at <strong className="text-white">Ademasajida Mixed Secondary School</strong> and is currently pursuing his degree at the <strong className="text-white">University of Embu</strong>. He focuses on pushing the boundaries of digital service platforms and bringing world-class cyber tech directly to the local community.
                            </p>

                            <a
                                href="https://wa.me/254797400491"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#25D366]/20 hover:bg-[#25D366]/40 px-6 py-3 rounded-full border border-[#25D366]/50 shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all mx-auto md:mx-0 group-hover:scale-105"
                            >
                                WhatsApp the CEO <ExternalLink size={16} />
                            </a>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default CEOProfile;
