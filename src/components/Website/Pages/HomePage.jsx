import React from 'react';
import HeroSection from '../HeroSection';
import Services from '../Services'; // We will feature top services here later
import BingwaDeals from '../BingwaDeals';

const HomePage = () => {
    return (
        <div className="pt-24 min-h-screen"> {/* Offset for sticky navbar */}
            <HeroSection />
            <Services />
            <BingwaDeals />
        </div>
    );
};

export default HomePage;
