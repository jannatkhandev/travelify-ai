'use client';

import { useState, useEffect } from 'react';

const ScrollAwareWrapper = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={`sticky top-0 z-50 transition-colors duration-300 ${
      scrolled ? 'bg-background shadow-md' : 'bg-transparent'
    }`}>
      {children}
    </div>
  );
};

export default ScrollAwareWrapper;