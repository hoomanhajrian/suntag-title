import React from "react";
import Image from "next/image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArticleIcon from "@mui/icons-material/Article";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LaptopIcon from "@mui/icons-material/Laptop";
import GavelIcon from "@mui/icons-material/Gavel";
import BorderGlow from "../BorderGlow";

const coreServices = [
  {
    icon: <LocalOfferIcon className="w-8 h-8" />,
    title: "On-Site Processing",
    description:
      "Same-day Maryland license plates, registration renewals, and title transfers — handled in one visit.",
    image: "/services/on-site-processing.jpg",
  },
  {
    icon: <ArticleIcon className="w-8 h-8" />,
    title: "Specialty Paperwork",
    description:
      "30-day temporary tags, duplicate titles, and out-of-state vehicle registrations handled with care.",
    image: "/services/specialty-paperwork.jpg",
  },
  {
    icon: <SupportAgentIcon className="w-8 h-8" />,
    title: "Consultation",
    description:
      "Expert assistance with MVA flags, jurisdictional citations, and complex registration issues.",
    image: "/services/consultation.jpg",
  },
  {
    icon: <LaptopIcon className="w-8 h-8" />,
    title: "Digital Tools",
    description:
      "Online MVA fee estimators and a 50-state requirement finder to simplify your planning.",
    image: "/services/digital-tools.jpg",
  },
];

const additionalServices = [
  {
    icon: <GavelIcon className="w-8 h-8" />,
    title: "Notary",
    description:
      "In-person public notary services available on-site. No legal advice provided.",
    image: "/services/notary.jpg",
  },
];

const iconColors = ["text-gold-base", "text-blue-glow", "text-red-base"];

const cardColorSets = [
  { colors: ['#FFC040', '#DC143C', '#1E90FF'], glowColor: '40 80 64' },
  { colors: ['#1E90FF', '#FFC040', '#DC143C'], glowColor: '210 100 59' },
  { colors: ['#DC143C', '#1E90FF', '#FFC040'], glowColor: '348 83 58' },
];

type Service = { icon: React.ReactNode; title: string; description: string; image: string };

const ServiceRow = ({ service, colorIndex, reverse }: { service: Service; colorIndex: number; reverse: boolean }) => {
  const { colors, glowColor } = cardColorSets[colorIndex % 3];
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 items-stretch`}>
      {/* Photo */}
      <div className="relative w-full lg:w-1/2 min-h-56 rounded-md overflow-hidden bg-background/50 border border-white/5">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover opacity-80"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Fallback tinted overlay with icon when image missing */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/80 to-background/40">
          <span className={`${iconColors[colorIndex % 3]} opacity-20`} style={{ fontSize: '6rem' }}>
            {service.icon}
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="w-full lg:w-1/2">
        <BorderGlow
          className="group h-full"
          backgroundColor="#000000"
          borderRadius={7}
          glowColor={glowColor}
          colors={colors}
          glowRadius={30}
          glowIntensity={1}
          edgeSensitivity={1}
          coneSpread={30}
        >
          <div className="p-8 flex flex-col gap-4 relative justify-center h-full">
            <div className={`${iconColors[colorIndex % 3]} group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-text-base text-xl font-semibold uppercase tracking-wide">
              {service.title}
            </h3>
            <p className="text-text-base/60 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-24 px-6 scroll-mt-36">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-base">
            Our Services
          </h2>
          <p className="text-text-base/60 text-lg max-w-xl mx-auto">
            Everything you need to keep your vehicle legal and on the road —
            handled by local experts.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
        </div>

        {/* Core Tag & Title Services — zig-zag */}
        <div className="mb-4">
          <h3 className="text-gold-base text-xs font-semibold uppercase tracking-widest mb-8">
            Core Tag &amp; Title Services
          </h3>
          <div className="flex flex-col gap-8">
            {coreServices.map((service, index) => (
              <ServiceRow key={service.title} service={service} colorIndex={index} reverse={index % 2 !== 0} />
            ))}
          </div>
        </div>

        {/* Additional Administrative Services — zig-zag */}
        <div className="mt-12">
          <h3 className="text-gold-base text-xs font-semibold uppercase tracking-widest mb-8">
            Additional Administrative Services
          </h3>
          <div className="flex flex-col gap-8">
            {additionalServices.map((service, index) => (
              <ServiceRow key={service.title} service={service} colorIndex={index + 1} reverse={false} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-10 py-3 bg-gold-base text-background font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors duration-200"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
