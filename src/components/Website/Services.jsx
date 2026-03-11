import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Globe, BookOpen, ShieldCheck, GraduationCap, Palette, Wifi } from 'lucide-react';

const serviceCategories = [
    {
        title: "TECH SERVICES & SOFTWARE SUPPORT",
        icon: <Monitor size={28} className="text-brand-neon" />,
        items: ["Laptop software installation", "System troubleshooting", "Email setup & config", "Account recovery assistance"]
    },
    {
        title: "WEBSITE & DIGITAL SOLUTIONS",
        icon: <Globe size={28} className="text-brand-accent" />,
        items: ["Website development", "Simple e-commerce setup", "Social media account setup", "Business profile creation", "Branding support"]
    },
    {
        title: "CAREER & ACADEMIC SUPPORT",
        icon: <BookOpen size={28} className="text-warm-gold" />,
        items: ["CV writing", "LinkedIn profile setup", "Assignment typing & formatting", "Research formatting", "KUCCPS assistance", "HELB/HEF guidance"]
    },
    {
        title: "GOVERNMENT & LEGAL SERVICES",
        icon: <ShieldCheck size={28} className="text-brand-neon-light" />,
        items: ["KRA registration & returns", "NSSF registration", "NHIF registration", "TSC services", "Certificate of Good Conduct", "Birth certificate", "Passport application"]
    },
    {
        title: "EDUCATION & STUDENT SERVICES",
        icon: <GraduationCap size={28} className="text-brand-accent" />,
        items: ["KUCCPS applications", "HELB loan applications", "Higher Education Fund support", "University portal assistance"]
    },
    {
        title: "CREATIVE & DESIGN SERVICES",
        icon: <Palette size={28} className="text-warm-gold" />,
        items: ["Wedding card designs", "Graduation posters", "Logo design", "Branding materials"]
    },
    {
        title: "DIGITAL & ONLINE SERVICES",
        icon: <Wifi size={28} className="text-brand-neon" />,
        items: ["Bingwa data bundles", "Online form filling", "All cyber services", "Government portal navigation", "Tender application assistance"]
    }
];

const Services = () => {
    return (
        <section id="services" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-outfit font-bold mb-4"
                    >
                        Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-neon">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Comprehensive digital, tech, and creative solutions designed to elevate your personal and business presence.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group hover:border-brand-neon/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)] transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Subtle gradient background on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-outfit font-bold mb-4 text-white group-hover:text-brand-neon transition-colors">
                                    {category.title}
                                </h3>
                                <ul className="space-y-2 mt-auto">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
