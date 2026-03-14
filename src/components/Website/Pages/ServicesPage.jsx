import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Monitor, Globe, BookOpen, ShieldCheck, GraduationCap, Palette, Wifi, MessageSquare, ChevronDown } from 'lucide-react';

const serviceCategories = [
    {
        title: "TECH SERVICES & SOFTWARE",
        icon: <Monitor size={28} className="text-brand-neon" />,
        color: "brand-neon",
        items: ["Laptop software installation", "System troubleshooting", "Email setup & config", "Account recovery assistance"]
    },
    {
        title: "WEBSITE & DIGITAL SOLUTIONS",
        icon: <Globe size={28} className="text-brand-accent" />,
        color: "brand-accent",
        items: ["Website development", "Simple e-commerce setup", "Social media account setup", "Business profile creation", "Branding support"]
    },
    {
        title: "CAREER & ACADEMIC SUPPORT",
        icon: <BookOpen size={28} className="text-warm-gold" />,
        color: "warm-gold",
        items: ["CV writing", "LinkedIn profile setup", "Assignment typing & formatting", "Research formatting", "KUCCPS assistance", "HELB/HEF guidance"]
    },
    {
        title: "GOVERNMENT & LEGAL",
        icon: <ShieldCheck size={28} className="text-brand-neon-light" />,
        color: "brand-neon-light",
        items: ["KRA registration & returns", "NSSF registration", "NHIF registration", "TSC services", "Certificate of Good Conduct", "Birth certificate", "Passport application"]
    },
    {
        title: "EDUCATION & STUDENT APPS",
        icon: <GraduationCap size={28} className="text-brand-accent" />,
        color: "brand-accent",
        items: ["KUCCPS applications", "HELB loan applications", "Higher Education Fund support", "University portal assistance"]
    },
    {
        title: "CREATIVE & BRAND DESIGN",
        icon: <Palette size={28} className="text-warm-gold" />,
        color: "warm-gold",
        items: ["Wedding card designs", "Graduation posters", "Logo design", "Branding materials"]
    },
    {
        title: "BINGWA CYBER CAFE",
        icon: <Wifi size={28} className="text-brand-neon" />,
        color: "brand-neon",
        items: ["Bingwa data bundles", "Online form filling", "All cyber services", "Tender application assistance"]
    }
];

const faqs = [
    { q: "How fast do you build websites?", a: "A standard business website takes 3-7 days depending on the complexity and content readiness." },
    { q: "Do I need to visit your physical shop for services?", a: "No! 95% of our services (like KRA, HELB, KUCCPS, and CV writing) can be done completely online via WhatsApp." },
    { q: "How do I pay for Bingwa Bundles?", a: "You can pay directly via our M-Pesa Buy Goods Till Number 6606905. Bundles are credited automatically." },
    { q: "Do you offer physical computer repair?", a: "We primarily handle software troubleshooting, installations, and system optimization." }
];

const ServiceCard = ({ category }) => {
    // Gyro-tilt or mouse-tilt effect
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform('');
    };

    const vibrate = () => {
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const whatsappLink = `https://wa.me/254797400491?text=${encodeURIComponent(`Hello CYBROVA, I need help with ${category.title} services.`)}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, transition: transform ? 'none' : 'transform 0.5s ease' }}
            className={`bg-brand-dark/40 border border-${category.color}/30 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full hover:shadow-[0_0_30px_rgba(var(--${category.color}-rgb),0.15)] relative overflow-hidden group`}
        >
            <div className={`absolute top-0 left-0 w-full h-1 bg-${category.color} opacity-50`}></div>
            
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-${category.color}/10 border border-${category.color}/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                </div>
                <h3 className="text-xl font-bold font-outfit text-white">{category.title}</h3>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
                {category.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full bg-${category.color} mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(var(--${category.color}-rgb),0.6)]`}></span>
                        {item}
                    </li>
                ))}
            </ul>

            <a 
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={vibrate}
                className={`mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white font-bold hover:bg-${category.color}/20 hover:border-${category.color}/50 transition-all text-sm group-hover:text-${category.color}`}
            >
                <MessageSquare size={16} /> Contact Admin
            </a>
        </motion.div>
    );
};

const ServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFaq, setActiveFaq] = useState(null);

    const filteredServices = serviceCategories.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    })).filter(cat => cat.items.length > 0 || cat.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen pt-28 pb-20 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Ambient Background */}
            <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header & Search */}
            <div className="text-center mb-16 relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-extrabold font-outfit mb-6 text-white"
                >
                    Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-neon">Services</span>
                </motion.h1>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-xl mx-auto relative group"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-neon transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for KRA, Website, Blankets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-brand-dark/50 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all"
                    />
                </motion.div>
            </div>

            {/* Services Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-24">
                <AnimatePresence>
                    {filteredServices.length > 0 ? (
                        filteredServices.map((category, idx) => (
                            <ServiceCard key={category.title} category={category} />
                        ))
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="col-span-full text-center py-20 text-gray-400"
                        >
                            <Search size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No services found matching "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-neon hover:underline">Clear search</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold font-outfit text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div 
                            key={idx}
                            className="bg-brand-dark/50 border border-white/10 rounded-2xl overflow-hidden"
                            initial={false}
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className="font-bold text-lg text-gray-200">{faq.q}</span>
                                <ChevronDown 
                                    size={20} 
                                    className={`text-brand-neon transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            <AnimatePresence>
                                {activeFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-5 text-gray-400"
                                    >
                                        <div className="pt-2 border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
