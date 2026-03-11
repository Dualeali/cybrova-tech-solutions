import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the prompt
    const dismissedAt = localStorage.getItem('cybrova_pwa_dismissed');
    if (dismissedAt) {
      const timeSinceDismissed = Date.now() - parseInt(dismissedAt, 10);
      // Don't show again for 7 days
      if (timeSinceDismissed < 7 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }

    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
      window.pwaInstallPrompt = e; // Expose globally for Navbar buttons
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        delete window.pwaInstallPrompt;
    };
  }, []);

  const onClickInstall = () => {
    if (!promptInstall) return;
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsDismissed(true); // Hide it immediately upon acceptance
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('cybrova_pwa_dismissed', Date.now().toString());
  };

  if (!supportsPWA || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-0 left-0 w-full z-[10000] p-4 md:p-6 pointer-events-none"
      >
        <div className="max-w-md mx-auto bg-brand-dark border border-brand-neon/40 shadow-[0_0_30px_rgba(0,255,136,0.3)] rounded-2xl p-4 md:p-5 pointer-events-auto flex flex-col gap-4 relative overflow-hidden backdrop-blur-xl bg-opacity-95">
          
          {/* Neon Top Trim */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-neon to-brand-accent"></div>

          <button 
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Dismiss install prompt"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 shrink-0 rounded-2xl p-1 bg-gradient-to-br from-brand-neon to-brand-neon-light shadow-lg">
              <div className="w-full h-full bg-brand-dark rounded-xl flex items-center justify-center p-2">
                <img src="/logo.png" alt="CYBROVA App Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex flex-col pr-6">
              <h3 className="text-white font-bold font-outfit text-lg leading-tight">Install CYBROVA App</h3>
              <p className="text-gray-400 text-sm mt-1 leading-snug">Get the full screen mobile experience on your home screen.</p>
            </div>
          </div>

          <button
            onClick={onClickInstall}
            className="w-full py-3 rounded-xl bg-brand-neon text-brand-dark font-bold font-outfit shadow-[0_0_15px_rgba(0,255,136,0.5)] hover:bg-brand-neon-light hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Download size={18} /> Install App Directly
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPWA;
