"use client";
import { footerLinks } from '@/app/data/links';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import SmsIcon from '@mui/icons-material/Sms';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import IosShareIcon from '@mui/icons-material/IosShare';

const SITE_URL = 'https://suntagandtitle.com';
const SHARE_TEXT = 'Sun Tag & Title | Same-day vehicle registration, title transfers & more in Columbia, MD';

const shareLinks = [
  {
    label: 'Sun Tag & Title on Facebook',
    href: 'https://www.facebook.com/p/SUN-TAG-and-TITLE-61554522663897',
    icon: <FacebookIcon fontSize="small" />,
    color: 'hover:text-blue-glow',
  },
  {
    label: 'Share on X',
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
    icon: <XIcon fontSize="small" />,
    color: 'hover:text-white',
  },
  {
    label: 'Share on WhatsApp',
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(SHARE_TEXT + ' ' + SITE_URL)}`,
    icon: <WhatsAppIcon fontSize="small" />,
    color: 'hover:text-green-400',
  },
];

const Footer = () => {
    const version = '2.1.3'; // Semantic versioning: Major.Minor.Patch
    
    return (
        <footer className="relative z-10 bg-background pt-1 pb-8">
            {/* ── Non-Government Disclaimer Banner ── */}
            <div
                className="w-full text-center text-xs font-semibold uppercase tracking-widest py-2 px-4 mb-1"
                style={{ backgroundColor: '#1a2e52', color: '#FFC040' }}
            >
                This is NOT a government website. Sun Tag &amp; Title is a licensed, authorized non-government Maryland MVA tag agency.
            </div>
            {/* Tri-color brand strip */}
            <div className="flex w-full h-0.5 mb-8">
                <div className="flex-1 bg-blue-base" />
                <div className="flex-1 bg-red-base" />
                <div className="flex-1 bg-gold-base" />
            </div>
            <div className="container mx-auto px-4 text-center text-text-base">
                <p>&copy; {new Date().getFullYear()} Sun Tag And Title. All rights reserved.</p>
                <div className="flex flex-col items-center gap-3 mt-6">
                    {/* Share buttons */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-text-base/50 uppercase tracking-widest flex items-center gap-1">
                            <IosShareIcon sx={{ fontSize: 14 }} /> Share
                        </span>
                        {shareLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className={`text-text-base/60 ${s.color} transition duration-200`}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mt-4 text-sm">
                    {Object.entries(footerLinks).map(([groupKey, links]) => (
                        <div key={groupKey} className="md:text-left">
                            <h4 className="font-bold text-gold-base mb-2 capitalize">{groupKey}</h4>
                            <ul className="space-y-1">
                                {links.map((link: any, index: number) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-text-base hover:text-gold-base transition duration-200">
                                            {link.key}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-blue-base/30">
                    <p className="text-xs text-text-base/60">
                        Version {version}
                    </p>
                    <p className="text-xs text-text-base/40 mt-3 max-w-2xl mx-auto leading-relaxed">
                        <strong className="text-text-base/60">Non-Government Provider Disclosure:</strong>{' '}
                        Sun Tag &amp; Title is a privately owned, licensed Maryland MVA-authorized tag agency. This website is not affiliated with, endorsed by, or operated by
                        the Maryland Motor Vehicle Administration (MVA), any state agency, or the federal government.
                        Services offered facilitate government transactions on your behalf. Government fees are separate from our service fees.
                        For direct government services, visit{' '}
                        <a href="https://mva.maryland.gov" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-base transition-colors">mva.maryland.gov</a>.
                    </p>
                </div>
            </div>
        </footer>);
};

export default Footer;