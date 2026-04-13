import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden bg-background"
    >
      {/* ── Hero background image ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/hero-bg.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{
            filter: 'brightness(0.45) contrast(1.15) saturate(0.65) sepia(0.12)',
          }}
        />
        {/* Vignette: edges fade to pure black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        {/* Brand-blue gradient wash along the bottom third */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,64,0.2) 100%)',
          }}
        />
      </div>

      {/* Subtle colored ambient glows (sit above the image) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-base opacity-5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-base opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-base opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">

        {/* Headline */}
        <h1 id="hero-title" className="text-5xl md:text-8xl font-bold text-text-base uppercase tracking-tight">
          <span className="text-gold-base block">Sun</span> <span className="text-red-base">Tag</span> &amp;{" "}
          <span className="text-blue-glow">Title</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-text-base/70 text-lg md:text-xl max-w-2xl leading-relaxed">
          Fast, reliable, and hassle-free vehicle registration, tags, and title
          services in <span className="text-gold-base font-semibold">Columbia, Maryland</span> — all in one place.
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
            className="px-8 py-3 bg-red-base text-text-base font-semibold uppercase tracking-wider rounded-sm hover:bg-red-shadow transition-colors duration-200"
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
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gold-base text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-gold-base drop-shadow-[0_0_6px_#FFC040]">
            <path d="M14 5v18M14 23l-7-7M14 23l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
