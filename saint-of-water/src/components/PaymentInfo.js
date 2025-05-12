import React, { useState } from 'react';
import { 
  FaUniversity, 
  FaHandHoldingHeart, 
  FaCopy, 
  FaCheck, 
  FaChurch, 
  FaPrayingHands, 
  FaGraduationCap, 
  FaHome, 
  FaUsers, 
  FaTable,
  FaChevronDown 
} from 'react-icons/fa';

const paymentInfo = [
  {
    title: 'Project/General Offering',
    accountNumber: '4011102567',
    description: 'For physical development',
    icon: <FaHandHoldingHeart />,
    color: 'from-emerald-500 to-green-600'
  },
  {
    title: 'Ministers Tithe',
    accountNumber: '6060464904',
    description: 'For ordained ministers',
    icon: <FaPrayingHands />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'General Tithe',
    accountNumber: '6060464942',
    description: 'For unordained ministers and congregation',
    icon: <FaChurch />,
    color: 'from-violet-500 to-purple-600'
  },
  {
    title: 'ACCMAD',
    accountNumber: '6060464942',
    description: 'For CADAM, Welfare, Christian Social Responsibility',
    icon: <FaUsers />,
    color: 'from-rose-500 to-pink-600'
  },
  {
    title: 'Sunday School',
    accountNumber: '6060464966',
    description: 'Support our Sunday School program',
    icon: <FaGraduationCap />,
    color: 'from-amber-500 to-orange-600'
  },
  {
    title: 'RCCG (SOW) Building Project',
    accountNumber: '5600507785',
    description: 'For rent and other capital projects',
    icon: <FaHome />,
    color: 'from-sky-500 to-cyan-600'
  },
  {
    title: 'Youth and Young Adults',
    accountNumber: '5700124129',
    description: 'Support our youth ministries',
    icon: <FaUsers />,
    color: 'from-teal-500 to-green-600'
  },
];

const AccordionItem = ({ info, isOpen, onToggle }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700/50">
      <button
        className="w-full py-8 px-6 flex items-center justify-between text-left"
        onClick={onToggle}
      >
        <div className="flex items-center gap-6">
          <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${info.color}`}>
            {React.cloneElement(info.icon, { className: "w-7 h-7 text-white" })}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {info.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {info.description}
            </p>
          </div>
        </div>
        <FaChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200/70 dark:border-gray-700/50">
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <FaUniversity className="text-primary-600 dark:text-primary-400 w-6 h-6" />
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Fidelity Bank
                </div>
                <div className="text-xl font-mono font-semibold text-gray-900 dark:text-white mt-1">
                  {info.accountNumber}
                </div>
              </div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(info.accountNumber);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-800/50 text-primary-600 dark:text-primary-300 rounded-lg transition-colors border border-primary-200 dark:border-primary-700/50"
            >
              {copySuccess ? (
                <>
                  <FaCheck className="w-4 h-4" />
                  <span className="font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="w-4 h-4" />
                  <span className="font-medium">Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PaymentInfo() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      id="payment-info"
      className="relative py-20 sm:py-28"
    >
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5 dark:opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300 backdrop-blur-sm mb-4">
            Support Our Ministry
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 dark:from-white dark:via-primary-200 dark:to-primary-400 text-transparent bg-clip-text">
            Church Payment Information
          </h2>
          <p className="text-lg text-gray-600 dark:text-blue-100/70 max-w-2xl mx-auto">
            All forms of offerings can now be paid directly into the church accounts. Your giving supports our vision to spread God's love throughout our community.
          </p>
        </div>

        {/* Info Cards */}
        <div className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 divide-y divide-gray-200 dark:divide-gray-700/50">
          {paymentInfo.map((info, index) => (
            <AccordionItem
              key={index}
              info={info}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
        
        {/* Additional Information */}
        <div className="max-w-2xl mx-auto mt-10">
          <div className="p-8 rounded-xl bg-primary-50/60 dark:bg-primary-900/30 backdrop-blur-sm border border-primary-100 dark:border-primary-700/30">
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-5 flex items-center">
              <FaTable className="mr-3 w-5 h-5" />
              Important Notes
            </h3>
            <ul className="space-y-4 text-primary-800 dark:text-primary-200">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mt-0.5 mr-4">
                  <span className="text-xs font-bold">1</span>
                </div>
                <p>Please include your name and purpose in the payment description.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mt-0.5 mr-4">
                  <span className="text-xs font-bold">2</span>
                </div>
                <p>For inquiries, contact finance@rccgsow.org</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mt-0.5 mr-4">
                  <span className="text-xs font-bold">3</span>
                </div>
                <p>Bank transfers and mobile banking platforms accepted.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
