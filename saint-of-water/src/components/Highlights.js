import React, { useState } from 'react';
import { 
  FaTicketAlt, 
  FaChurch, 
  FaBuilding, 
  FaAddressCard, 
  FaUsers, 
  FaHome, 
  FaCalendarAlt, 
  FaPrayingHands, 
  FaChevronDown, 
  FaChevronUp, 
  FaArrowRight,
  FaTimes,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaDirections
} from 'react-icons/fa';

const items = [
  {
    icon: <FaChurch />,
    color: 'from-blue-500 to-indigo-600',
    title: 'Sunday Service',
    description:
      'Our Sunday Service begins 8:15 AM every Sunday with the Sunday School',
    category: 'services'
  },
  {
    icon: <FaAddressCard />,
    color: 'from-emerald-500 to-teal-600',
    title: 'Church Contact Lines',
    description: 'Phone: 08081703500 and Email: rccgsow@gmail.com or info@rccgsow.org. If you are going through difficult or challenging times or you want to celebrate and dedicate your house, office or vehicle, etc. Use the above contact details to inform the church and someone will be delegated to attend to you.',
    category: 'contact'
  },
  {
    icon: <FaHome />,
    color: 'from-amber-500 to-orange-600',
    title: 'House Fellowship Centres',
    details: [
      {
        name: 'House of Victory',
        address: '11 Mathew Street, Pero Bus Stop Agege',
        time: '5 - 6pm'
      },
      {
        name: 'House of Praise',
        address: 'No 7 Freedom Paris, Oke-Apa Magboro Ogun State',
        time: '5 - 6pm'
      },
      {
        name: 'House of Prayer',
        address: '30 Ogundana street, off Allen Avenue, Ikeja, Lagos',
        time: '5:30 - 6:30pm'
      },
      {
        name: 'House Of Grace',
        address: '17 Oremeta Street, Oregun',
        time: '6 - 7pm'
      }
    ],
    category: 'fellowship'
  },
  {
    icon: <FaCalendarAlt />,
    color: 'from-rose-500 to-pink-600',
    title: 'Our Weekly Activities',
    details: [
      {
        day: 'Sunday',
        activities: [
          'New Workers Training 07:00 - 08:15am',
          'Workers Fresh Annointing 07:30 - 8:15am',
          'Sunday Service 8:15am'
        ]
      },
      {
        day: 'Tuesday',
        activities: [
          'Digging Deep 6 - 7pm'
        ]
      },
      {
        day: 'Wednesday',
        activities: [
          'Departmental Meetings as Scheduled'
        ]
      },
      {
        day: 'Thursday',
        activities: [
          'Faith Clinic 6 - 7pm'
        ]
      },
      {
        day: 'Friday',
        activities: [
          'Departmental Meetings',
          'Friday Vigil (6 - 7pm)'
        ]
      },
      {
        day: 'Saturday',
        activities: [
          'Evangelism and Visitations 4 - 6pm',
          'Shining Youth Fellowship Meeting (Every 3rd Saturday) 2 - 4pm'
        ]
      }
    ],
    category: 'schedule'
  },
  {
    icon: <FaUsers />,
    color: 'from-purple-500 to-violet-600',
    title: 'Counseling',
    description: "Pastors are available for Counseling on Tuesday's and Thursday's from 5 - 6pm. Come talk to someone who will advise and pray with you over the issues you are going through",
    category: 'support'
  },
  {
    icon: <FaPrayingHands />,
    color: 'from-sky-500 to-blue-600',
    title: 'Fasting and Prayer',
    description: "Every Thursday's - Ministers fasting and prayers. All workers are also expected to fast and pray. Prayer point - Father, thank you for making us an ever increasing family. Please send more laborers into your vineyard in the Scent of Water in Jesus name. Amen",
    category: 'prayer'
  },
];

const categories = [
  { id: 'all', label: 'All Activities' },
  { id: 'services', label: 'Services' },
  { id: 'schedule', label: 'Weekly Schedule' },
  { id: 'fellowship', label: 'House Fellowship' },
  { id: 'support', label: 'Pastoral Support' },
  { id: 'prayer', label: 'Prayer & Fasting' },
  { id: 'contact', label: 'Contact' },
];

const ExpandableCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/70 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Card Header with Icon */}
      <div className={`p-6 flex items-center gap-4 bg-gradient-to-r ${item.color}`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-lg">
          {React.cloneElement(item.icon, { className: "w-6 h-6" })}
        </div>
        <h3 className="text-xl font-bold text-white">
          {item.title}
        </h3>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        {item.description && (
          <p className="text-gray-300 mb-4 leading-relaxed">
            {item.description}
          </p>
        )}
        
        {item.details && (
          <div className="space-y-2">
            <div 
              className="flex justify-between items-center cursor-pointer mb-2 text-white"
              onClick={toggleExpand}
            >
              <span className="font-medium">View details</span>
              {expanded ? (
                <FaChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
            
            {expanded && (
              <div className="mt-3 space-y-3 animate-fade-in">
                {item.details.map((detail, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                  >
                    {detail.name && (
                      <div className="font-medium text-white mb-1">{detail.name}</div>
                    )}
                    {detail.address && (
                      <div className="text-sm text-gray-400">{detail.address}</div>
                    )}
                    {detail.time && (
                      <div className="text-sm text-gray-400 mt-1">Time: {detail.time}</div>
                    )}
                    
                    {detail.day && (
                      <div className="font-medium text-white">{detail.day}:</div>
                    )}
                    {detail.activities && (
                      <ul className="mt-1 space-y-1">
                        {detail.activities.map((activity, actIdx) => (
                          <li key={actIdx} className="text-sm text-gray-400 flex items-start">
                            <FaArrowRight className="w-3 h-3 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Highlights() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      id="highlights"
      className="relative py-20 sm:py-28 text-white"
    >
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061018] via-[#071a2e] to-[#06090f]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-300 backdrop-blur-sm mb-4">
            Parish Activities
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 text-transparent bg-clip-text">
            What's Happening at Scent of Water Parish
          </h2>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
            Join us in worship, fellowship, and spiritual growth through our various activities designed to bring you closer to God and strengthen our community.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/80 hover:text-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ExpandableCard key={index} item={item} />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block p-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="bg-gray-900 px-8 py-5 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Join Our Community Today</h3>
              <p className="text-gray-400 mb-4">Come worship with us and be part of our growing family in Christ.</p>
              <button 
                onClick={openModal}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center mx-auto"
              >
                <FaMapMarkerAlt className="mr-2" />
                Find Us This Sunday
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 animate-scale-up">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                Visit RCCG Scent of Water Parish
              </h3>
              <p className="text-blue-100/70 mb-6">
                We invite you to join us for worship and fellowship. Below is our location and service details.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Map */}
                <div className="md:col-span-2">
                  <div className="bg-gray-700/50 p-1 rounded-xl overflow-hidden h-[300px] sm:h-[400px]">
                    <iframe
                      width="100%"
                      height="100%"
                      className="border-0 rounded-lg"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=3.352914%2C6.600150%2C3.358914%2C6.606150&layer=mapnik&marker=6.603150%2C3.355914"
                      allowFullScreen
                      title="RCCG SOW Parish Location"
                    ></iframe>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 bg-blue-500/20 p-2 rounded-lg">
                        <FaMapMarkerAlt className="text-blue-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Address</h4>
                        <p className="text-gray-300 text-sm">
                          30 Ogundana street, off Allen Avenue, Ikeja, Lagos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 bg-indigo-500/20 p-2 rounded-lg">
                        <FaChurch className="text-indigo-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Service Times</h4>
                        <p className="text-gray-300 text-sm">
                          Sunday Service: 8:15 AM<br />
                          Workers' Meeting: 7:30 AM<br />
                          New Workers Training: 7:00 AM
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 bg-rose-500/20 p-2 rounded-lg">
                        <FaPhone className="text-rose-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Phone</h4>
                        <p className="text-gray-300 text-sm">
                          08081703500
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-500/20 p-2 rounded-lg">
                        <FaEnvelope className="text-emerald-400 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">Email</h4>
                        <p className="text-gray-300 text-sm">
                          rccgsow@gmail.com<br />
                          info@rccgsow.org
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=30+Ogundana+street+off+Allen+Avenue+Ikeja+Lagos" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full p-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                    >
                      <FaDirections className="mr-2" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
