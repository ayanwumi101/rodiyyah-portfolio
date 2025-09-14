'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3.5 }
      );

      gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 4 }
      );

      // Scroll-triggered animations
      gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
        gsap.fromTo(section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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

      // Parallax effects
      gsap.utils.toArray('.parallax-element').forEach((element: any) => {
        gsap.to(element, {
          y: '-20%',
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <Image
            src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg"
            alt="Hero background"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-background font-playfair">A</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <span className="text-xl font-bold text-background font-playfair">A</span>
              </div>
            </div>
          </motion.div>

          <h1 className="hero-title text-6xl md:text-8xl font-bold font-playfair mb-6 text-balance">
            Capture
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              the Crave
            </span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-12 font-light">
            Elevating brands through stunning food, product & nature photography
          </p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/portfolio">
                Explore Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="fade-in-section min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div className="parallax-element">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                alt="Photographer at work"
                width={600}
                height={800}
                className="rounded-2xl object-cover shadow-2xl"
              />
            </motion.div>

            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold font-playfair">
                Food, Product
                <br />
                and Nature
                <br />
                <span className="text-primary">Photographer</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Arowona is a photographer specializing in food and product imagery, working with 
                clients in Abuja and Ibadan to create stunning visuals that elevate their brands. 
                I believe that every image should tell a story and capture the essence of the subject.
              </p>

              <Button asChild size="lg" className="px-8 py-4">
                <Link href="/portfolio">
                  EXPLORE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in-section min-h-screen flex items-center py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold font-playfair">
                Ready to
                <br />
                bring your
                <br />
                food story
                <br />
                to life?
              </h2>
              
              <Button asChild size="lg" className="px-8 py-4">
                <Link href="/contact">
                  GET IN TOUCH
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <motion.div className="parallax-element">
              <Image
                src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg"
                alt="Delicious burger"
                width={600}
                height={600}
                className="rounded-2xl object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="fade-in-section min-h-screen py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-primary to-primary/80 p-16 rounded-2xl text-center text-background flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-4xl font-bold font-playfair mb-4">Portfolio</h3>
              <p className="text-lg mb-8 opacity-90">View my work</p>
              <Button asChild variant="secondary" size="lg">
                <Link href="/portfolio">Explore</Link>
              </Button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-secondary to-secondary/80 p-16 rounded-2xl text-center text-background flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-4xl font-bold font-playfair mb-4">Clients</h3>
              <p className="text-lg mb-8 opacity-90">Recognized By</p>
              <Button asChild variant="secondary" size="lg">
                <Link href="/clients">View Clients</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}