import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden bg-background"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-base opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-base opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-text-base uppercase tracking-tight">
          Sun Tag &amp;{" "}
          <span className="text-gold-base">Title</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-text-base/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Fast, reliable, and hassle-free vehicle registration, tags, and title
          services — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href="#services"
            className="px-8 py-3 bg-gold-base text-background font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors duration-200"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gold-base text-gold-base font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-base hover:text-background transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* Decorative divider */}
        <div className="mt-10 flex gap-3">
          <div className="h-1 w-12 bg-blue-base rounded-full" />
          <div className="h-1 w-12 bg-red-base rounded-full" />
          <div className="h-1 w-12 bg-gold-base rounded-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-base/40 text-xs uppercase tracking-widest animate-bounce">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
          <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
