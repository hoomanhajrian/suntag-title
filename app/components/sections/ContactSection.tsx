"use client";
import { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactInfo = [
  {
    icon: <PhoneIcon className="text-gold-base" />,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: <EmailIcon className="text-gold-base" />,
    label: "Email",
    value: "info@suntagandtitle.com",
    href: "mailto:info@suntagandtitle.com",
  },
  {
    icon: <LocationOnIcon className="text-gold-base" />,
    label: "Address",
    value: "123 Sunshine Blvd, Miami, FL 33101",
    href: "https://maps.google.com",
  },
  {
    icon: <AccessTimeIcon className="text-gold-base" />,
    label: "Hours",
    value: "Mon – Fri: 8am – 6pm · Sat: 9am – 3pm",
    href: null,
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to a form-submission backend
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-base text-sm font-semibold uppercase tracking-widest">
            Reach Out
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-base">
            Contact Us
          </h2>
          <p className="text-text-base/60 text-lg max-w-xl mx-auto">
            Have questions or ready to get started? Drop us a message and we
            will get back to you promptly.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1 w-8 bg-blue-base rounded-full" />
            <div className="h-1 w-8 bg-red-base rounded-full" />
            <div className="h-1 w-8 bg-gold-base rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-text-base uppercase tracking-wide">
              Get In Touch
            </h3>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-text-base/40 text-xs uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-text-base hover:text-gold-base transition-colors duration-200 text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-base text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 border border-gold-shadow rounded-sm overflow-hidden h-48 flex items-center justify-center bg-background/50">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-base/40 text-sm hover:text-gold-base transition-colors duration-200 uppercase tracking-widest"
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 border border-gold-base rounded-sm p-10">
                <span className="text-gold-base text-5xl">✓</span>
                <h4 className="text-text-base text-xl font-bold uppercase">
                  Message Sent!
                </h4>
                <p className="text-text-base/60 text-sm">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", service: "", message: "" }); }}
                  className="text-gold-base text-sm underline hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-text-base/50 text-xs uppercase tracking-widest">
                      Full Name <span className="text-red-base">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="bg-background border border-gold-shadow rounded-sm px-4 py-2.5 text-text-base text-sm placeholder:text-text-base/30 focus:outline-none focus:border-gold-base transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-text-base/50 text-xs uppercase tracking-widest">
                      Email <span className="text-red-base">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="bg-background border border-gold-shadow rounded-sm px-4 py-2.5 text-text-base text-sm placeholder:text-text-base/30 focus:outline-none focus:border-gold-base transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-text-base/50 text-xs uppercase tracking-widest">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="bg-background border border-gold-shadow rounded-sm px-4 py-2.5 text-text-base text-sm placeholder:text-text-base/30 focus:outline-none focus:border-gold-base transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-text-base/50 text-xs uppercase tracking-widest">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="bg-background border border-gold-shadow rounded-sm px-4 py-2.5 text-text-base text-sm focus:outline-none focus:border-gold-base transition-colors duration-200"
                    >
                      <option value="">Select a service…</option>
                      <option value="registration">Vehicle Registration</option>
                      <option value="tag-renewal">Tag Renewal</option>
                      <option value="title-transfer">Title Transfer</option>
                      <option value="new-title">New Title (Dealer)</option>
                      <option value="duplicate-title">Duplicate / Lost Title</option>
                      <option value="vin">VIN Verification</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-text-base/50 text-xs uppercase tracking-widest">
                    Message <span className="text-red-base">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="bg-background border border-gold-shadow rounded-sm px-4 py-2.5 text-text-base text-sm placeholder:text-text-base/30 focus:outline-none focus:border-gold-base transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gold-base text-background font-semibold uppercase tracking-wider rounded-sm hover:bg-gold-light transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
