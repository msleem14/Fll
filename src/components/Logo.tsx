'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'simple' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  linkTo?: string;
  darkMode?: boolean;
}

const sizeMap = {
  sm: { width: 100, height: 45 },
  md: { width: 140, height: 60 },
  lg: { width: 180, height: 80 },
  xl: { width: 250, height: 110 },
};

export default function Logo({ 
  variant = 'simple', 
  size = 'md', 
  className = '',
  linkTo = '/',
  darkMode = true
}: LogoProps) {
  const dimensions = sizeMap[size];
  
  // Text-based logo (fallback)
  if (variant === 'text') {
    const content = (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className={`font-black ${darkMode ? 'text-white' : 'text-black'} ${
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
        }`}>FLL</span>
        <span className={`font-black text-red-500 ${
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'
        }`}>Express</span>
      </div>
    );
    
    return linkTo ? <Link href={linkTo}>{content}</Link> : content;
  }

  // SVG-based logo
  const logoSrc = variant === 'full' ? '/logo.svg' : '/logo-simple.svg';
  
  const content = (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        filter: darkMode ? 'invert(1)' : 'none'
      }}
    >
      <Image
        src={logoSrc}
        alt="FLL Express Logistics"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );

  return linkTo ? (
    <Link href={linkTo} className="inline-block">
      {content}
    </Link>
  ) : content;
}

