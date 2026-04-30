'use client';

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SmsIcon from "@mui/icons-material/Sms";
import SendIcon from "@mui/icons-material/Send";
import { trackEvent } from "@/app/components/TrackPageView";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SERVICE_OPTIONS = [
  'Title Transfer',
  'Vehicle Registration Renewal',
  'Temporary Tag',
  'Duplicate Title',
  'Notary Service',
  'Other',
];

const contactInfo = [
  {
    icon: <PhoneIcon fontSize="medium" />,
    iconColor: "text-blue-glow",
    label: "Phone",
    value: "+1(410)-417-8272",
    href: "tel:+14104178272",
  },
  {
    icon: <EmailIcon fontSize="medium" />,
    iconColor: "text-gold-base",
    label: "Email",
    value: "amir@suntagandtitle.com",
    href: "mailto:amir@suntagandtitle.com",
  },
  {
    icon: <LocationOnIcon fontSize="medium" />,
    iconColor: "text-red-base",
    label: "Address",
    value: "10400 Shaker Dr Suite 8\nColumbia, MD 21046, USA",
    href: "https://maps.google.com/maps?q=10400+Shaker+Dr,+Columbia,+MD+21046,+USA",
  },
  {
    icon: <AccessTimeIcon fontSize="medium" />,
    iconColor: "text-gold-base",
    label: "Hours",
    value: "Everyday : 9am – 7:30pm (EST)",
    href: null,
  },
];

