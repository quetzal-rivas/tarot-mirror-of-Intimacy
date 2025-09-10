'use client';

import { useState, useEffect } from 'react';

const Starfield = () => {
  const [stars, setStars] = useState<
    {
      left: string;
      top: string;
      animationDuration: string;
      animationDelay: string;
    }[]
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 2000}px`,
        animationDuration: `${Math.random() * 20 + 30}s`,
        animationDelay: `${Math.random() * 10}s`,
      }));
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
