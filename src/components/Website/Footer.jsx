import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bg-brand-dark pt-16 pb-8 border-t border-white/5 overflow-hidden">

            {/* Top Glowing Separator Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-neon focus-via-brand-neon to-transparent opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Col */}
                    <div className="space-y-4">
                        <h3 className="font-outfit font-bold text-2xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-brand-neon to-brand-neon-light border-b border-brand-neon/20 pb-4 inline-block mb-2">CYBROVA AI</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium digital solutions and cyber services serving Habaswein and the rest of Kenya with unparalleled tech efficiency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold font-outfit mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Services', 'Bingwa Deals', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-brand-neon text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Summary */}
                    <div>
                        <h4 className="text-white font-bold font-outfit mb-6">Top Services</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>Web Development</li>
                            <li>KUCCPS & HELB Assistance</li>
                            <li>Bingwa Data Bundles</li>
                            <li>Government Portals</li>
                            <li>Creative Design</li>
                        </ul>
                    </div>

                    {/* Contact & Socials */}
                    <div>
                        <h4 className="text-white font-bold font-outfit mb-6">Connect</h4>
                        <p className="text-gray-400 text-sm mb-4">Habaswein, Wajir County, Kenya</p>
                        <p className="text-brand-accent text-sm font-medium mb-6">cybrovatechsolutions@gmail.com</p>

                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-neon/20 hover:text-brand-neon transition-colors border border-white/5">
                                    <span className="sr-only">Social {i}</span>
                                    <div className="w-4 h-4 rounded-sm bg-gray-500"></div> {/* Placeholder icon */}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CYBROVA TECH SOLUTIONS. All rights reserved.</p>
                    <p>Designed by <a href="#" className="text-brand-neon-light hover:underline font-bold">Descrapper Tech Duale</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
