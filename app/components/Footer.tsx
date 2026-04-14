"use client";
import { footerLinks } from '@/app/data/links';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import SmsIcon from '@mui/icons-material/Sms';

const Footer = () => {
    const version = '1.2.0'; // Semantic versioning: Major.Minor.Patch
    
    return (
        <footer className="relative z-10 bg-background pt-1 pb-8">
            {/* Tri-color brand strip */}
            <div className="flex w-full h-0.5 mb-8">
                <div className="flex-1 bg-blue-base" />
                <div className="flex-1 bg-red-base" />
                <div className="flex-1 bg-gold-base" />
            </div>
            <div className="container mx-auto px-4 text-center text-text-base">
                <p>&copy; {new Date().getFullYear()} Sun Tag And Title. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-6">
                    <a href="https://www.facebook.com/p/SUN-TAG-and-TITLE-61554522663897" target='_blank' className="text-text-base hover:text-blue-glow transition duration-200" aria-label="Facebook">
                        <FacebookIcon className="h-6 w-6" />
                    </a>
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
                </div>
            </div>
        </footer>);
};

export default Footer;