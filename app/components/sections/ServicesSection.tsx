import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArticleIcon from "@mui/icons-material/Article";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import VerifiedIcon from "@mui/icons-material/Verified";

const services = [
  {
    icon: <DirectionsCarIcon className="w-8 h-8" />,
    title: "Vehicle Registration",
    description:
      "Register your vehicle quickly and accurately with our expert team handling all state paperwork on your behalf.",
  },
  {
    icon: <LocalOfferIcon className="w-8 h-8" />,
    title: "Tag Renewal",
    description:
      "Skip the DMV line. Renew your license plate tags in-store and drive away the same day.",
  },
  {
    icon: <SwapHorizIcon className="w-8 h-8" />,
    title: "Title Transfer",
    description:
      "Buying or selling a vehicle? We handle the full title transfer process cleanly and correctly.",
  },
  {
    icon: <ArticleIcon className="w-8 h-8" />,
    title: "New Title (Dealer)",
    description:
      "Freshly off the lot? We process new titles from dealers so your paperwork is sorted from day one.",
  },
  {
    icon: <FindReplaceIcon className="w-8 h-8" />,
    title: "Duplicate / Lost Title",
    description:
      "Lost your title? We'll help you obtain a duplicate through the proper state channels, fast.",
  },
  {
    icon: <VerifiedIcon className="w-8 h-8" />,
    title: "VIN Verification",
    description:
      "Official VIN inspection and verification services — required for out-of-state vehicles and reconstructed titles.",
  },
];

const iconColors = ["text-gold-base", "text-blue-glow", "text-red-base"];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-24 px-6">
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

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-background border border-gold-shadow rounded-sm p-6 flex flex-col gap-4 hover:border-gold-base transition-all duration-300 hover:shadow-lg hover:shadow-gold-shadow/20"
            >
              {/* Icon */}
              <div className={`${iconColors[index % 3]} group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-text-base text-lg font-semibold uppercase tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-base/60 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-base rounded-b-sm group-hover:w-full transition-all duration-500" />
            </div>
          ))}
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
