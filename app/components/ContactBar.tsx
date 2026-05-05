"use client";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { trackEvent } from '@/app/components/TrackPageView';

const MAPS_URL =
    'https://maps.google.com/maps?q=10400+Shaker+Dr+Suite+8,+Columbia,+MD+21046';

interface ContactBarProps {
    visible: boolean;
}

const ContactBar = ({ visible }: ContactBarProps) => (
    <div
        className="fixed left-0 right-0 z-40 flex items-stretch text-xs font-semibold transition-transform duration-300 ease-in-out pt-1"
        style={{
            top: 0,
            height: 36,
            backgroundColor: '#1a2e52',
            borderBottom: '1px solid #2a4a8a',
            transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        }}
    >
        <a
            href="mailto:amir@suntagandtitle.com"
            onClick={() => trackEvent('email_click', 'Contact Bar')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-white hover:text-gold-base hover:bg-white/5 transition-colors duration-200"
        >
            <EmailIcon style={{ fontSize: 13 }} />
            <span className="hidden sm:inline">amir@suntagandtitle.com</span>
        </a>

        <span className="self-center text-white/30 px-2">|</span>

        <a
            href="tel:+14104178272"
            onClick={() => trackEvent('call_click', 'Contact Bar')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-white hover:text-gold-base hover:bg-white/5 transition-colors duration-200"
        >
            <PhoneIcon style={{ fontSize: 13 }} />
            <span className="hidden sm:inline">(410) 417-8272</span>
        </a>

        <span className="self-center text-white/30 px-2">|</span>

        <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('directions_click', 'Contact Bar')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-white hover:text-gold-base hover:bg-white/5 transition-colors duration-200"
        >
            <LocationOnIcon style={{ fontSize: 13 }} />
            <span className="hidden sm:inline">10400 Shaker Dr, Columbia MD</span>
        </a>
    </div>
);

export default ContactBar;
