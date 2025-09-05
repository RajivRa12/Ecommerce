import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast({ title: 'Please enter an email', variant: 'destructive' });
      return;
    }

    try {
      // Try to insert into a `newsletter` table if Supabase is configured
      if (supabase && typeof supabase.from === 'function') {
        const { data, error } = await supabase.from('newsletter').insert([{ email: trimmed }]);
        if (error) {
          // fallback: store in localStorage
          const list = JSON.parse(localStorage.getItem('newsletter') || '[]');
          list.push({ email: trimmed, date: new Date().toISOString() });
          localStorage.setItem('newsletter', JSON.stringify(list));
          toast({ title: 'Subscribed (local)', description: 'Saved locally because newsletter table is unavailable.' });
        } else {
          toast({ title: 'Subscribed!', description: 'Thanks — check your inbox for updates.' });
        }
      } else {
        // No supabase client configured
        const list = JSON.parse(localStorage.getItem('newsletter') || '[]');
        list.push({ email: trimmed, date: new Date().toISOString() });
        localStorage.setItem('newsletter', JSON.stringify(list));
        toast({ title: 'Subscribed (local)', description: 'Saved locally.' });
      }
      setEmail('');
    } catch (err: any) {
      console.error('Subscribe error', err);
      toast({ title: 'Subscription failed', description: err?.message || 'An error occurred', variant: 'destructive' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-primary/10 via-white to-primary/5 text-gray-800">
      {/* Decorative top wave */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg className="block w-full h-8 md:h-12" viewBox="0 0 1440 54" preserveAspectRatio="none">
          <path d="M0,30 C120,60 360,0 720,30 C1080,60 1320,0 1440,30 L1440 54 L0 54 Z" fill="var(--card)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand and newsletter */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">E</div>
              <div>
                <h3 className="text-xl font-bold">PallaRajiv</h3>
                <p className="text-sm text-muted-foreground">Curated goods, delivered with care.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Join our newsletter for exclusive drops, deals, and style tips. No spam — ever.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-sm w-full bg-card p-1 rounded-lg shadow-sm">
              <Input
                aria-label="Subscribe email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-0 focus:ring-0"
              />
              <Button className="ml-2" size="sm" type="submit">
                Subscribe
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center gap-3 mt-6">
              <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a aria-label="YouTube" href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
                <li><Link to="/deals" className="hover:text-primary">Deals</Link></li>
                <li><Link to="/category/electronics" className="hover:text-primary">Electronics</Link></li>
                <li><Link to="/category/clothing" className="hover:text-primary">Clothing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Customer Care</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                <li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
                <li><Link to="/returns" className="hover:text-primary">Returns</Link></li>
                <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About</Link></li>
                <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
                <li><Link to="/press" className="hover:text-primary">Press</Link></li>
                <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal & Policies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
                <li><Link to="/cookies" className="hover:text-primary">Cookies</Link></li>
                <li><Link to="/safety" className="hover:text-primary">Safety</Link></li>
                <li><a href="#" className="hover:text-primary">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} PallaRajiv — All rights reserved.</div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-6 bg-white/90 rounded-sm flex items-center justify-center text-xs font-semibold">V</div>
              <div className="w-8 h-6 bg-white/90 rounded-sm flex items-center justify-center text-xs font-semibold">M</div>
              <div className="w-8 h-6 bg-white/90 rounded-sm flex items-center justify-center text-xs font-semibold">P</div>
            </div>
            <span className="hidden sm:inline">Secure payments • Fast delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
