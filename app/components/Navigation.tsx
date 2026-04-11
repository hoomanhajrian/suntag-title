"use client";
import { useState, useRef, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };


    // Handle scroll for compact navigation
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
            setMenuOpen(false); // Close menu on scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close menu when clicking outside
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="header">
            <nav
                onMouseLeave={() => setMenuOpen(false)}
                className={`fixed top-0 left-0 right-0 w-full bg-background border-b border-gold-shadow z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg backdrop-blur-sm bg-background/95' : ''
                    }`}
            >
                <div className={`relative w-full flex flex-wrap items-center mx-auto transition-all duration-300 ${isScrolled ? 'py-1 px-3 justify-between' : 'p-4 justify-between'
                    }`}>
                    {/* Logo - Compact when scrolled, full size when at top */}
                    <Link
                        href="/"
                        className={`flex mr-auto ml-auto md:w-auto rtl:space-x-reverse transition-all duration-300 ${isScrolled ? 'flex-col items-center space-y-0.5' : 'flex-row items-center space-x-3'
                            }`}
                    >
                        <Image
                            src="/app-logo.png"
                            alt="sun-tag-and-title-logo"
                            width={500}
                            height={500}
                            priority
                            className={`object-contain transition-all duration-300 ${isScrolled ? 'h-20 w-20' : 'h-24 w-24'}`}
                        />
                        <span className={`self-center font-semibold whitespace-nowrap text-text-base transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl hidden'}`}>
                            Sun Tag & Title
                        </span>
                    </Link>
                        {/* Hamburger Menu Button - Show on mobile always, show on desktop/tablet when scrolled */}
                        <button
                            type="button"
                            ref={menuButtonRef}
                            className={`inline-flex items-center justify-center text-sm text-text-base rounded-lg hover:bg-blue-base focus:outline-none focus:ring-2 focus:ring-gold-base transition-all duration-300 ${isScrolled ? 'p-1.5 w-8 h-8' : 'p-2 w-10 h-10 lg:hidden'
                                }`}
                            aria-controls="navbar-sticky"
                            aria-expanded={menuOpen}
                            onClick={handleMenuToggle}
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="transition-transform duration-300" style={{ transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                {menuOpen ? <CloseIcon /> : <MenuIcon />}
                            </div>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div
                        ref={menuRef}
                        className={`absolute left-0 right-0 top-full transition-all duration-300 ease-in-out overflow-hidden bg-background border-b border-gold-shadow ${isScrolled
                                ? (menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')
                                : (menuOpen ? 'max-h-96 opacity-100 lg:max-h-0 lg:opacity-0' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100 lg:static lg:flex lg:w-full lg:order-1 lg:bg-transparent lg:border-0')
                            }`}
                        id="navbar-sticky"
                    >
                        <ul className={`flex flex-col space-y-2 p-4 font-medium text-center w-full ${!isScrolled ? 'lg:p-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:justify-around lg:items-center' : 'lg:p-2 lg:space-y-0 lg:flex-row lg:justify-around lg:items-center'
                            }`}>
                            <li className="transition-all duration-300 ease-in-out w-full" style={{ transitionDelay: menuOpen ? '50ms' : '0ms' }}>
                                <Link
                                    href="#home"
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full py-2 px-3 text-text-base rounded-sm hover:bg-blue-base lg:hover:bg-transparent lg:hover:text-gold-base transition-colors duration-200"
                                >
                                    Home
                                </Link>
                            </li>
                            <li onClick={() => setMenuOpen(false)} className="transition-all duration-300 ease-in-out w-full" style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}>
                                <Link
                                    href="#services"
                                    className="block w-full py-2 px-3 text-text-base rounded-sm hover:bg-blue-base lg:hover:bg-transparent lg:hover:text-gold-base transition-colors duration-200"
                                >
                                    Services
                                </Link>
                            </li>
                            <li onClick={() => setMenuOpen(false)} className="transition-all duration-300 ease-in-out w-full" style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}>
                                <Link
                                    href="#about"
                                    className="block w-full py-2 px-3 text-text-base rounded-sm hover:bg-blue-base lg:hover:bg-transparent lg:hover:text-gold-base transition-colors duration-200"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li onClick={() => setMenuOpen(false)} className="transition-all duration-300 ease-in-out w-full" style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}>
                                <Link
                                    href="#contact"
                                    className="block w-full py-2 px-3 text-text-base rounded-sm hover:bg-blue-base lg:hover:bg-transparent lg:hover:text-gold-base transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </li>
                             
                        </ul>
                    </div>
            </nav>
        </header>
    );
};

export default Navigation;