'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/dorahacks.jpeg', alt: 'DoraHacks' },
  { src: '/moonbeam network.jpg', alt: 'Moonbeam Network' },
  { src: '/polkadot hi.png', alt: 'Polkadot Hi' },
];

export default function RotatingBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-12 flex items-center justify-center relative">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute transition-all duration-700 ease-in-out ${i === index ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-10 z-0'}`}
          style={{ left: 0, right: 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={120}
            height={48}
            className="object-contain rounded shadow-lg bg-white/10 dark:bg-black/30 px-2 py-1"
          />
        </div>
      ))}
    </div>
  );
} 