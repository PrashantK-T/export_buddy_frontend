import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, Menu, X, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/products', label: 'PRODUCTS' },
    { path: '/inquiry', label: 'GET QUOTE' },
  ];

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <Ship className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold tracking-tight font-heading text-primary">
              IMPORT BUDDY
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/918898537085"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-whatsapp-link"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-sm hover:bg-[#20BA5A] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider">WHATSAPP</span>
            </a>
          </nav>

          <button
            data-testid="mobile-menu-button"
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border" data-testid="mobile-menu">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-primary hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/918898537085"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-nav-whatsapp-link"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-sm hover:bg-[#20BA5A] transition-colors mt-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider">CONTACT ON WHATSAPP</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
