import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArticleIcon from "@mui/icons-material/Article";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LaptopIcon from "@mui/icons-material/Laptop";
import GavelIcon from "@mui/icons-material/Gavel";

const coreServices = [
  {
    icon: <LocalOfferIcon className="w-8 h-8" />,
    title: "On-Site Processing",
    description:
      "Same-day Maryland license plates, registration renewals, and title transfers — handled in one visit.",
  },
  {
    icon: <ArticleIcon className="w-8 h-8" />,
    title: "Specialty Paperwork",
    description:
      "30-day temporary tags, duplicate titles, and out-of-state vehicle registrations handled with care.",
  },
  {
    icon: <SupportAgentIcon className="w-8 h-8" />,
    title: "Consultation",
    description:
      "Expert assistance with MVA flags, jurisdictional citations, and complex registration issues.",
  },
  {
    icon: <LaptopIcon className="w-8 h-8" />,
    title: "Digital Tools",
    description:
      "Online MVA fee estimators and a 50-state requirement finder to simplify your planning.",
  },
];

const additionalServices = [
  {
    icon: <GavelIcon className="w-8 h-8" />,
    title: "Notary",
    description:
      "In-person public notary services available on-site. No legal advice provided.",
  },
];

const iconColors = ["text-gold-base", "text-blue-glow", "text-red-base"];

type Service = { icon: React.ReactNode; title: string; description: string };

const ServiceCard = ({ service, colorIndex }: { service: Service; colorIndex: number }) => (
  <div className="group relative bg-background border border-gold-shadow rounded-sm p-6 flex flex-col gap-4 hover:border-gold-base transition-all duration-300 hover:shadow-lg hover:shadow-gold-shadow/20">
    <div className={`${iconColors[colorIndex % 3]} group-hover:scale-110 transition-transform duration-300`}>
      {service.icon}
    </div>
    <h3 className="text-text-base text-lg font-semibold uppercase tracking-wide">
      {service.title}
    </h3>
    <p className="text-text-base/60 text-sm leading-relaxed">
      {service.description}
    </p>
    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-base rounded-b-sm group-hover:w-full transition-all duration-500" />
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-24 px-6 scroll-mt-36">
      <div className="max-w-6xl mx-auto">
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

        {/* Core Tag & Title Services */}
        <div className="mb-12">
          <h3 className="text-gold-base text-xs font-semibold uppercase tracking-widest mb-6">
            Core Tag &amp; Title Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} colorIndex={index} />
            ))}
          </div>
        </div>

        {/* Additional Administrative Services */}
        <div>
          <h3 className="text-gold-base text-xs font-semibold uppercase tracking-widest mb-6">
            Additional Administrative Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 max-w-sm gap-6">
            {additionalServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} colorIndex={index + 1} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block px-10 py-3 bg-blue-base text-text-base font-semibold uppercase tracking-wider rounded-sm hover:bg-blue-glow transition-colors duration-200"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
