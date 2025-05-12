import * as React from 'react';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import PaymentInfo from './components/PaymentInfo';
import Gallery from './components/Gallery';
import Announcements from './components/Announcements';
import Footer from './components/Footer';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen ${mode === 'dark' ? 'dark' : ''}`}>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <div className={`w-full ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <hr className="border-gray-200 dark:border-gray-700" />
        <Gallery />
        <hr className="border-gray-200 dark:border-gray-700" />
        <Highlights />
        <hr className="border-gray-200 dark:border-gray-700" />
        <PaymentInfo />
        <hr className="border-gray-200 dark:border-gray-700" />
        <div className="bg-primary-900 p-8"> 
          <Announcements />
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
        <Footer />
      </div>
    </div>
  );
}
