import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';

const ProductCard = ({ product }) => {
  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="group relative overflow-hidden border border-slate-200 bg-white hover:border-accent/50 transition-colors duration-300 flex flex-col"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-primary mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium tracking-wider uppercase text-accent">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {product.origin_country}
          </div>
        </div>
        <Link to={`/inquiry?product=${encodeURIComponent(product.name)}`}>
          <Button
            data-testid={`inquire-button-${product.id}`}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 uppercase tracking-wider font-bold text-sm rounded-sm"
          >
            Inquire Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
