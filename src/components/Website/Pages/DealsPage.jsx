import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Phone, Clock, MessageCircle, CheckCircle2, ShoppingCart, Copy, Check, BellRing } from 'lucide-react';

const categories = [
    { id: "data", name: "DATA DEALS", icon: <Wifi size={24} className="text-brand-neon" />, desc: "Fast & affordable browsing" },
    { id: "tunukiwa", name: "TUNUKIWA DEALS", icon: <CheckCircle2 size={24} className="text-warm-gold" />, desc: "Special targeted offers" },
    { id: "minutes", name: "MINUTES DEALS", icon: <Phone size={24} className="text-brand-accent" />, desc: "Talk longer for less" },
    { id: "sms", name: "SMS DEALS", icon: <MessageCircle size={24} className="text-blue-400" />, desc: "Stay connected via text" }
];

const bundleData = {
    data: [
        { name: "1GB", price: "Ksh 19", valid: "1 Hour" },
        { name: "250MB", price: "Ksh 20", valid: "24 Hours" },
        { name: "1.5GB", price: "Ksh 49", valid: "3 Hours" },
        { name: "1.25GB", price: "Ksh 55", valid: "Till Midnight" },
        { name: "1GB", price: "Ksh 99", valid: "24 Hours" },
        { name: "350MB", price: "Ksh 47", valid: "7 Days" },
        { name: "2.5GB", price: "Ksh 300", valid: "30 Days" }
    ],
    tunukiwa: [
        { name: "1GB Tunukiwa", price: "Ksh 22", valid: "1 Hour" },
        { name: "1.5GB Tunukiwa", price: "Ksh 54", valid: "3 Hours" },
        { name: "2GB Tunukiwa", price: "Ksh 110", valid: "24 Hours" },
    ],
    minutes: [
        { name: "45 Minutes", price: "Ksh 23", valid: "3 Hours" },
        { name: "50 Minutes", price: "Ksh 51", valid: "Till Midnight" },
    ],
    sms: [
        { name: "20 SMS", price: "Ksh 5", valid: "24 Hours" },
        { name: "200 SMS", price: "Ksh 10", valid: "24 Hours" },
        { name: "1000 SMS", price: "Ksh 32", valid: "7 Days" },
        { name: "3500 SMS", price: "Ksh 201", valid: "3 Days" },
    ]
};

const mpesaSteps = [
    "Open M-Pesa on your phone",
    "Select Lipa na M-Pesa",
    "Choose Buy Goods and Services",
    "Enter Till Number: 6606905",
    "Enter your exact bundle amount",
    "Confirm with your M-Pesa PIN"
];

// Mock recent activities for the toast system
const mockActivities = [
    "A user in Wajir just bought 1.5GB Tunukiwa ✨",
    "Someone in Nairobi just topped up 1000 SMS 🚀",
    "A new user just bought 2.5GB for 30 Days 🔥",
    "45 Minutes bundle activated in Mombasa ⚡"
];

