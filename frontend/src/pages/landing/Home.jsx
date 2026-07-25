import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Role from "@/components/landing/Role";
import Features from "@/components/landing/Features";
import Testimonial from "@/components/landing/Testimonial";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Role />
      <Features />
      <Testimonial />
      <FAQ />
      <CTA />
    </>
  );
}