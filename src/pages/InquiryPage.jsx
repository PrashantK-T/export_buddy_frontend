import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { CheckCircle2, MessageSquare } from 'lucide-react';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;
const WHATSAPP_NUMBER = '+918898537085';

const InquiryPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    business_name: '',
    email: '',
    phone: '',
    product_category: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
    const productParam = searchParams.get('product');
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        description: `I am interested in: ${productParam}\n\n`,
      }));
    }
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/inquiries`, formData);
      setSubmitted(true);
      toast.success('Inquiry submitted successfully!');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    }
    setLoading(false);
  };

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `New Inquiry from Import Buddy Website\n\nName: ${formData.customer_name}\nBusiness: ${formData.business_name || 'N/A'}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCategory: ${formData.product_category}\n\nDetails:\n${formData.description}`
    );
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-6 text-center" data-testid="success-message">
          <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-primary mb-6">
            Thank You!
          </h1>
          <p className="text-base md:text-lg leading-relaxed tracking-wide text-muted-foreground mb-8">
            Your inquiry has been submitted successfully. We will review your requirements and get back to you within 24 hours.
          </p>
          <div className="bg-white border border-slate-200 p-8 rounded-sm mb-8">
            <MessageSquare className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-4">Need Immediate Assistance?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Contact us directly on WhatsApp for faster response
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                data-testid="whatsapp-contact-button"
                className="bg-[#25D366] text-white hover:bg-[#20BA5A] h-12 px-8 uppercase tracking-wider font-bold rounded-sm"
              >
                Contact on WhatsApp
              </Button>
            </a>
          </div>
          <Button
            data-testid="back-home-button"
            onClick={() => navigate('/')}
            className="bg-white text-primary border-2 border-primary hover:bg-slate-50 h-12 px-8 uppercase tracking-wider font-bold rounded-sm"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-6" data-testid="inquiry-page-title">
            Get a Quote
          </h1>
          <p className="text-base md:text-lg leading-relaxed tracking-wide opacity-90 max-w-2xl">
            Tell us what you need, and we'll provide pricing and availability within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-sm">
          <form onSubmit={handleSubmit} data-testid="inquiry-form">
            <div className="space-y-6">
              <div>
                <Label htmlFor="customer_name" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                  Your Name *
                </Label>
                <Input
                  id="customer_name"
                  data-testid="customer-name-input"
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => handleChange('customer_name', e.target.value)}
                  className="h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="business_name" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                  Business Name (Optional)
                </Label>
                <Input
                  id="business_name"
                  data-testid="business-name-input"
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleChange('business_name', e.target.value)}
                  className="h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                  placeholder="Your company name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    data-testid="email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    data-testid="phone-input"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="product_category" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                  Product Category *
                </Label>
                <Select
                  required
                  value={formData.product_category}
                  onValueChange={(value) => handleChange('product_category', value)}
                >
                  <SelectTrigger
                    data-testid="category-select"
                    className="h-12 bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} data-testid={`category-option-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other" data-testid="category-option-other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-bold tracking-wider uppercase text-primary mb-2 block">
                  Product Details & Requirements *
                </Label>
                <Textarea
                  id="description"
                  data-testid="description-textarea"
                  required
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="min-h-[150px] bg-white border-slate-300 focus:border-accent focus:ring-1 focus:ring-accent rounded-sm"
                  placeholder="Please describe the product(s) you need, quantity, specifications, and any other requirements..."
                />
              </div>

              <div className="pt-4">
                <Button
                  data-testid="submit-inquiry-button"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 uppercase tracking-wider font-bold rounded-sm shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </div>

              <p className="text-sm text-center text-muted-foreground pt-4">
                We respond to all inquiries within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
