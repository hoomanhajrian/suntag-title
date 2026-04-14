import Link from "next/link";

export const metadata = {
  title: "Blog & Guides | Sun Tag & Title – Columbia, MD",
  description:
    "Helpful guides and tips about Maryland vehicle tag, title, and registration services from Sun Tag & Title in Columbia, MD.",
  alternates: {
    canonical: 'https://suntagandtitle.com/blog',
  },
};

type Post = {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

const posts: Post[] = [
  {
    slug: "maryland-title-transfer",
    category: "Title Services",
    categoryColor: "text-gold-base border-gold-base",
    date: "March 10, 2026",
    title: "How to Transfer a Vehicle Title in Maryland",
    excerpt:
      "Buying or selling a car in Maryland? Here is everything you need to know about completing a title transfer quickly and correctly.",
    body: [
      "A Maryland title transfer is required any time a vehicle changes ownership — whether through a private sale, gift, or inheritance. Both the buyer and seller must sign the back of the Certificate of Title.",
      "You will need: the signed Maryland title, a completed MVA title application form, proof of Maryland auto insurance, valid photo ID, and payment for MVA fees plus our service fee. We handle the paperwork and submit directly to the state — usually same day.",
      "Tip: Make sure the odometer reading and purchase price are filled in correctly before you arrive. Mistakes can delay processing.",
    ],
  },
  {
    slug: "30-day-temp-tag",
    category: "Tags & Plates",
    categoryColor: "text-blue-glow border-blue-glow",
    date: "March 18, 2026",
    title: "When Do You Need a 30-Day Temporary Tag?",
    excerpt:
      "Temporary tags let you drive a newly purchased vehicle legally while permanent registration is being processed. Here is how they work.",
    body: [
      "A 30-day temporary operating permit (temp tag) is issued when a buyer needs to drive a vehicle before the permanent registration and plate are ready. They are common after private-party purchases, dealership sales, or out-of-state vehicle imports.",
      "Temp tags are valid for 30 days and are issued the same day at our office. You will need proof of purchase (bill of sale or title), valid ID, and proof of Maryland auto insurance.",
      "Important: A temp tag is not a substitute for insurance. You must be insured before we can issue one.",
    ],
  },
  {
    slug: "out-of-state-registration",
    category: "Registration",
    categoryColor: "text-red-base border-red-base",
    date: "March 25, 2026",
    title: "Moving to Maryland? How to Register Your Out-of-State Vehicle",
    excerpt:
      "Maryland requires new residents to register their vehicles within 60 days of establishing residency. We walk you through the process step by step.",
    body: [
      "New Maryland residents must title and register their out-of-state vehicle within 60 days of becoming a resident. You will need: your out-of-state title (or lienholder payoff info), a valid Maryland driver's license or ID, proof of Maryland auto insurance, and a current safety inspection certificate.",
      "If your out-of-state title shows a lien, the lienholder will need to send the title directly to the MVA or release it electronically. Our team will advise you on the fastest route.",
      "Maryland also requires a safety inspection from a certified inspection station before first-time registration of an out-of-state vehicle. We can point you to the nearest station.",
    ],
  },
  {
    slug: "registration-renewal",
    category: "Renewals",
    categoryColor: "text-gold-base border-gold-base",
    date: "April 2, 2026",
    title: "Maryland Vehicle Registration Renewal: Deadlines & What to Bring",
    excerpt:
      "Registration renewal in Maryland is annual. Miss the deadline and you face late fees. Here is how to renew without the hassle.",
    body: [
      "Maryland vehicle registrations expire on the owner's birthday each year. You can renew up to 60 days before expiration. Late renewals incur additional fees, and driving on an expired registration can result in a citation.",
      "To renew at our office, bring your renewal notice (or plate number), valid ID, and proof of current Maryland insurance. We process renewals same day and hand you the new sticker on the spot.",
      "We also offer multi-year renewals (2-year). Ask us about the savings when you stop in.",
    ],
  },
  {
    slug: "duplicate-title",
    category: "Title Services",
    categoryColor: "text-gold-base border-gold-base",
    date: "April 7, 2026",
    title: "Lost Your Title? How to Get a Duplicate Maryland Title",
    excerpt:
      "Misplacing a vehicle title is more common than you think. Getting a duplicate is straightforward when you come to us.",
    body: [
      "If your Maryland Certificate of Title has been lost, stolen, or destroyed, you can apply for a duplicate through the MVA (Maryland Vehicle Administration). You will need a completed Application for Duplicate Certificate of Title, a valid photo ID, and payment for the state fee.",
      "If there is an active lien on the vehicle, the lienholder must also authorize the duplicate title. We help you identify if a lien exists and guide you through the authorization process.",
      "Most duplicate titles are processed same day at our office. Electronic titles (e-titles) can be converted to a printed copy with our help.",
    ],
  },
  {
    slug: "common-registration-mistakes",
    category: "Tips",
    categoryColor: "text-blue-glow border-blue-glow",
    date: "April 12, 2026",
    title: "5 Common Registration Mistakes — And How to Avoid Them",
    excerpt:
      "Small errors on registration paperwork can cause big delays. Learn the most frequent mistakes our customers make and how to come prepared.",
    body: [
      "1. Wrong name spelling: The name on the title must exactly match your ID. Even a middle name discrepancy can require a correction.",
      "2. Missing insurance: Maryland requires liability insurance and uninsured motorist coverage. We cannot process your registration without valid proof of Maryland coverage.",
      "3. Incomplete bill of sale: Private-party purchases need a bill of sale with the sale price, date, buyer/seller names, and VIN. We provide blank forms at our office.",
      "4. Outstanding fines or flags: The MVA may block registration if you have unpaid violations or a suspended license. Check your MVA record before visiting us.",
      "5. Wrong fee expectation: State fees vary by vehicle weight, county, and type. Use the estimates on our website or call us ahead of time so there are no surprises.",
    ],
  },
];

const categoryColors: Record<string, string> = {
  "Title Services": "bg-gold-base/10 text-gold-base border border-gold-base/30",
  "Tags & Plates": "bg-blue-glow/10 text-blue-glow border border-blue-glow/30",
  Registration: "bg-red-base/10 text-red-base border border-red-base/30",
  Renewals: "bg-gold-base/10 text-gold-base border border-gold-base/30",
  Tips: "bg-blue-glow/10 text-blue-glow border border-blue-glow/30",
};

export default function BlogPage() {
  return (
    <main className="bg-background min-h-screen px-6 pt-48 pb-24">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-base">
            Blog &amp; Guides
          </h1>
          <div className="flex gap-2 pt-1">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
          <p className="text-text-base/60 max-w-xl pt-2">
            Helpful articles about Maryland tag, title, and vehicle registration
            — written by our team to keep you informed and prepared.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative bg-background border border-gold-shadow rounded-sm p-6 flex flex-col gap-4 hover:border-gold-base transition-all duration-300 hover:shadow-lg hover:shadow-gold-shadow/20"
            >
              {/* Category + Date */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    categoryColors[post.category] ?? "text-text-base/50 border border-text-base/20"
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-text-base/40 text-xs">{post.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-text-base text-lg font-semibold leading-snug group-hover:text-gold-base transition-colors duration-200">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-text-base/60 text-sm leading-relaxed">
                {post.excerpt}
              </p>

              {/* Body */}
              <div className="space-y-2 pt-1 border-t border-gold-shadow/40">
                {post.body.map((paragraph, i) => (
                  <p key={i} className="text-text-base/55 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-base rounded-b-sm group-hover:w-full transition-all duration-500" />
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block px-10 py-3 bg-blue-base text-text-base font-semibold uppercase tracking-wider rounded-sm hover:bg-blue-glow transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
