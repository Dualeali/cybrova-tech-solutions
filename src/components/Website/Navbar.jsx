import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Bingwa Deals', path: '/deals' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Placeholder */}
                    <Link to="/">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="relative p-0.5 rounded-full bg-gradient-to-br from-brand-neon to-brand-neon-light shadow-[0_0_15px_rgba(0,255,136,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,136,0.8)] transition-all duration-300">
                                <img src="/logo.jpeg" alt="CYBROVA Logo" className="w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-brand-dark" />
                            </div>
                            <span className="font-outfit font-bold text-xl sm:text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-brand-neon to-brand-neon-light cyber-glitch">
                                CYBROVA
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <Link key={link.name} to={link.path}>
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`font-medium text-sm transition-colors relative group block ${location.pathname === link.path ? 'text-brand-neon' : 'text-gray-300 hover:text-white'}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-neon transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </motion.span>
                            </Link>
                        ))}
                        <motion.button
                            onClick={() => {
                                if (window.pwaInstallPrompt) {
                                    window.pwaInstallPrompt.prompt();
                                } else {
                                    alert("CYBROVA might already be installed, or your browser requires you to use 'Add to Home Screen' from its menu.");
                                }
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 flex items-center gap-2 rounded-full bg-brand-neon text-brand-dark font-bold text-sm hover:bg-brand-neon-light shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Install App
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => {
                                if (window.pwaInstallPrompt) {
                                    window.pwaInstallPrompt.prompt();
                                } else {
                                    alert("Installed already, or tap 'Add to Home Screen' in browser options.");
                                }
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-neon text-brand-dark text-xs font-bold shadow-[0_0_10px_rgba(0,255,136,0.3)] transition-transform active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Install
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-dark/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path ? 'text-brand-neon bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
