'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const clients = [
  { name: 'Luxury Restaurant', logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
  { name: 'Artisan Bakery', logo: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg' },
  { name: 'Gourmet Foods', logo: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg' },
  { name: 'Coffee Roasters', logo: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg' },
  { name: 'Farm Fresh', logo: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg' },
  { name: 'Premium Spirits', logo: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg' },
];

const testimonials = [
  {
    quote: "Arowona's photography elevated our brand to new heights. The attention to detail and artistic vision is unmatched.",
    author: "Sarah Johnson",
    company: "Luxury Restaurant",
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
  },
  {
    quote: "Working with Arowona was a transformative experience. The images captured the essence of our products perfectly.",
    author: "Michael Chen",
    company: "Artisan Bakery", 
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg'
  },
  {
    quote: "Professional, creative, and results-driven. Arowona understood our vision and delivered beyond expectations.",
    author: "Emily Rodriguez",
    company: "Gourmet Foods",
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg'
  }
];

export default function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.clients-hero',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );

      // Stagger animation for client logos
      gsap.fromTo('.client-logo',
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.clients-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Testimonial animations
      gsap.utils.toArray('.testimonial-card').forEach((card: any, index) => {
        gsap.fromTo(card,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax effect for background elements
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
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
    <div ref={containerRef} className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="clients-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold font-playfair mb-8">
              <span className="text-primary">
                Recognized
              </span>
              <br />
              By Excellence
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by leading brands across Nigeria to deliver exceptional visual storytelling 
              that elevates their presence and drives results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-20 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
              Trusted Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              Some of the amazing brands I've had the pleasure to work with
            </p>
          </div>

          <div className="clients-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                className="client-logo group"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {client.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Happy Clients' },
              { number: '200+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-bold font-playfair text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">
              What Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from the brands that trust me with their visual identity
            </p>
          </div>

          <div className="space-y-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="text-primary text-6xl font-serif">"</div>
                  <blockquote className="text-xl md:text-2xl font-light italic text-muted-foreground leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                  <div className="space-y-2">
                    <p className="font-bold text-lg">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>

                <div className={`parallax-bg ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.company}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <img 
                src="/fd0ac90efa8c4848d9a117ede8d73eb572412d06.png" 
                alt="Arowona Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            All content Copyright © 2025 Arowona Rodiyyah Onaopemipo
          </p>
        </div>
      </footer>
    </div>
  );
}