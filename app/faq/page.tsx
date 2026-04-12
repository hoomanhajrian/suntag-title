"use client";
import { useState } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type FAQ = {
  question: string;
  answer: string;
};

type FAQGroup = {
  group: string;
  color: string;
  border: string;
  items: FAQ[];
};

const faqGroups: FAQGroup[] = [
  {
    group: "Tag & Title Transfers",
    color: "text-gold-base",
    border: "border-gold-base",
    items: [
      {
        question: "What do I need to transfer a vehicle title in Florida?",
        answer:
          "You will need the signed Florida title (seller must sign the back), a completed Form HSMV 82040, valid government-issued photo ID, proof of current Florida auto insurance, and payment for state fees plus our service fee. Both buyer and seller signatures are required on the title.",
      },
      {
        question: "How long does a title transfer take?",
        answer:
          "Most title transfers are processed same day at our office. Once submitted to the DHSMV, the new title is typically mailed within 7–10 business days. You leave with your new registration and plate the same day.",
      },
      {
        question: "Can I transfer a title if there is a lien on the vehicle?",
        answer:
          "If the seller still has an outstanding loan, the lienholder must either release the title electronically or mail the original title directly to the DHSMV. We can walk you through the steps and confirm lien status before you come in.",
      },
      {
        question: "What if the name on the title does not match the seller's ID?",
        answer:
          "The name on the title must exactly match the seller's government-issued ID. If there is a discrepancy (e.g., a name change after marriage), additional documentation such as a marriage certificate or court order will be required before we can process the transfer.",
      },
    ],
  },
  {
    group: "Registration & Renewals",
    color: "text-blue-glow",
    border: "border-blue-glow",
    items: [
      {
        question: "When does my Florida vehicle registration expire?",
        answer:
          "Florida registrations expire on the registered owner's birthday each year. You can renew up to 90 days before the expiration date. Renewals processed after the birthday incur a $10 late fee.",
      },
      {
        question: "What do I need to renew my registration?",
        answer:
          "Bring your renewal notice (or just your plate number), a valid photo ID, and proof of current Florida insurance (minimum $10,000 PIP and $10,000 PDL). We process renewals same day and hand you the new decal before you leave.",
      },
      {
        question: "Can I do a multi-year registration renewal?",
        answer:
          "Yes — Florida allows 2-year registration renewals. This saves you a trip next year and locks in today's state fee rates. Ask us about it when you come in.",
      },
      {
        question: "I moved to Florida. When do I need to register my vehicle?",
        answer:
          "New Florida residents must register their out-of-state vehicle within 30 days of establishing residency. You will need your out-of-state title (or electronic lien info), a Florida driver's license or ID, proof of Florida insurance, and a VIN verification. We will tell you exactly where to get the VIN check if needed.",
      },
    ],
  },
  {
    group: "Temporary Tags & Plates",
    color: "text-red-base",
    border: "border-red-base",
    items: [
      {
        question: "How do I get a 30-day temporary tag?",
        answer:
          "Bring your bill of sale or signed title, valid photo ID, and proof of Florida insurance. We issue the temp tag the same day. It is valid for 30 days and allows you to drive the vehicle legally while your permanent registration is being processed.",
      },
      {
        question: "Can I get a second temporary tag if 30 days is not enough?",
        answer:
          "Florida law generally does not allow a second temporary tag to be issued for the same vehicle. If your situation requires additional time, come in so we can assess the reason for the delay and explore options.",
      },
      {
        question: "Do I need insurance before getting a temp tag?",
        answer:
          "Yes. Florida requires valid auto insurance before any tag or registration can be issued. Bring proof of a current Florida policy that meets the state minimums ($10,000 PIP and $10,000 PDL).",
      },
    ],
  },
  {
    group: "Duplicate Titles & Lost Documents",
    color: "text-gold-base",
    border: "border-gold-base",
    items: [
      {
        question: "How do I get a duplicate title if I lost mine?",
        answer:
          "You will need Form HSMV 82101, a valid photo ID, and payment for the state fee. If there is an active lien on the vehicle, the lienholder must also authorize the duplicate. We help you check lien status and complete the paperwork — most duplicates are ready the same day.",
      },
      {
        question: "What is an e-title, and how do I get a printed copy?",
        answer:
          "An electronic title (e-title) means your title is held electronically by the Florida DHSMV rather than mailed to you. If you need a printed title — for example, to complete a private sale — we can print it on the spot for a small fee.",
      },
    ],
  },
  {
    group: "Fees & Payments",
    color: "text-blue-glow",
    border: "border-blue-glow",
    items: [
      {
        question: "How much does it cost to use your services?",
        answer:
          "Our service fee covers the administrative work we do on your behalf. State and DHSMV fees are separate and set by the state — they vary by vehicle type, weight, and county. We always disclose the full cost before processing anything.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Accepted payment methods are listed on our website and posted in-office. State fees and our service fee are due at the time services are rendered.",
      },
      {
        question: "Are state fees refundable if my application is rejected?",
        answer:
          "Government fees are generally non-refundable once submitted to the DHSMV. Our service fee is also non-refundable once we have begun processing — including document review and data entry. If an error is on our end, we will re-process at no additional service fee.",
      },
    ],
  },
  {
    group: "General",
    color: "text-red-base",
    border: "border-red-base",
    items: [
      {
        question: "Do I need an appointment?",
        answer:
          "No appointment is needed — walk-ins are always welcome. For complex transactions (out-of-state titles, lien releases, etc.) it helps to call ahead so we can confirm exactly what documents you need to bring.",
      },
      {
        question: "Are you a government agency?",
        answer:
          "No. Sun Tag & Title is a privately owned, DHSMV-authorized Florida tag agency. We are not the Department of Highway Safety and Motor Vehicles. We perform many of the same transactions as a DHSMV service center, but we are an independent business.",
      },
      {
        question: "Can you help if my registration has a flag or hold?",
        answer:
          "Yes — we can look up your DHSMV record and explain why your registration is flagged. Common reasons include outstanding citations, unpaid fees, insurance lapses, or an unresolved lien. We will tell you exactly what needs to be resolved and assist where we can.",
      },
      {
        question: "Do you offer notary services?",
        answer:
          "Yes, we have a public notary on-site. Please note that notary services do not constitute legal advice. For legal matters, consult a licensed Florida attorney.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="bg-background min-h-screen px-6 pt-48 pb-24">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-base">
            Frequently Asked Questions
          </h1>
          <div className="flex gap-2 pt-1">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
          <p className="text-text-base/60 max-w-xl pt-2">
            Can&apos;t find what you&apos;re looking for? Stop by or{" "}
            <Link href="/#contact" className="text-gold-base underline hover:text-gold-glow">
              contact us
            </Link>{" "}
            and we will be happy to help.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-10">
          {faqGroups.map((group) => (
            <div key={group.group} className="space-y-3">
              <h2
                className={`text-xl font-semibold ${group.color} border-l-4 ${group.border} pl-3`}
              >
                {group.group}
              </h2>

              <div className="divide-y divide-gold-shadow/40 border border-gold-shadow rounded-sm overflow-hidden">
                {group.items.map((item, idx) => {
                  const key = `${group.group}-${idx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gold-shadow/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-base"
                      >
                        <span className="text-text-base font-medium text-sm leading-snug">
                          {item.question}
                        </span>
                        <span className={`shrink-0 ${group.color}`}>
                          {isOpen ? (
                            <RemoveIcon fontSize="small" />
                          ) : (
                            <AddIcon fontSize="small" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-text-base/65 text-sm leading-relaxed border-t border-gold-shadow/40 bg-gold-shadow/5">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
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
