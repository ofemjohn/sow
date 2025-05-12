import React from 'react';
import { FaChurch, FaHeart, FaGlobe, FaPrayingHands } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[100rem] h-[100rem] bg-primary-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Cross Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <h2 className="text-primary-200 font-medium tracking-wider mb-4 animate-fade-in">
              THE REDEEMED CHRISTIAN CHURCH OF GOD
            </h2>
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight animate-slide-up">
              Scent of Water Parish
            </h1>
            <p className="text-xl text-primary-100/80 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Join us in our mission to spread God's love and make a difference in our community.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <FeatureCard 
              icon={<FaChurch />}
              title="Sunday Service"
              description="Join us every Sunday at 8:15 AM for worship and fellowship."
            />
            <FeatureCard 
              icon={<FaPrayingHands />}
              title="Weekly Activities"
              description="Engage in our various spiritual activities throughout the week."
            />
            <FeatureCard 
              icon={<FaGlobe />}
              title="Global Mission"
              description="Be part of our mission to reach every nation for Christ."
            />
          </div>

          {/* Vision Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Our Vision & Mission</h3>
              <div className="space-y-6 text-primary-100/80">
                <p className="leading-relaxed">
                  In line with The Redeemed Christian Church of God's vision, we strive to:
                </p>
                <ul className="space-y-4">
                  <VisionItem>Make heaven and take as many people with us</VisionItem>
                  <VisionItem>Have a member of RCCG in every family of all nations</VisionItem>
                  <VisionItem>Plant churches within five minutes walking distance in developing countries</VisionItem>
                  <VisionItem>Pursue these objectives until every Nation is reached for Jesus Christ</VisionItem>
                </ul>
                <div className="pt-6 text-center">
                  <button 
                    onClick={() => document.getElementById('highlights').scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium text-primary-900 bg-primary-100 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    Learn More About Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    <div className="relative">
      <div className="text-primary-300 text-2xl mb-4">{icon}</div>
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="text-primary-100/70">{description}</p>
    </div>
  </div>
);

const VisionItem = ({ children }) => (
  <li className="flex items-start space-x-3">
    <FaHeart className="flex-shrink-0 w-5 h-5 text-primary-400 mt-1" />
    <span className="flex-1">{children}</span>
  </li>
);

export default Hero;

