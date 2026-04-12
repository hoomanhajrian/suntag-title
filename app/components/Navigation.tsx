"use client";
import { useState, useRef, useEffect } from 'react';
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

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [titleVisible, setTitleVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleMenuToggle = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => setMenuOpen(false);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Drive entire nav layout from hero title visibility
    useEffect(() => {
        const heroTitle = document.getElementById('hero-title');
        if (!heroTitle) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setTitleVisible(!entry.isIntersecting);
                if (entry.isIntersecting) setMenuOpen(false);
            },
            { threshold: 0 }
        );
        observer.observe(heroTitle);
        return () => observer.disconnect();
    }, []);

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

    return (
        <header className="header">
            <nav
                className={`fixed top-0 left-0 right-0 w-full bg-background z-50 transition-all duration-300 ${titleVisible ? 'shadow-lg backdrop-blur-sm bg-background/95' : ''}`}
            >
                {titleVisible ? (
                    <>
                        {/* ── SCROLLED: Desktop (lg+) — split layout, no hamburger ── */}
                        <div className="hidden lg:flex items-center justify-between w-full px-8 py-2">
                            {/* Left 2 items */}
                            <div className="flex items-center justify-around gap-6 w-1/2">
                                {navItems.slice(0, 2).map((item) => (
                                    <Link key={item.href} href={item.href} className={navLinkClass}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Center: Logo + Title (title only after hero heading leaves view) */}
                            <Link href="/" className="flex flex-col items-center gap-0.5 transition-all duration-300">
                                <Image
                                    src="/app-logo.png"
                                    alt="sun-tag-and-title-logo"
                                    width={80}
                                    height={80}
                                    priority
                                    className="h-16 w-16 object-contain"
                                />
                                <span className={`text-lg font-semibold whitespace-nowrap text-text-base leading-tight transition-all duration-300 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none select-none'}`}>
                                    <span className="text-gold-base">Sun</span>{' '}<span className="text-red-base">Tag</span>{' '}&amp;{' '}<span className="text-blue-glow">Title</span>
                                </span>
                            </Link>

                            {/* Right 2 items */}
                            <div className="flex items-center justify-around gap-6 w-1/2">
                                {navItems.slice(2, 4).map((item) => (
                                    <Link key={item.href} href={item.href} className={navLinkClass}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* ── SCROLLED: Mobile / Tablet (< lg) — logo + title centered, hamburger right ── */}
                        <div className="relative lg:hidden flex items-center justify-center w-full px-4 py-2">
                            <Link href="/" className="flex flex-col items-center gap-0.5">
                                <Image
                                    src="/app-logo.png"
                                    alt="sun-tag-and-title-logo"
                                    width={48}
                                    height={48}
                                    priority
                                    className="h-12 w-12 object-contain"
                                />
                                <span className={`font-semibold text-sm text-text-base whitespace-nowrap transition-all duration-300 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none select-none'}`}>
                                    <span className="text-gold-base">Sun</span>{' '}<span className="text-red-base">Tag</span>{' '}&amp;{' '}<span className="text-blue-glow">Title</span>
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

                        {/* Mobile dropdown (scrolled) */}
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
                    </>
                ) : (
                    <>
                        {/* ── NOT SCROLLED: centered logo + title column on mobile, logo only on desktop ── */}
                        <div className="relative w-full flex items-center justify-center mx-auto p-4">
                            {/* Mobile: logo only (title hidden here since hero title is visible) */}
                            <Link href="/" className="flex flex-col items-center gap-1 lg:hidden">
                                <Image
                                    src="/app-logo.png"
                                    alt="sun-tag-and-title-logo"
                                    width={96}
                                    height={96}
                                    priority
                                    className="h-24 w-24 object-contain"
                                />
                            </Link>
                            {/* Desktop: logo only */}
                            <Link href="/" className="hidden lg:flex flex-row items-center space-x-3">
                                <Image
                                    src="/app-logo.png"
                                    alt="sun-tag-and-title-logo"
                                    width={300}
                                    height={300}
                                    priority
                                    className="h-24 w-24 object-contain"
                                />
                            </Link>
                            {/* Hamburger — mobile/tablet only */}
                            <button
                                type="button"
                                ref={menuButtonRef}
                                className="absolute right-4 inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-text-base rounded-lg hover:bg-blue-base focus:outline-none focus:ring-2 focus:ring-gold-base lg:hidden"
                                aria-controls="navbar-sticky"
                                aria-expanded={menuOpen}
                                onClick={handleMenuToggle}
                            >
                                <span className="sr-only">Open main menu</span>
                                <div style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                                </div>
                            </button>
                        </div>

                        {/* Desktop horizontal menu (not scrolled) */}
                        <div
                            className="hidden lg:flex w-full border-b border-red-base bg-background"
                            id="navbar-sticky"
                        >
                            <ul className="flex flex-row justify-around items-center w-full py-0">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={navLinkClass}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile/Tablet dropdown (not scrolled) */}
                        <div
                            ref={menuRef}
                            id="navbar-sticky-mobile"
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
                    </>
                )}

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
