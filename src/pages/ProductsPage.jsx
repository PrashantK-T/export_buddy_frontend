import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Package } from 'lucide-react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import ProductCard from '../components/ProductCard';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log( process.env.REACT_APP_BACKEND_URL);

const API = `${BACKEND_URL}/api`;

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    fetchProducts(categoryParam);
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(['All', ...response.data.categories]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const url = category && category !== 'All'
        ? `${API}/products?category=${encodeURIComponent(category)}`
        : `${API}/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setIsSearching(false);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setLoading(true);
    try {
      const response = await axios.get(`${API}/products/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
    setLoading(false);
  };

  const displayProducts = isSearching ? searchResults : products;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-6" data-testid="products-page-title">
            Our Products
          </h1>
          <p className="text-base md:text-lg leading-relaxed tracking-wide opacity-90 max-w-2xl">
            Browse our extensive catalog or search for specific products. Don't see what you need? We can source it for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <form onSubmit={handleSearch} className="mb-12" data-testid="product-search-form">
          <div className="flex gap-4 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                data-testid="search-input"
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
              />
            </div>
            <Button
              data-testid="search-button"
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 uppercase tracking-wider font-bold rounded-sm"
            >
              Search
            </Button>
          </div>
          {isSearching && (
            <Button
              data-testid="clear-search-button"
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
                setSearchResults([]);
              }}
              className="mt-4 bg-white text-primary border border-slate-300 hover:bg-slate-50 h-10 px-6 text-sm"
            >
              Clear Search
            </Button>
          )}
        </form>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              data-testid={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 text-sm font-bold tracking-wider uppercase rounded-sm transition-all ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-white text-primary border border-slate-300 hover:border-accent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20" data-testid="loading-indicator">
            <Package className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-20" data-testid="no-products-found">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-primary mb-4">
              {isSearching ? `No products found for "${searchQuery}"` : 'Product Not Available?'}
            </h3>
            <p className="text-base text-muted-foreground mb-6 max-w-lg mx-auto">
              Don't worry! We can source any product you need from China or Gulf Nations.
            </p>
            <Link to="/inquiry">
              <Button
                data-testid="contact-for-product-button"
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 uppercase tracking-wider font-bold rounded-sm shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
