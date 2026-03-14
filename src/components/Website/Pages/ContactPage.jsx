import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Contact from '../Contact';

const ContactForm = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Sending...");
        setTimeout(() => setStatus("Sent Successfully! We will contact you soon."), 1500);
    };

    return (
        <section className="py-20 relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-brand-dark/80 backdrop-blur-md border border-brand-accent/30 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,255,136,0.1)]"
                >
                    <h3 className="text-2xl md:text-4xl font-outfit font-bold text-white mb-6 text-center">Draft a Direct Message</h3>
                    <p className="text-gray-400 text-center mb-10">Skip the call and send us a direct system ping. We respond within minutes.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition-colors" />
                            <input required type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition-colors" />
                        </div>
                        <input required type="text" placeholder="Subject (e.g., KRA Returns)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition-colors" />
                        <textarea required placeholder="Your detailed request..." rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon transition-colors resize-none"></textarea>
                        
                        <button type="submit" disabled={status === "Sending..."} className="w-full bg-gradient-to-r from-brand-neon to-brand-neon-light text-brand-dark font-bold font-outfit text-lg py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70">
                            {status === "Sending..." ? "Transmitting Server Data..." : status || <><Send size={20} /> Transmit Message</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

const ContactPage = () => {
    return (
        <div className="pt-24 min-h-screen">
            <Contact />
            <ContactForm />
        </div>
    );
};

export default ContactPage;
