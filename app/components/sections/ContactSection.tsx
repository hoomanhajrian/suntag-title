import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactInfo = [
  {
    icon: <PhoneIcon fontSize="medium" />,
    iconColor: "text-blue-glow",
    label: "Phone",
    value: "+1(443)-355-7141",
    href: "tel:+14433557141",
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
    value: "10400 Shaker Dr\nColumbia, MD 21046, USA",
    href: "https://maps.google.com/maps?q=10400+Shaker+Dr,+Columbia,+MD+21046,+USA",
  },
  {
    icon: <AccessTimeIcon fontSize="medium" />,
    iconColor: "text-gold-base",
    label: "Hours",
    value: "Mon – Fri: 8am – 6pm · Sat: 9am – 3pm",
    href: null,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background py-24 px-6">
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

        {/* Map */}
        <div className="rounded-sm overflow-hidden border border-blue-base/40 hover:border-blue-base transition-colors duration-300">
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
              10400 Shaker Dr, Columbia, MD 21046
            </span>
            <a
              href="https://maps.google.com/maps?q=10400+Shaker+Dr,+Columbia,+MD+21046,+USA"
              target="_blank"
              rel="noopener noreferrer"
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

