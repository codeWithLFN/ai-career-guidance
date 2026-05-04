'use client'

import { Button } from "@/components/app-components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
// import heroImage from "./assets/hero-illustration.jpg";
import Image from 'next/image'

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-[0.03]" />

      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Guidance
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Discover Your
              <span className="text-gradient block">Perfect Career Path</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Let AI analyze your academic performance, skills, interests, and personality to recommend
              career paths aligned with job market demand and salary expectations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={onGetStarted} className="text-base px-8 py-6 bg-primary">
                Start Your Assessment
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* <img
              src={heroImage}
              alt="Career guidance illustration showing interconnected career paths"
              className="w-full rounded-2xl card-shadow"
            /> */}
            <Image
              src="/assets/hero-illustration.jpg"
              width={500}
              height={500}
              alt="Career guidance illustration showing interconnected career paths"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
