import React, { useContext } from 'react';

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

export default function LogoCollection() {
  // We'll use the system's dark mode preference as a fallback
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const logos = isDarkMode ? whiteLogos : darkLogos;

  return (
    <div id="logoCollection" className="py-8">
      <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
        Trusted by the best companies
      </p>
      <div className="mt-2 flex flex-wrap justify-center items-center opacity-60">
        {logos.map((logo, index) => (
          <div key={index} className="p-4">
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              className="w-[100px] h-[80px] mx-8 opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}