// src/app/page.tsx
import HeroSection from "@/app/components/sections/HeroSection";
import ServicesSection from "@/app/components/sections/ServicesSection";
import AboutSection from "@/app/components/sections/AboutSection";
import ContactSection from "@/app/components/sections/ContactSection";
import PaymentSection from "@/app/components/sections/PaymentSection";

export default function HomePage() {
  return (
    <main className="bg-background">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <PaymentSection />
    </main>
  );
}