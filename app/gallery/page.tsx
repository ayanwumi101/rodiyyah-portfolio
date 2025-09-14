'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Download, Share2 } from 'lucide-react';
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
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-playfair mb-8"
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
                className="px-6 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300"
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
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] mx-4"
              layoutId={`image-${selectedImage}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected image"
                width={800}
                height={600}
                className="object-contain max-h-[80vh] rounded-lg"
              />
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="sm" variant="secondary" className="p-2">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="p-2">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="p-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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