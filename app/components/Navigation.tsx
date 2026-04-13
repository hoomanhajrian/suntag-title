"use client";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'About Us', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
];

const navLinkClass =
    'block py-2 px-4 font-bold text-text-base hover:text-gold-base transition-colors duration-200';

// Linear interpolation helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    const handleMenuToggle = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // progress: 0 = top of page, 1 = fully scrolled (over 120px)
    const progress = Math.min(1, scrollY / 120);
    const isScrolled = scrollY > 10;

    // Interpolated sizes — track scroll directly, no CSS delay
    const desktopLogoSize = Math.round(lerp(100, 64, progress));
    const mobileLogoSize  = Math.round(lerp(96, 48, progress));
    const vertPadding     = Math.round(lerp(8, 4, progress));

    return (
        <header className="header">
            <nav
                className={`fixed top-0 left-0 right-0 w-full bg-background z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg bg-background/95' : ''}`}
            >
                {/* ── DESKTOP (lg+) — single always-present row ── */}
                <div
                    className="hidden lg:flex items-center justify-between w-full px-8"
                    style={{ paddingTop: vertPadding, paddingBottom: vertPadding }}
                >
                    {/* Left nav items */}
                    <div className="flex items-center justify-end gap-6 w-1/3">
                        {navItems.slice(0, 2).map((item) => (
                            <Link key={item.href} href={item.href} className={navLinkClass}>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Center: logo + title */}
                    <div className="flex justify-center w-1/3">
                        <Link href="/" className="flex flex-col items-center gap-0.5">
                            <Image
                                src="/app-logo.png"
                                alt="sun-tag-and-title-logo"
                                width={100}
                                height={100}
                                priority
                                style={{ width: desktopLogoSize, height: desktopLogoSize, objectFit: 'contain' }}
                            />
                            <span
                                className="font-semibold whitespace-nowrap text-text-base leading-tight"
                                style={{ opacity: progress, fontSize: '1.125rem' }}
                            >
                                <span className="text-gold-base">Sun</span>{' '}
                                <span className="text-red-base">Tag</span>{' '}&amp;{' '}
                                <span className="text-blue-glow">Title</span>
                            </span>
                        </Link>
                    </div>

                    {/* Right nav items */}
                    <div className="flex items-center justify-start gap-6 w-1/3">
                        {navItems.slice(2, 4).map((item) => (
                            <Link key={item.href} href={item.href} className={navLinkClass}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>



                {/* ── MOBILE / TABLET (< lg) ── */}
                <div
                    className="relative lg:hidden flex items-center justify-center w-full px-4"
                    style={{ paddingTop: Math.round(vertPadding / 2), paddingBottom: Math.round(vertPadding / 2) }}
                >
                    <Link href="/" className="flex flex-col items-center gap-0.5">
                        <Image
                            src="/app-logo.png"
                            alt="sun-tag-and-title-logo"
                            width={96}
                            height={96}
                            priority
                            style={{ width: mobileLogoSize, height: mobileLogoSize, objectFit: 'contain' }}
                        />
                        <span
                            className="font-semibold whitespace-nowrap text-text-base"
                            style={{ opacity: progress, fontSize: '0.875rem' }}
                        >
                            <span className="text-gold-base">Sun</span>{' '}
                            <span className="text-red-base">Tag</span>{' '}&amp;{' '}
                            <span className="text-blue-glow">Title</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        ref={menuButtonRef}
                        onClick={handleMenuToggle}
                        className="absolute right-4 p-2 text-text-base rounded-lg hover:bg-blue-base focus:outline-none focus:ring-2 focus:ring-gold-base"
                        aria-controls="navbar-mobile"
                        aria-expanded={menuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </div>
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div
                    ref={menuRef}
                    id="navbar-mobile"
                    className={`lg:hidden absolute left-0 right-0 top-full bg-background border-b border-red-base transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <ul className="flex flex-col p-4 font-bold text-center w-full gap-1">
                        {navItems.map((item, i) => (
                            <li key={item.href} style={{ transitionDelay: menuOpen ? `${(i + 1) * 50}ms` : '0ms' }}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full py-2 px-3 text-text-base rounded-sm hover:text-gold-base transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tri-color brand strip */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 flex pointer-events-none">
                    <div className="flex-1 bg-blue-base" />
                    <div className="flex-1 bg-red-base" />
                    <div className="flex-1 bg-gold-base" />
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
