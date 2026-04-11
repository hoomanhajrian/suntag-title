// src/app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      
      {/* Logo Container */}
      <div className="mb-10 relative w-64 md:w-80 h-auto">
        <Image
          src="/logo.png"
          alt="Sun Tag And Title Logo"
          width={400}
          height={250}
          priority // Prioritizes loading this image since it's above the fold
          className="object-contain"
        />
      </div>

      {/* Main Text Content */}
      <div className="text-center space-y-4">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary uppercase">
          Sun Tag & Title
        </h1>
        
        {/* Using the vibrant orange for the Coming Soon text */}
        <h2 className="font-heading text-2xl md:text-3xl text-secondary tracking-wider uppercase">
          Coming Soon
        </h2>

        <p className="font-body text-text-base text-lg md:text-xl max-w-lg mx-auto leading-relaxed pt-4">
          We are setting up our digital garage to bring you fast, reliable, and hassle-free vehicle registration, tags, and title services. 
        </p>
      </div>

      {/* Decorative Brand Accents */}
      <div className="mt-12 flex gap-3">
        <div className="h-2 w-10 bg-primary rounded-full opacity-80"></div>
        <div className="h-2 w-10 bg-secondary rounded-full"></div>
        <div className="h-2 w-10 bg-[#FFC600] rounded-full"></div> {/* Sun Yellow Highlight */}
      </div>

    </main>
  );
}