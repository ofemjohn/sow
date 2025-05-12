import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookSquare, 
  FaYoutube, 
  FaInstagramSquare, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaChevronRight,
  FaChurch
} from "react-icons/fa";

function Copyright() {
  return (
    <div className="flex items-center justify-center text-sm text-gray-400 mt-8">
      <span>© {new Date().getFullYear()} RCCG Scent of Water Parish.</span>
      <span className="mx-1">All rights reserved.</span>
    </div>
  );
}

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const offset = 128;
      const targetScroll = sectionElement.offsetTop - offset;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      // If section doesn't exist on this page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Highlights', path: '#', action: () => scrollToSection('highlights') },
    { name: 'Gallery', path: '#', action: () => scrollToSection('gallery') },
    { name: 'Payment Info', path: '#', action: () => scrollToSection('payment-info') },
    { name: 'Announcements', path: '#', action: () => scrollToSection('announcements') },
    { name: 'Contact Us', path: '#', action: () => scrollToSection('contact-us') },
  ];

  const serviceSchedule = [
    { day: 'Sunday', name: 'Sunday Service', time: '9:00 AM - 11:30 AM' },
    { day: 'Tuesday', name: 'Bible Study', time: '6:00 PM - 7:00 PM' },
    { day: 'Thursday', name: 'Prayer Meeting', time: '6:00 PM - 7:00 PM' },
    { day: 'Last Friday', name: 'Holy Ghost Night', time: '10:00 PM - 1:00 AM' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300 via-primary-600 to-indigo-600"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center mr-3 shadow-md">
                <FaChurch className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 dark:from-primary-400 dark:to-indigo-400 text-transparent bg-clip-text">RCCG SOW Parish</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Redeemed Christian Church of God - Scent of Water Parish is a vibrant community committed to spreading the Gospel and serving our community.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/scentof.waterparishikeja?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookSquare className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@scentofwater5530?si=OkCtAIjgHd4EB0ET"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rccg_sow_parish/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagramSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-600 dark:bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    <FaChevronRight className="w-3 h-3 mr-2 text-primary-500 dark:text-primary-400" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 relative">
              <span className="relative z-10">Service Schedule</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-600 dark:bg-primary-500"></span>
            </h3>
            <ul className="space-y-4">
              {serviceSchedule.map((service, index) => (
                <li key={index} className="flex items-start">
                  <FaCalendarAlt className="w-4 h-4 text-primary-500 dark:text-primary-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">{service.day}: {service.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{service.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div id="contact-us">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 relative">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary-600 dark:bg-primary-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-500 dark:text-primary-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  30 Ogundana street, off Allen Avenue, Ikeja, Lagos
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-3 flex-shrink-0" />
                <a href="tel:+2348000000000" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +234 800 000 0000
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-3 flex-shrink-0" />
                <a href="mailto:rccgsow@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  rccgsow@gmail.com
                </a>
              </li>
            </ul>
            
            <a
              href="mailto:rccgsow@gmail.com"
              className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              <FaEnvelope className="w-4 h-4 mr-2" />
              Send us a Message
            </a>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden w-full h-[300px] shadow-lg mb-10">
          <iframe
            width="100%"
            height="100%"
            className="border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.329260461504!2d3.3547472740514383!3d6.603150495212544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93a899b7c9d9%3A0xd0cb8d8eef676dd9!2s30%20Ogundana%20St%2C%20Allen%2C%20Ikeja%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1717522954267!5m2!1sen!2sus"
            allowFullScreen
            title="RCCG SOW Parish Location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <Link to="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Accessibility
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors bg-transparent border-none cursor-pointer p-0 focus:outline-none"
            >
              Contact
            </button>
          </div>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

