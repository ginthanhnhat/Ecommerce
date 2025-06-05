import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import RecommendationSection from '../components/RecommendationSection';

const Home = () => {
    return (
        <div>
            <Hero />
            <RecommendationSection 
            title={'Personalized Recommendations'}
            model={'hybrid'}
            payload={{
                user_id: 'AE22ROVSXEBTQR3P74MUNSRFPZZQ',
                category: 'Gift_Cards',
                top_k: 5
            }}
            />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
        </div>
    );
};

export default Home;
