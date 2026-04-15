import React from "react";
import Image from "next/image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArticleIcon from "@mui/icons-material/Article";
import GavelIcon from "@mui/icons-material/Gavel";
import BorderGlow from "../BorderGlow";

const coreServices = [
  {
    id: "on-site-processing",
    icon: <LocalOfferIcon className="w-8 h-8" />,
    title: "On-Site Processing",
    description:
      "Same-day Maryland license plates, registration renewals, and title transfers — handled in one visit.",
    details: [
      "New & replacement Maryland license plates",
      "Vehicle registration renewals",
      "Title transfers between private parties or dealers",
      "Same-day processing — no waiting weeks by mail",
      "Friendly staff to guide you through every step",
    ],
    image: "/assets/on-site-processing-service.jpg",
    imageFilter: undefined,
  },
  {
    id: "specialty-paperwork",
    icon: <ArticleIcon className="w-8 h-8" />,
    title: "Specialty Paperwork",
    description:
      "30-day temporary tags, duplicate titles, and out-of-state vehicle registrations handled with care.",
    details: [
      "30-day temporary paper tags",
      "Duplicate/replacement title applications",
      "Out-of-state vehicle title conversions",
      "Lien releases and lien additions",
      "Name changes on existing titles",
    ],
    image: "/assets/specialty-paperwork-service.jpg",
    imageFilter: undefined,
  },
  {
    id: "notary",
    icon: <GavelIcon className="w-8 h-8" />,
    title: "Notary",
    description:
      "In-person public notary services available on-site. No legal advice provided.",
    details: [
      "Notarization of vehicle title signatures",
      "Bill of sale and odometer disclosure notarization",
      "General document notarization",
      "Walk-ins welcome — no appointment needed",
      "Quick turnaround, usually under 10 minutes",
    ],
    image: "/assets/notary-service.jpg",
    imageFilter: undefined,
  },
];

const iconColors = ["text-gold-base", "text-blue-glow", "text-red-base"];

const cardColorSets = [
  { colors: ['#FFC040', '#DC143C', '#1E90FF'], glowColor: '40 80 64' },
  { colors: ['#1E90FF', '#FFC040', '#DC143C'], glowColor: '210 100 59' },
  { colors: ['#DC143C', '#1E90FF', '#FFC040'], glowColor: '348 83 58' },
];

type Service = { id: string; icon: React.ReactNode; title: string; description: string; details: string[]; image: string; imageFilter?: string };

const ServiceRow = ({ service, colorIndex, reverse }: { service: Service; colorIndex: number; reverse: boolean }) => {
  const { colors, glowColor } = cardColorSets[colorIndex % 3];
  const overlayColor = colors[0];
  return (
    <div id={service.id} className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 items-stretch scroll-mt-36`}>
      {/* Photo */}
      <div className="group/photo relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-72 rounded-md overflow-hidden isolate bg-background/50 border border-white/5">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-fill object-center transition-transform duration-700 ease-out group-hover/photo:scale-[1.06] will-change-transform"
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={service.imageFilter ? { filter: service.imageFilter } : undefined}
        />
        {/* Color gradient overlay at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${overlayColor}55, transparent)` }}
        />
        {/* Shine sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover/photo:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        {/* Subtle icon watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`${iconColors[colorIndex % 3]} opacity-10 group-hover/photo:opacity-25 transition-opacity duration-500`}
            style={{ fontSize: '6rem' }}
          >
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
            <ul className="mt-1 flex flex-col gap-1.5">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-sm text-text-base/50">
                  <span className={`${iconColors[colorIndex % 3]} mt-0.5 shrink-0`}>&#8227;</span>
                  {detail}
                </li>
              ))}
            </ul>
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
