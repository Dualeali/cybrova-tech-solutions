import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

// Pages
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import ServicesPage from './Pages/ServicesPage';
import DealsPage from './Pages/DealsPage';

const MainWebsite = () => {
    const location = useLocation();
    
    return (
        <div className="w-full min-h-screen bg-brand-dark text-white font-inter overflow-x-hidden flex flex-col">
            <Navbar />
            
            <div className="flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/deals" element={<DealsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </AnimatePresence>
            </div>
            
            <Footer />
        </div>
    );
};

export default MainWebsite;
