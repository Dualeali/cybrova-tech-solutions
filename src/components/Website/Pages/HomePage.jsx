import React from 'react';
import { TubesCursor } from '../../ui/tube-cursor';
import Services from '../Services'; // We will feature top services here later
import BingwaDeals from '../BingwaDeals';
import Stats from '../Stats';
import WhyChooseUs from '../WhyChooseUs';
import Newsletter from '../Newsletter';

const HomePage = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#050505]"> {/* Offset for sticky navbar */}
            <div className="container mx-auto px-4 mb-24">
                <TubesCursor
                    title="Cybrova Tech Solutions"
                    subtitle="Empowering Your Digital Future"
                    caption="We deliver cutting-edge technology solutions, from robust software development to seamless system integrations. Experience the next generation of web and mobile applications with our expert team."
                    initialColors={["#fbbf24", "#a3e635", "#facc15"]}
                    lightColors={["#fef08a", "#d9f99d", "#fde047", "#bef264"]}
                    lightIntensity={300}
                    titleSize="text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
                    subtitleSize="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2"
                    captionSize="text-sm md:text-lg lg:text-xl"
                    enableRandomizeOnClick
                />
            </div>
            <Stats />
            <WhyChooseUs />
            <Services />
            <BingwaDeals />
            <Newsletter />
        </div>
    );
};

export default HomePage;
