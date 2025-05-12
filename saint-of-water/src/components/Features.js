import React, { useState } from 'react';
import { FaChevronRight, FaLaptop, FaMobileAlt, FaDesktop } from 'react-icons/fa';

const items = [
  {
    icon: <FaLaptop className="w-6 h-6" />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight: 'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    icon: <FaMobileAlt className="w-6 h-6" />,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    imageLight: 'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
  {
    icon: <FaDesktop className="w-6 h-6" />,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <div id="features" className="container mx-auto px-4 py-8 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Product features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-8">
              Here you can provide a brief overview of the key features of the
              product. For example, you could list the number of features, the types
              of features, add-ons, or the benefits of the features.
            </p>
          </div>

          {/* Mobile Chips */}
          <div className="flex flex-wrap gap-2 sm:hidden">
            {items.map(({ title }, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${selectedItemIndex === index 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Mobile Preview Card */}
          <div className="mt-4 sm:hidden">
            <div className="border rounded-lg overflow-hidden dark:border-gray-700">
              <div 
                className="h-[280px] bg-cover bg-center"
                style={{
                  backgroundImage: selectedFeature.imageLight
                }}
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {selectedFeature.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {selectedFeature.description}
                </p>
                <a href="#" className="inline-flex items-center mt-2 text-primary-600 font-medium hover:text-primary-700">
                  <FaChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Feature List */}
          <div className="hidden sm:flex flex-col gap-4 w-full">
            {items.map(({ icon, title, description }, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className={`w-full p-6 text-left border rounded-lg transition-all
                  ${selectedItemIndex === index
                    ? 'bg-gray-50 dark:bg-gray-800 border-primary-300 dark:border-primary-700'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className={`
                    ${selectedItemIndex === index
                      ? 'text-primary-600'
                      : 'text-gray-400 dark:text-gray-600'
                    }`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      {description}
                    </p>
                    <a 
                      href="#"
                      className="inline-flex items-center mt-2 text-primary-600 font-medium hover:text-primary-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Learn more</span>
                      <FaChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Preview */}
        <div className="hidden sm:block">
          <div className="border rounded-lg overflow-hidden dark:border-gray-700 h-full">
            <div 
              className="m-auto w-[420px] h-[500px] bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: selectedFeature.imageLight
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}