const ContactSection = () => {
  const pathname = usePathname();

  // Contact form state
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', request: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const RATE_LIMIT_KEY = 'contact_submissions';
  const RATE_LIMIT_MAX = 2;
  const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

  function getRateLimitTimestamps(): number[] {
    try {
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function checkRateLimit(): { allowed: boolean; msUntilReset: number } {
    const now = Date.now();
    const cutoff = now - RATE_LIMIT_WINDOW_MS;
    const recent = getRateLimitTimestamps().filter(ts => ts > cutoff);
    if (recent.length >= RATE_LIMIT_MAX) {
      const oldest = Math.min(...recent);
      return { allowed: false, msUntilReset: RATE_LIMIT_WINDOW_MS - (now - oldest) };
    }
    return { allowed: true, msUntilReset: 0 };
  }

  function recordSubmission() {
    const now = Date.now();
    const cutoff = now - RATE_LIMIT_WINDOW_MS;
    const recent = getRateLimitTimestamps().filter(ts => ts > cutoff);
    try {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...recent, now]));
    } catch {
      // localStorage unavailable — fail silently
    }
  }

  function formatTimeRemaining(ms: number): string {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  function handleContactClick(label: string, href: string) {
    let event_type = 'contact_click';
    if (href.startsWith('tel:')) event_type = 'call_click';
    else if (href.startsWith('mailto:')) event_type = 'email_click';
    else if (href.startsWith('https://maps') || href.includes('maps.google')) event_type = 'directions_click';
    trackEvent(event_type, label);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    const { allowed, msUntilReset } = checkRateLimit();
    if (!allowed) {
      setErrorMsg(`You've reached the limit of ${RATE_LIMIT_MAX} messages per day. Try again in ${formatTimeRemaining(msUntilReset)}.`);
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        recordSubmission();
        setStatus('success');
        setForm({ name: '', company: '', email: '', phone: '', request: '', message: '' });
        trackEvent('contact_form_submit', form.request || 'General Inquiry');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      className="py-24 px-6 scroll-mt-36"
      style={{ backgroundColor: '#000000', position: 'relative', zIndex: 1 }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Reach Out
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-base">
            Contact Us
          </h2>
          <p className="text-text-base/60 text-lg max-w-xl mx-auto">
            Have questions or ready to get started? Come visit us or reach out
            directly — we are here to help.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className={`flex items-start gap-4 text--gold-base rounded-sm p-5 transition-colors duration-300`}
            >
              {/* Icon bubble */}
              <div className={`shrink-0 p-2 rounded-sm bg-background ${item.iconColor}`}>
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <span className="text-text-base/40 text-xs uppercase tracking-widest">
                  {item.label}
                </span>
                {item.value ? (
                  item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => handleContactClick(item.label, item.href!)}
                      className="text-text-base hover:text-gold-base transition-colors duration-200 text-sm whitespace-pre-line"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text-base text-sm whitespace-pre-line">{item.value}</p>
                  )
                ) : (
                  <p className="text-text-base/30 text-sm italic">Coming soon</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-10 rounded-md shadow-xl p-8" style={{ backgroundColor: '#1a2e52', border: '1px solid #2a4a8a', position: 'relative', zIndex: 2 }}>
          {/* Form header */}
          <div className="mb-8 pb-5" style={{ borderBottom: '1px solid #2a4a8a' }}>
            <span className="text-gold-base text-xs font-semibold uppercase tracking-widest">Get in Touch</span>
            <h3 className="text-2xl font-bold text-text-base mt-1">Send Us a Message</h3>
            <p className="text-text-base/50 text-sm mt-1">We&apos;ll respond as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cf-name" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                  Name <span className="text-red-base">*</span>
                </label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Smith"
                  className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200 placeholder:text-text-base/25"
                  style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cf-company" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                  Company
                </label>
                <input
                  id="cf-company"
                  type="text"
                  maxLength={100}
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Optional"
                  className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200 placeholder:text-text-base/25"
                  style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cf-email" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                  Email <span className="text-red-base">*</span>
                </label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200 placeholder:text-text-base/25"
                  style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cf-phone" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                  Phone
                </label>
                <input
                  id="cf-phone"
                  type="tel"
                  maxLength={30}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                  className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200 placeholder:text-text-base/25"
                  style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf-request" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                Service Requested
              </label>
              <select
                id="cf-request"
                value={form.request}
                onChange={e => setForm(f => ({ ...f, request: e.target.value }))}
                className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200"
                style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
              >
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cf-message" className="text-xs font-semibold uppercase tracking-widest text-text-base/60">
                Message <span className="text-red-base">*</span>
              </label>
              <textarea
                id="cf-message"
                required
                maxLength={2000}
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us how we can help…"
                className="border outline-none rounded px-4 py-3 text-text-base text-sm transition-colors duration-200 placeholder:text-text-base/25 resize-none"
                style={{ backgroundColor: '#0f1d38', borderColor: '#2a4a8a' }}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-base text-sm font-medium">{errorMsg}</p>
            )}
            {status === 'success' && (
              <p className="text-green-400 text-sm font-medium">
                Message sent! We&apos;ll get back to you shortly.
              </p>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-8 py-3 rounded font-bold text-sm uppercase tracking-widest bg-gold-base text-background hover:bg-gold-base/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                <SendIcon fontSize="small" />
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Text CTA */}
        <div className="relative z-10 flex justify-center mb-10">
          <a
            href="sms:+14104178272"
            onClick={() => trackEvent('sms_click', 'Text For a Quote')}
            className="inline-flex text-sm items-center gap-3 px-8 py-4 rounded-sm font-bold text-white text-base uppercase tracking-widest transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#25D366' }}
          >
            <SmsIcon fontSize="medium" />
            Text For a Quote
          </a>
        </div>

        {/* Map */}
        <div className="relative z-10 bg-background rounded-sm overflow-hidden border border-blue-base/40 hover:border-blue-base transition-colors duration-300">
          <iframe
            title="Sun Tag & Title Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.2386396738!2d-76.84538492346463!3d39.18185657169395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7e0e9ef7f2345%3A0x1!2s10400+Shaker+Dr%2C+Columbia%2C+MD+21046!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex items-center justify-between px-5 py-3 bg-background border-t border-blue-base/20">
            <span className="text-text-base/50 text-xs uppercase tracking-widest">
              10400 Shaker Dr Suite 8, Columbia, MD 21046
            </span>
            <a
              href="https://maps.google.com/maps?q=10400+Shaker+Dr,+Columbia,+MD+21046,+USA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('directions_click', 'Get Directions map link')}
              className="text-blue-glow hover:text-gold-base text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
            >
              Get Directions →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;

