import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaChurch, FaTimes } from 'react-icons/fa';
import ToggleColorMode from './ToggleColorMode';

function AppAppBar({ mode, toggleColorMode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('#mobile-menu') && !event.target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className={`
          relative flex items-center justify-between
          rounded-2xl px-6 py-3
          ${mode === 'light' 
            ? 'bg-white/80 shadow-lg shadow-gray-200/20' 
            : 'bg-gray-900/80 shadow-lg shadow-black/20'
          }
          backdrop-blur-lg backdrop-saturate-150
          border border-gray-100/20 dark:border-gray-700/20
        `}>
          {/* Brand */}
          <div 
            className="group cursor-pointer select-none" 
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent group-hover:to-primary-300 transition-colors duration-300">
                Scent of Water
              </h1>
              <div className="flex items-center space-x-2">
                <div className="h-0.5 w-8 bg-gradient-to-r from-primary-600 to-transparent"></div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  RCCG Parish
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavButton onClick={() => scrollToSection('highlights')}>Highlights</NavButton>
            <NavButton onClick={() => scrollToSection('payment-info')}>Payment Info</NavButton>
            <NavButton onClick={() => scrollToSection('announcements')}>Announcements</NavButton>
            
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Link
              to="/login"
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors duration-200"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`
              absolute top-full right-4 mt-2 w-72
              bg-white dark:bg-gray-900
              rounded-2xl shadow-xl
              transform transition-all duration-200 ease-in-out
              ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 pointer-events-none'}
              md:hidden
              border border-gray-100 dark:border-gray-800
            `}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Navigation</h2>
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              </div>
              
              <nav className="space-y-1">
                <MobileNavButton onClick={() => scrollToSection('highlights')}>
                  <FaChurch className="w-5 h-5" />
                  <span>Highlights</span>
                </MobileNavButton>
                <MobileNavButton onClick={() => scrollToSection('payment-info')}>
                  <FaChurch className="w-5 h-5" />
                  <span>Payment Info</span>
                </MobileNavButton>
                <MobileNavButton onClick={() => scrollToSection('announcements')}>
                  <FaChurch className="w-5 h-5" />
                  <span>Announcements</span>
                </MobileNavButton>
              </nav>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable button components
function NavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      {children}
    </button>
  );
}

function MobileNavButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      {children}
    </button>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
