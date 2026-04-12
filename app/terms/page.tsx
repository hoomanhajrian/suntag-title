import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Sun Tag And Title",
  description: "Terms of Service for Sun Tag And Title.",
};

const sections = [
  {
    number: "1",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By visiting our website, contacting us, or receiving services at our
          office, you agree to these Terms of Service and our{" "}
          <Link href="/privacy" className="text-gold-base underline hover:text-gold-glow">
            Privacy Policy
          </Link>
          . If you do not agree, please do not use our site or services.
        </p>
        <p className="mt-3 text-text-base/50 italic text-sm">
          Note: Sun Tag &amp; Title is a DHSMV-authorized Florida tag agency. We
          are not the Department of Highway Safety and Motor Vehicles or any
          government agency.
        </p>
      </>
    ),
  },
  {
    number: "2",
    title: "Services Provided",
    content: (
      <>
        <p>Sun Tag &amp; Title offers the following services, among others:</p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-text-base/70">
          <li>
            <strong className="text-text-base/90">Tag &amp; Title Services</strong> — vehicle
            registrations, renewals, title transfers, duplicate titles, license
            plates, and 30-day temporary tags.
          </li>
          <li>
            <strong className="text-text-base/90">Out-of-State Registrations</strong> —
            processing for vehicles being brought into Florida from another
            state.
          </li>
          <li>
            <strong className="text-text-base/90">Consultation</strong> — guidance on
            registration flags, jurisdictional citations, and complex title
            matters.
          </li>
          <li>
            <strong className="text-text-base/90">Notary Services</strong> — in-person
            public notary available on-site (no legal advice provided).
          </li>
        </ul>
        <p className="mt-3">
          Services may be subject to eligibility requirements, valid ID
          requirements, and additional rules under state or federal law or
          third-party providers. We reserve the right to update, limit, or
          discontinue any service at our discretion.
        </p>
      </>
    ),
  },
  {
    number: "3",
    title: "Eligibility",
    content: (
      <p>
        You must be at least 18 years of age — or accompanied by a
        parent or legal guardian for transactions involving a minor — and
        legally capable of entering into binding agreements. Valid,
        government-issued photo ID may be required for all in-office
        transactions.
      </p>
    ),
  },
  {
    number: "4",
    title: "No Legal, Tax, or Financial Advice",
    content: (
      <p>
        Any information we provide is general in nature and offered for
        convenience only. Sun Tag &amp; Title does not provide legal, tax,
        immigration, or financial advice. For matters requiring professional
        guidance, please consult a qualified attorney, accountant, or advisor.
      </p>
    ),
  },
  {
    number: "5",
    title: "Fees & Payments",
    content: (
      <ul className="space-y-2 list-disc list-inside text-text-base/70">
        <li>
          Our service fees are disclosed to you before we begin processing your
          transaction.
        </li>
        <li>
          State and third-party fees (e.g., DHSMV fees, lien holder fees) are
          separate from our service fees and are set by those entities.
        </li>
        <li>
          Payment is due at the time services are rendered. Accepted payment
          methods are listed on our website.
        </li>
        <li>
          We reserve the right to update our fees at any time prior to your
          acceptance of a transaction.
        </li>
      </ul>
    ),
  },
  {
    number: "6",
    title: "Refunds, Corrections & Cancellations",
    content: (
      <ul className="space-y-2 list-disc list-inside text-text-base/70">
        <li>
          Government and third-party fees are generally non-refundable once
          submitted, per the policies of those entities.
        </li>
        <li>
          Our service fees are non-refundable once work has begun — including
          document review, data entry, or submission to the state.
        </li>
        <li>
          If an error is solely attributable to us, we will correct or
          re-process the transaction at no additional service fee.
        </li>
        <li>
          If an issue arises from inaccurate information, incomplete documents,
          or eligibility issues on your part, applicable state fees and
          additional service fees may apply to reprocess.
        </li>
        <li>
          We reserve the right to decline or cancel any transaction where fraud
          is suspected or required documentation is not met.
        </li>
      </ul>
    ),
  },
  {
    number: "7",
    title: "Third-Party Services & Terms",
    content: (
      <p>
        Certain services are performed through or in conjunction with
        third-party systems (e.g., DHSMV/FLHSMV, TitleTec, NMVTIS, lien
        holders). By using those services, you acknowledge and agree to the
        applicable provider&apos;s own terms, identification requirements, processing
        timelines, refund policies, and liability limitations.
      </p>
    ),
  },
  {
    number: "8",
    title: "Customer Responsibilities",
    content: (
      <>
        <p>You are responsible for:</p>
        <ul className="mt-3 space-y-1 list-disc list-inside text-text-base/70">
          <li>Providing truthful, complete, and current information and documents.</li>
          <li>
            Verifying the accuracy of names, VINs, addresses, and selections
            before submission.
          </li>
          <li>Responding promptly to any follow-up requests from our team.</li>
          <li>Complying with all applicable state and federal laws.</li>
        </ul>
        <p className="mt-3">
          Presenting fraudulent, altered, or incomplete documents may result in
          refusal of service and, where required, reporting to the appropriate
          authorities.
        </p>
      </>
    ),
  },
  {
    number: "9",
    title: "Communications",
    content: (
      <p>
        By contacting us, you consent to receiving messages related to your
        inquiry or transaction — such as status updates or requests for
        additional documents. If you receive SMS or WhatsApp messages from us,
        you may opt out at any time by replying <strong>STOP</strong>. Standard
        message and data rates may apply. See our{" "}
        <Link href="/privacy" className="text-gold-base underline hover:text-gold-glow">
          Privacy Policy
        </Link>{" "}
        for more detail.
      </p>
    ),
  },
  {
    number: "10",
    title: "Intellectual Property & Acceptable Use",
    content: (
      <p>
        All content, branding, and materials on this site are owned by Sun Tag
        &amp; Title or its licensors and are protected by applicable law. You
        may not copy, scrape, reproduce, or otherwise misuse any part of this
        site. References to third-party names or state agencies indicate the
        services we are authorized to perform and do not imply endorsement by
        those entities.
      </p>
    ),
  },
  {
    number: "11",
    title: "Disclaimers",
    content: (
      <p>
        Services are provided &quot;as-is&quot; and &quot;as-available.&quot; We do not
        guarantee uninterrupted access to third-party systems or the approval
        of any transaction by the state. Processing timelines are estimates
        only and may vary based on state system availability and workload.
      </p>
    ),
  },
  {
    number: "12",
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the fullest extent permitted by law:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside text-text-base/70">
          <li>
            Sun Tag &amp; Title is not liable for any indirect, incidental,
            special, consequential, or punitive damages — including lost time,
            lost profits, or data loss.
          </li>
          <li>
            Our total liability for any claim arising from a specific
            transaction is limited to the service fees you paid us for that
            transaction.
          </li>
        </ul>
        <p className="mt-3 text-text-base/50 text-sm italic">
          This limitation does not apply where prohibited by applicable law.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Chargebacks",
    content: (
      <p>
        You agree not to initiate a chargeback for services that were
        validly delivered. We reserve the right to contest any chargeback and
        to suspend or refuse future services in cases of abuse.
      </p>
    ),
  },
  {
    number: "14",
    title: "Governing Law & Venue",
    content: (
      <p>
        These Terms are governed by the laws of the State of Florida. Any
        dispute not resolved through direct communication shall be subject to
        the exclusive jurisdiction of the state and federal courts located in
        Florida.
      </p>
    ),
  },
  {
    number: "15",
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms at any time by posting a revised version with
        an updated effective date. Your continued use of our site or services
        after any changes constitutes your acceptance of the revised Terms.
      </p>
    ),
  },
  {
    number: "16",
    title: "Miscellaneous",
    content: (
      <p>
        If any provision of these Terms is found to be unenforceable, the
        remaining provisions continue in full force (severability). Failure to
        enforce any right is not a waiver of that right. These Terms constitute
        the entire agreement between you and Sun Tag &amp; Title regarding use
        of this site and our services. We are not liable for delays caused by
        circumstances outside our reasonable control (force majeure).
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="bg-background min-h-screen px-6 pt-48 pb-24">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-base">
            Terms of Service
          </h1>
          <div className="flex gap-2 pt-1">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
          <div className="text-text-base/50 text-sm pt-2 space-y-0.5">
            <p>Effective Date: April 12, 2026</p>
            <p>Company: Sun Tag &amp; Title</p>
            <p>
              Website:{" "}
              <a
                href="https://suntagandtitle.com"
                className="text-gold-base underline hover:text-gold-glow"
              >
                suntagandtitle.com
              </a>
            </p>
          </div>
        </div>

        {/* Intro */}
        <p className="text-text-base/70 leading-relaxed">
          Please read these Terms of Service carefully before using our website
          or visiting our office. They explain your rights and responsibilities
          when engaging with Sun Tag &amp; Title.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.number} className="space-y-3">
              <h2 className="text-xl font-semibold text-text-base border-l-4 border-gold-base pl-3">
                {section.number}. {section.title}
              </h2>
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
