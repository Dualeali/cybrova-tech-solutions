import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-lime-400/20 via-black/80 to-yellow-400/20 border border-white/20 rounded-[3rem] p-10 md:p-16 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(204,255,0,0.15)] relative overflow-hidden"
                >
                    {/* Decorative subtle grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

                    <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Stay Ahead of the Curve
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10 relative z-10">
                        Subscribe to our newsletter for exclusive Bingwa deals, the latest tech insights, and software updates directly to your inbox.
                    </p>

                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative z-10">
                        <div className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-6 pr-36 text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 focus:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={subscribed}
                                className={`absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
                                    subscribed
                                        ? 'bg-green-500 text-white'
                                        : 'bg-lime-400 text-black hover:bg-lime-300 hover:scale-105'
                                }`}
                            >
                                {subscribed ? (
                                    <>
                                        <CheckCircle2 size={18} /> Done
                                    </>
                                ) : (
                                    <>
                                        Subscribe <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">We respect your privacy. No spam ever.</p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
