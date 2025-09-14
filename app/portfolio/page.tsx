'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    title: 'FOOD\nPHOTOGRAPHY',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    href: '/gallery?category=food',
  },
  {
    title: 'PRODUCT\nPHOTOGRAPHY',
    image: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg',
    href: '/gallery?category=product',
  },
  {
    title: 'NATURE\nPHOTOGRAPHY',
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    href: '/gallery?category=nature',
  },
  {
    title: 'ARCHITECTURE\nPHOTOGRAPHY',
    image: 'https://images.pexels.com/photos/2181915/pexels-photo-2181915.jpeg',
    href: '/gallery?category=architecture',
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.portfolio-section').forEach((section: any, index) => {
        gsap.fromTo(section,
          { 
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Hover animations for overlay text
      gsap.utils.toArray('.category-overlay').forEach((overlay: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(overlay, { 
          backgroundColor: 'rgba(255, 51, 102, 0.9)',
          duration: 0.3,
          ease: 'power2.out'
        });

        overlay.addEventListener('mouseenter', () => tl.play());
        overlay.addEventListener('mouseleave', () => tl.reverse());
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-20">
      {categories.map((category, index) => (
        <Link key={category.title} href={category.href}>
          <motion.section 
            className={`portfolio-section h-screen flex ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Image Half */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority={index === 0}
              />
            </div>

            {/* Text Half */}
            <div className="category-overlay w-1/2 h-full bg-primary/90 flex items-center justify-center relative group transition-all duration-300 hover:bg-primary">
              <div className="text-center text-primary-foreground">
                <h2 className="text-4xl md:text-6xl font-bold font-playfair mb-8 whitespace-pre-line">
                  {category.title}
                </h2>
                
                <motion.div
                  className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-2 h-16 bg-white opacity-80"></div>
              <div className="absolute bottom-8 left-8 w-16 h-2 bg-white opacity-80"></div>
            </div>
          </motion.section>
        </Link>
      ))}

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <img 
                src="/a-logo.png" 
                alt="Arowona Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <p className="text-cyan-400 text-base">
            All content Copyright © 2025 Arowona Rodiyyah Onaopemipo
          </p>
        </div>
      </footer>
    </div>
  );
}