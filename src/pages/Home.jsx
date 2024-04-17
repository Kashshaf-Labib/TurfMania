//import React from 'react'
import { useEffect, useState } from 'react';
import Background from '../components/Background/Background';
import Footer from '../components/Header/Footer';
import Hero from '../components/Home Hero Section/Hero';
import Header from './../components/Header/Header';

function Home() {
  let heroData = [
    { text1: 'Dive into', text2: 'what you love' },
    { text1: 'Indulge', text2: 'your passions' },
    { text1: 'Give in to', text2: 'your passion' },
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setHeroCount(count => {
        return count === 2 ? 0 : count + 1;
      });
    }, 4000);
  }, []);
  return (
    <div>
      <div>
        <Header />
        <Background playStatus={playStatus} heroCount={heroCount} />
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
