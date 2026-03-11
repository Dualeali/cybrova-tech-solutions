import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactInfo = [
    {
        title: "Phone & WhatsApp",
        value: "0797400491",
        icon: <Phone size={24} className="text-brand-neon" />,
        link: "tel:0797400491"
    },
    {
        title: "Email Address",
        value: "cybrovatechsolutions@gmail.com",
        icon: <Mail size={24} className="text-brand-accent" />,
        link: "mailto:cybrovatechsolutions@gmail.com"
    },
    {
        title: "Location",
        value: "Habaswein, Wajir County, Kenya",
        icon: <MapPin size={24} className="text-warm-gold" />,
        link: "#"
    },
    {
        title: "Working Hours",
        value: "24/7 Online Support",
        icon: <Clock size={24} className="text-brand-neon-light" />,
        link: "#"
    }
];

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">
                        Get in <span className="text-brand-accent">Touch</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We are always online and ready to assist you. Reach out via WhatsApp, phone, or email for instant support.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, idx) => (
                        <motion.a
                            href={info.link}
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 hover:-translate-y-2 hover:border-white/20 transition-all duration-300 group shadow-lg"
                        >
                            <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-inner">
                                {info.icon}
                            </div>
                            <h4 className="text-gray-400 text-sm font-medium mb-2">{info.title}</h4>
                            <p className="text-white font-bold text-lg group-hover:text-brand-neon transition-colors">
                                {info.value}
                            </p>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Contact;
