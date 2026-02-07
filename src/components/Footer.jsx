import React from 'react';
import { Ship, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Ship className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold tracking-tight font-heading">
                IMPORT BUDDY
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Your trusted partner for importing quality products from China and Gulf Nations to India.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider font-heading">QUICK LINKS</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors" data-testid="footer-home-link">
                Home
              </Link>
              <Link to="/products" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors" data-testid="footer-products-link">
                Products
              </Link>
              <Link to="/inquiry" className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors" data-testid="footer-inquiry-link">
                Get Quote
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider font-heading">CONTACT US</h3>
            <div className="flex flex-col gap-4">
              <a href="tel:+918898537085" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors" data-testid="footer-phone-link">
                <Phone className="w-4 h-4" />
                +91 88985 37085
              </a>
              <a href="https://wa.me/918898537085" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 hover:text-accent transition-colors" data-testid="footer-whatsapp-link">
                <Phone className="w-4 h-4" />
                WhatsApp: +91 88985 37085
              </a>
              <div className="flex items-center gap-3 text-sm opacity-90">
                <MapPin className="w-4 h-4" />
                India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Import Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
