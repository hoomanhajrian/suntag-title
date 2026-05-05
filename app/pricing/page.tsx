import Link from 'next/link';

const services = [
  {
    name: 'Title Transfer',
    ourFee: 85,
    description: 'Transfer of vehicle ownership between private parties or from a dealer.',
    color: 'text-gold-base',
    border: 'hover:border-gold-base',
    note: 'Both buyer and seller must be present or provide notarized signatures.',
  },
  {
    name: 'Vehicle Registration',
    ourFee: 85,
    description: 'New Maryland vehicle registration, including out-of-state title conversions.',
    color: 'text-blue-glow',
    border: 'hover:border-blue-glow',
    note: 'Valid Maryland auto insurance required before registration can be issued.',
  },
  {
    name: '14 Day Temp Tag',
    ourFee: 65,
    description: 'Temporary 14-day Maryland tag issued while your title or registration is being processed.',
    color: 'text-red-base',
    border: 'hover:border-red-base',
    note: 'Valid proof of insurance and ownership documentation required at time of issuance.',
  },
  {
    name: 'Registration Renewal',
    ourFee: 60,
    description: 'Annual or 2-year Maryland license plate and registration renewal.',
    color: 'text-red-base',
    border: 'hover:border-red-base',
    note: 'Bring your renewal notice or plate number. Same-day sticker issued.',
  },
  {
    name: 'Duplicate Title',
    ourFee: 60,
    description: 'Replacement title application for lost, damaged, or e-title conversions.',
    color: 'text-gold-base',
    border: 'hover:border-gold-base',
    note: 'Active lien holders must authorize the duplicate before processing.',
  },
  {
    name: 'Tag Return',
    ourFee: 20,
    description: 'Return of Maryland license plates to the MVA after selling or disposing of a vehicle.',
    color: 'text-blue-glow',
    border: 'hover:border-blue-glow',
    note: 'Required to stop registration fees from continuing to accrue.',
    flatFee: true,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background px-6 pt-48 pb-32">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-base">
            Service Fees
          </h1>
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
          <p className="text-text-base/90 text-sm max-w-2xl mx-auto pt-2 leading-relaxed">
            The fees listed below are <strong className="text-white">our service fees only</strong> — they do not include Maryland MVA
            state fees, which vary by vehicle type, weight, and county. Total costs are always
            disclosed in full before we begin processing your transaction.
          </p>
        </div>

        {/* Non-government disclosure */}
        <div className="mb-10 p-4 rounded-sm border border-gold-base/30 bg-gold-base/5 text-xs text-text-base/90 leading-relaxed text-center">
          <strong className="text-gold-base">Non-Government Provider:</strong> Sun Tag &amp; Title is a privately owned, Maryland MVA-licensed Title Service Agent (License No.{' '}
          <span className="text-gold-base font-semibold">TS10010139</span>). We are not the Maryland MVA or any government agency.
          For free direct government services, visit{' '}
          <a href="https://mva.maryland.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-base transition-colors">
            mva.maryland.gov
          </a>.
        </div>

        {/* Pricing cards */}
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-sm border border-white/5 bg-white/[0.02] ${service.border} transition-colors duration-300`}
            >
              <div className="flex-1 space-y-1">
                <h2 className={`text-lg font-bold ${service.color}`}>{service.name}</h2>
                <p className="text-text-base/90 text-sm leading-relaxed">{service.description}</p>
                <p className="text-text-base/70 text-xs italic">{service.note}</p>
              </div>
              <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                {service.flatFee ? (
                  <div className="text-center sm:text-right">
                    <div className={`text-3xl font-bold ${service.color}`}>${service.ourFee}</div>
                    <div className="text-white text-xs font-semibold mt-0.5 uppercase tracking-wide">Flat Fee</div>
                  </div>
                ) : (
                  <>
                    {/* Our service fee */}
                    <div className="text-center sm:text-right">
                      <div className={`text-3xl font-bold ${service.color}`}>${service.ourFee}</div>
                      <div className="text-white text-xs font-semibold mt-0.5 uppercase tracking-wide">Our Service Fee</div>
                    </div>
                    {/* Divider */}
                    <div className="hidden sm:flex items-center gap-2 my-1 w-full">
                      <div className="flex-1 h-px bg-white/40" />
                      <span className="text-white text-xs font-bold">+</span>
                      <div className="flex-1 h-px bg-white/40" />
                    </div>
                    <span className="sm:hidden text-white text-lg font-bold">+</span>
                    {/* MVA fee */}
                    <div className="text-center sm:text-right">
                      <div className="text-lg font-semibold text-white">Varies</div>
                      <div className="text-white/80 text-xs uppercase tracking-wide">MD MVA State Fee</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notary note */}
        <div className="mt-6 p-4 rounded-sm border border-white/5 bg-white/[0.02] text-sm text-text-base/90 text-center">
          Notary services are also available on-site.{' '}
          <Link href="/#contact" className="text-gold-base underline hover:text-gold-light transition-colors">
            Contact us
          </Link>{' '}
          for notary fee details.
        </div>

        {/* Footer note */}
        <div className="mt-12 space-y-3 text-xs text-text-base/80 text-center leading-relaxed">
          <p>
            Maryland MVA fees are set by the state and are separate from our service fee. They vary based on
            vehicle weight, type, county, and transaction specifics. We will quote the full total — including
            all state fees — before processing begins.
          </p>
          <p>
            Fees are due at time of service. We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay.{' '}
            <strong className="text-white">In-person only — no online or phone payments.</strong>
          </p>
          <p>
            Prices are subject to change. Visit us at{' '}
            <a
              href="https://maps.google.com/maps?q=10400+Shaker+Dr+Suite+8,+Columbia,+MD+21046"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gold-base transition-colors"
            >
              10400 Shaker Dr Suite 8, Columbia, MD 21046
            </a>{' '}
            or call{' '}
            <a href="tel:+14104178272" className="underline hover:text-gold-base transition-colors">
              (410) 417-8272
            </a>.
          </p>
        </div>

      </div>
    </main>
  );
}