const DealsPage = () => {
    const [activeCategory, setActiveCategory] = useState("data");
    const [copied, setCopied] = useState(false);
    
    // Toast state
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        // Randomly show toast every 8 - 15 seconds
        const triggerToast = () => {
            const randomMsg = mockActivities[Math.floor(Math.random() * mockActivities.length)];
            setToastMessage(randomMsg);
            
            // Auto hide after 4 seconds
            setTimeout(() => {
                setToastMessage(null);
            }, 4000);

            // Schedule next
            const nextTime = Math.random() * (15000 - 8000) + 8000;
            timeoutId = setTimeout(triggerToast, nextTime);
        };

        let timeoutId = setTimeout(triggerToast, 5000); // Initial delay
        return () => clearTimeout(timeoutId);
    }, []);

    const vibrate = () => {
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleCopyTill = () => {
        vibrate();
        navigator.clipboard.writeText("6606905");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pt-28 pb-20 relative w-full overflow-hidden bg-brand-dark">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-neon/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-outfit font-extrabold mb-4"
                    >
                        Bingwa <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-brand-neon-light">Sokoni Deals</span>
                    </motion.h1>
                    <p className="text-gray-400 text-lg">Select a category below to instantly view our massive discounts.</p>
                </div>

                {/* Bundle Categories Tabs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {categories.map((cat, idx) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.div
                                key={idx}
                                onClick={() => {
                                    vibrate();
                                    setActiveCategory(cat.id);
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-2xl p-4 md:p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer border ${
                                    isActive 
                                    ? 'bg-white/10 border-brand-neon/50 shadow-[0_0_30px_rgba(0,255,136,0.2)]' 
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                                }`}
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 border transition-colors ${
                                    isActive ? 'bg-black/60 border-brand-neon/50' : 'bg-black/40 border-white/10'
                                } shadow-inner`}>
                                    {cat.icon}
                                </div>
                                <h3 className={`text-md md:text-lg font-bold font-outfit mb-1 md:mb-2 ${isActive ? 'text-brand-neon-light' : 'text-white'}`}>{cat.name}</h3>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">{cat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Dynamic Bundle Pricing Cards sliding animation */}
                <div className="mb-20 min-h-[300px] overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.div 
                            key={activeCategory}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {bundleData[activeCategory].map((bundle, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -5 }}
                                    className="bg-brand-dark/50 border border-brand-accent/20 rounded-2xl p-6 hover:border-brand-neon/40 transition-colors duration-300 group flex flex-col h-full"
                                >
                                    <h4 className="text-xl font-bold font-outfit text-white mb-2">{bundle.name}</h4>
                                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-neon-light mb-4">
                                        {bundle.price}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-grow">
                                        <Clock size={16} className="text-brand-accent" />
                                        Valid: <strong className="text-white">{bundle.valid}</strong>
                                    </div>
                                    
                                    <a 
                                        href={`https://wa.me/254797400491?text=Hello%20CYBROVA,%20I%20want%20to%20buy%20the%20${bundle.name}%20for%20${bundle.price}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={vibrate}
                                        className="w-full py-3 mt-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white font-bold hover:bg-brand-accent/20 hover:border-brand-accent/50 transition-all group-hover:text-brand-neon text-sm shadow-sm hover:shadow-brand-accent/20"
                                    >
                                        <ShoppingCart size={16} /> Quick Buy
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Large How to Buy Section */}
                <motion.div
                    id="how-to-buy"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-brand-purple/80 to-coffee-brown/40 border border-brand-accent/30 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                    {/* Neon Top Trim */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-neon to-brand-accent"></div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h3 className="text-3xl font-outfit font-bold text-white mb-4">How to Buy Directly</h3>
                            <p className="text-gray-400 mb-6">Check the price of your preferred package above, then pay via M-Pesa immediately.</p>
                            
                            {/* Interactive Till Button */}
                            <motion.button 
                                onClick={handleCopyTill}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${copied ? 'bg-green-500/20 border-green-400 shadow-[0_0_20px_rgba(0,255,136,0.3)]' : 'bg-brand-dark/80 border-brand-neon/30 hover:shadow-[0_0_15px_rgba(0,255,136,0.2)]'}`}
                            >
                                <p className="text-xs text-brand-neon-light font-bold tracking-wider mb-2">TILL NUMBER</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-3xl font-mono font-bold text-white tracking-widest">6606905</p>
                                    {copied ? <Check className="text-green-400" size={24} /> : <Copy className="text-gray-400" size={20} />}
                                </div>
                                <p className={`text-xs mt-2 font-medium ${copied ? 'text-green-400' : 'text-gray-500'}`}>
                                    {copied ? 'Copied to clipboard!' : 'Tap to Copy'}
                                </p>
                            </motion.button>
                        </div>

                        <div className="md:w-2/3 w-full">
                            <div className="space-y-4">
                                {mpesaSteps.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (idx * 0.1) }}
                                        className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 hover:border-green-500/30 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-brand-neon flex items-center justify-center font-bold font-mono text-sm shrink-0 border border-green-500/30">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-300 font-medium">{step}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Live Activity Toast */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-32 left-4 md:left-8 z-[1000] bg-brand-dark/90 backdrop-blur-md border border-brand-neon/30 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 max-w-sm"
                    >
                        <div className="w-10 h-10 rounded-full bg-brand-neon/20 flex items-center justify-center flex-shrink-0 text-brand-neon">
                            <BellRing size={20} />
                        </div>
                        <p className="text-sm font-medium text-white">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default DealsPage;
