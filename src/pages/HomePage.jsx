import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Package, Globe, ShieldCheck, Truck, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage = () => {
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1761207850745-d41a776ef897?crop=entropy&cs=srgb&fm=jpg&q=85',
      span: 'md:col-span-6',
    },
    {
      name: 'Industrial Equipment',
      image: 'https://images.unsplash.com/photo-1761519609252-3b868e540398?crop=entropy&cs=srgb&fm=jpg&q=85',
      span: 'md:col-span-6',
    },
    {
      name: 'Furniture',
      image: 'https://images.unsplash.com/photo-1541085929911-dea736e9287b?crop=entropy&cs=srgb&fm=jpg&q=85',
      span: 'md:col-span-4',
    },
    {
      name: 'Fashion & Clothing',
      image: 'https://images.unsplash.com/photo-1766934587163-186d20bf3d40?crop=entropy&cs=srgb&fm=jpg&q=85',
      span: 'md:col-span-4',
    },
    {
      name: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1760072513457-651955c7074d?crop=entropy&cs=srgb&fm=jpg&q=85',
      span: 'md:col-span-4',
    },
  ];

  const services = [
    {
      icon: Search,
      title: 'Product Sourcing',
      description: 'We find the best suppliers and negotiate competitive prices for you.',
    },
    {
      icon: Package,
      title: 'Quality Assurance',
      description: 'Every product is inspected to meet international quality standards.',
    },
    {
      icon: Truck,
      title: 'Logistics & Delivery',
      description: 'End-to-end shipping and customs clearance handled by experts.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Browse Products',
      description: 'Explore our catalog or tell us what you need',
    },
    {
      number: '02',
      title: 'Submit Inquiry',
      description: 'Share your requirements and get a custom quote',
    },
    {
      number: '03',
      title: 'We Deliver',
      description: 'Sit back while we handle sourcing, quality checks, and shipping',
    },
  ];

  return (
    <div className="pt-20">
      <section
        className="relative h-[600px] md:h-[700px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1769144256207-bc4bb75b29db?crop=entropy&cs=srgb&fm=jpg&q=85)',
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase text-white mb-6">
            IMPORT FROM CHINA & GULF
          </h1>
          <p className="text-base md:text-lg leading-relaxed tracking-wide text-white/90 mb-8 max-w-2xl mx-auto">
            Your trusted partner for bulk and single-quantity imports. We handle sourcing, pricing, quality checks, and delivery to India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button
                data-testid="browse-products-button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 uppercase tracking-wider font-bold rounded-sm shadow-[4px_4px_0px_0px_#f97316] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                Browse Products
              </Button>
            </Link>
            <Link to="/inquiry">
              <Button
                data-testid="get-quote-button"
                className="bg-white text-primary border-2 border-primary hover:bg-slate-50 h-12 px-8 uppercase tracking-wider font-bold rounded-sm"
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white" data-testid="trust-bar-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
              <p className="text-sm tracking-wider uppercase text-muted-foreground">Products Sourced</p>
            </div>
            <div>
              <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary mb-2">100%</h3>
              <p className="text-sm tracking-wider uppercase text-muted-foreground">Quality Guaranteed</p>
            </div>
            <div>
              <Ship className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-sm tracking-wider uppercase text-muted-foreground">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-slate-50" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-primary">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-testid={`service-card-${index}`}
                className="p-8 bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl md:text-3xl font-semibold tracking-normal text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed tracking-wide text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Product Range</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-primary">
              What We Import
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                data-testid={`category-card-${index}`}
                className={`group relative overflow-hidden border border-slate-200 bg-white hover:border-accent/50 transition-colors duration-300 h-64 ${category.span}`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-normal text-white uppercase">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-slate-50" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Simple & Fast</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-primary">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} data-testid={`process-step-${index}`} className="text-center">
                <div className="text-6xl font-bold text-accent/20 mb-4">{step.number}</div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-normal text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed tracking-wide text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-6">
            Ready to Start Importing?
          </h2>
          <p className="text-base md:text-lg leading-relaxed tracking-wide opacity-90 mb-8">
            Tell us what you need, and we'll provide a custom quote within 24 hours.
          </p>
          <Link to="/inquiry">
            <Button
              data-testid="cta-submit-inquiry-button"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 uppercase tracking-wider font-bold rounded-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              Submit Inquiry
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
