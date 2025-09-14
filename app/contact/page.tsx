'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    state: '',
    budget: '',
    message: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.contact-hero',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Form animations
      gsap.fromTo('.form-field',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.6
        }
      );

      // Contact info animations
      gsap.fromTo('.contact-info',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      state: '',
      budget: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div className="contact-hero text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
            <span className="text-primary">
              GET IN TOUCH
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Send us a message and we'll respond as soon as possible
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div className="contact-info lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold font-playfair mb-6 text-primary">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ready to bring your vision to life? I'd love to hear about your project 
                and discuss how we can create something amazing together.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">hello@arowona.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+234 xxx xxx xxxx</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Abuja & Ibadan, Nigeria</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="form-field space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-primary">
                    FULL NAME *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>

                <motion.div className="form-field space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-primary">
                    COMPANY *
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="form-field space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-primary">
                    EMAIL *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>

                <motion.div className="form-field space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-primary">
                    PHONE NUMBER *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="form-field space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-primary">
                    STATE *
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="Nigeria"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>

                <motion.div className="form-field space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium text-primary">
                    BUDGET *
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="text"
                    placeholder="State your budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>
              </div>

              <motion.div className="form-field space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-primary">
                  PROJECT DETAILS
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Could you describe what you'd like to do?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary transition-all duration-300 resize-none"
                />
              </motion.div>

              <motion.div className="form-field">
                <Button
                  type="submit"
                  size="lg"
                  className="submit-btn w-full md:w-auto px-12 py-4 text-lg font-medium tracking-wider bg-primary hover:bg-primary/90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SUBMIT
                </Button>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-border">
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
            <div className="flex justify-center space-x-6 mb-8">
              {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              All content Copyright © 2025 Arowona Rodiyyah Onaopemipo
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}