import Image from "next/image";

const values = [
  "Licensed and state-authorized tag agency",
  "Serving our community for over 10 years",
  "Same-day processing on most services",
  "Friendly, knowledgeable staff",
  "Transparent pricing — no hidden fees",
  "Walk-ins welcome, no appointment needed",
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "15K+", label: "Vehicles Processed" },
  { value: "5★", label: "Average Rating" },
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-base">
            About Us
          </h2>
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-text-base">
              Your Trusted Local{" "}
              <span className="text-gold-base">Tag Agency</span>
            </h3>
            <p className="text-text-base/70 leading-relaxed">
              Sun Tag &amp; Title is a licensed Florida tag agency dedicated to
              making vehicle services fast and stress-free. We take the hassle
              out of DMV visits by offering the same state-authorized services
              right in your neighborhood.
            </p>
            <p className="text-text-base/70 leading-relaxed">
              Whether you are registering a brand-new car, transferring a title
              after a private sale, or renewing your tags before they expire,
              our experienced team walks you through every step with accuracy
              and care.
            </p>

            {/* Value points */}
            <ul className="space-y-3 pt-2">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-text-base/80 text-sm">
                  <svg viewBox="0 0 24 24" className="text-gold-base shrink-0 mt-0.5 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Logo + Stats */}
          <div className="flex flex-col items-center gap-10">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gold-base opacity-5 blur-2xl" />
              <Image
                src="/app-logo.png"
                alt="Sun Tag & Title"
                width={220}
                height={220}
                className="object-contain relative z-10 drop-shadow-xl"
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 w-full">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center border border-gold-shadow rounded-sm py-5 px-3 hover:border-gold-base transition-colors duration-300"
                >
                  <span className="text-3xl font-bold text-gold-base">
                    {stat.value}
                  </span>
                  <span className="text-text-base/50 text-xs uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
