'use client';

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ['all', 'food', 'product', 'nature', 'architecture'];

const galleryImages = {
  food: [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
    'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
  ],
  product: [
    'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg',
    'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
    'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
    'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg',
    'https://images.pexels.com/photos/3968056/pexels-photo-3968056.jpeg',
    'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
  ],
  nature: [
    'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
    'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
    'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
    'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
  ],
  architecture: [
    'https://images.pexels.com/photos/2181915/pexels-photo-2181915.jpeg',
    'https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg',
    'https://images.pexels.com/photos/2181915/pexels-photo-2181915.jpeg',
    'https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg',
  ],
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || 'food';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const currentImages = activeCategory === 'all' 
    ? Object.values(galleryImages).flat()
    : galleryImages[activeCategory as keyof typeof galleryImages] || [];

  // Split images into three columns
  const leftImages = currentImages.filter((_, index) => index % 3 === 0);
  const centerImages = currentImages.filter((_, index) => index % 3 === 1);
  const rightImages = currentImages.filter((_, index) => index % 3 === 2);

  const openModal = useCallback((image: string) => {
    const index = currentImages.indexOf(image);
    setSelectedImage(image);
    setSelectedImageIndex(index);
  }, [currentImages]);

  const nextImage = useCallback(() => {
    const nextIndex = (selectedImageIndex + 1) % currentImages.length;
    setSelectedImage(currentImages[nextIndex]);
    setSelectedImageIndex(nextIndex);
  }, [selectedImageIndex, currentImages]);

  const prevImage = useCallback(() => {
    const prevIndex = selectedImageIndex === 0 ? currentImages.length - 1 : selectedImageIndex - 1;
    setSelectedImage(currentImages[prevIndex]);
    setSelectedImageIndex(prevIndex);
  }, [selectedImageIndex, currentImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for columns
      gsap.to(leftColumnRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(centerColumnRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(rightColumnRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Animate gallery items on scroll
      gsap.utils.toArray('.gallery-item').forEach((item: any) => {
        gsap.fromTo(item,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Category Tabs */}
      <div className="sticky top-20 z-30 glass-effect border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-playfair mb-8 text-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {activeCategory.toUpperCase()}
          </motion.h1>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className="px-6 py-2 text-base font-medium tracking-wider uppercase transition-all duration-300 btn-hover"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={containerRef} className="container mx-auto px-6 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          layout
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Left Column */}
          <div ref={leftColumnRef} className="space-y-6">
            {leftImages.map((image, index) => (
              <motion.div
                key={`left-${index}`}
                className="gallery-item group cursor-pointer"
                layoutId={`image-${image}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column */}
          <div ref={centerColumnRef} className="space-y-6">
            {centerImages.map((image, index) => (
              <motion.div
                key={`center-${index}`}
                className="gallery-item group cursor-pointer"
                layoutId={`image-${image}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColumnRef} className="space-y-6">
            {rightImages.map((image, index) => (
              <motion.div
                key={`right-${index}`}
                className="gallery-item group cursor-pointer"
                layoutId={`image-${image}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-strong"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Action Buttons - Top Overlay */}
            <div className="absolute top-6 right-6 z-60 flex space-x-3">
              <Button size="sm" className="glass-effect p-3 btn-hover">
                <Download className="w-5 h-5" />
              </Button>
              <Button size="sm" className="glass-effect p-3 btn-hover">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                className="glass-effect p-3 btn-hover"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Buttons */}
            <Button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 glass-effect p-4 btn-hover"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 glass-effect p-4 btn-hover"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] mx-4"
              layoutId={`image-${selectedImage}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected image"
                width={1000}
                height={800}
                className="object-contain max-h-[85vh] rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-60">
              <div className="glass-effect px-4 py-2 rounded-full">
                <span className="text-cyan-400 font-medium">
                  {selectedImageIndex + 1} / {currentImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default function Gallery() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}