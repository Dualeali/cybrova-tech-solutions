import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Services from './Services';
import BingwaDeals from './BingwaDeals';
import About from './About';
import CEOProfile from './CEOProfile';
import Contact from './Contact';
import Footer from './Footer';

const MainWebsite = () => {
    return (
        <div className="w-full min-h-screen bg-brand-dark text-white font-inter overflow-x-hidden">
            <Navbar />
            <div className="pt-24"> {/* Offset for sticky navbar */}
                <HeroSection />
                <Services />
                <BingwaDeals />
                <About />
                <CEOProfile />
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default MainWebsite;
