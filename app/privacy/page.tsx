import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Sun Tag & Title – Columbia, MD",
  description:
    "Read the Privacy Policy for Sun Tag & Title, a licensed Maryland tag agency in Columbia, MD. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: 'https://suntagandtitle.com/privacy',
  },
};

const sections = [
  {
    title: "Who We Are",
    content: (
      <>
        <p>
          Sun Tag &amp; Title is a licensed, state-authorized tag agency proudly
          serving our local community. Our website address is:{" "}
          <a
            href="https://suntagandtitle.com"
            className="text-gold-base underline hover:text-gold-glow"
          >
            https://suntagandtitle.com
          </a>
        </p>
      </>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <>
        <p>
          When you submit an inquiry or contact form on our site, we collect the
          information you provide — such as your name, email address, phone
          number, and message — along with your IP address and browser
          information to help us prevent spam and protect the integrity of our
          communications.
        </p>
        <p className="mt-3">
          We do not use third-party profile or avatar services. Any contact
          information you submit is used solely to respond to your inquiry.
        </p>
      </>
    ),
  },
  {
    title: "Media &amp; Uploaded Files",
    content: (
      <p>
        If you submit any documents or images through our website, please ensure
        they do not contain embedded location metadata (such as EXIF GPS data).
        We are not responsible for location information embedded in files you
        choose to upload or share with us.
      </p>
    ),
  },
  {
    title: "Cookies",
    content: (
      <>
        <p>
          Our website may use cookies to improve your browsing experience. If
          you interact with certain features on our site, a temporary cookie may
          be set to determine whether your browser supports cookies. This cookie
          holds no personal information and is deleted when you close your
          browser.
        </p>
        <p className="mt-3">
          We may also set cookies to remember preferences you have selected
          during your visit. These cookies are used solely to enhance usability
          and do not track you across other websites.
        </p>
      </>
    ),
  },
  {
    title: "Embedded Content from Third Parties",
    content: (
      <>
        <p>
          Pages on this site may include embedded content such as maps, videos,
          or other interactive elements provided by third-party services.
          Embedded content from external sources behaves as though you visited
          those services directly.
        </p>
        <p className="mt-3">
          Those third-party providers may collect data about you, set their own
          cookies, and monitor your interactions — particularly if you are
          signed in to an account with them.
        </p>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <p>
        The information you provide is used exclusively to respond to your
        inquiries, process service requests, and improve the quality of our
        services. We do not sell, rent, or share your personal information with
        third parties for marketing purposes.
      </p>
    ),
  },
  {
    title: "How Long We Retain Your Data",
    content: (
      <p>
        Inquiry submissions and their associated details are retained for a
        reasonable period so we can follow up on your request and maintain
        accurate service records. If you would like your information removed,
        please contact us directly and we will honor your request in accordance
        with applicable law.
      </p>
    ),
  },
  {
    title: "Your Rights Over Your Data",
    content: (
      <p>
        You have the right to request a copy of the personal information we hold
        about you, or to ask that we delete it. Requests to access or erase your
        data will be fulfilled promptly, except where retention is required for
        legal, administrative, or security purposes. To make a request, reach
        out to us through the contact information on our website.
      </p>
    ),
  },
  {
    title: "Where Your Data Is Sent",
    content: (
      <p>
        Information submitted through our contact forms may be routed through
        automated spam-filtering services to protect against fraudulent
        submissions. We do not transfer your personal data to third parties
        outside of this purpose without your explicit consent.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-background min-h-screen px-6 pt-48 pb-24">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-base">
            Privacy Policy
          </h1>
          <div className="flex gap-2 pt-1">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
          <p className="text-text-base/50 text-sm pt-2">
            Last updated: April 12, 2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-text-base/70 leading-relaxed">
          At Sun Tag &amp; Title, your privacy matters to us. This policy
          explains what information we collect when you visit our website, how
          we use it, and the choices you have.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2
                className="text-xl font-semibold text-text-base border-l-4 border-gold-base pl-3"
                dangerouslySetInnerHTML={{ __html: section.title }}
              />
              <div className="text-text-base/70 leading-relaxed">
                {section.content}
              </div>
            </div>
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
