import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-cream border-t border-brand-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-playfair text-2xl tracking-widest block mb-4">OISHORJO</Link>
            <p className="font-mono text-sm text-brand-cream/70 mb-6">Wear Your Roots.<br/>Own Your Story.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-bold text-lg mb-6 text-brand-gold">Quick Links</h4>
            <ul className="space-y-4 font-sans text-sm text-brand-cream/80">
              <li><Link to="/collections" className="hover:text-brand-gold transition-colors">All Collections</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-sans font-bold text-lg mb-6 text-brand-gold">Customer Care</h4>
            <ul className="space-y-4 font-sans text-sm text-brand-cream/80">
              <li><Link to="#" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">Size Guide</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans font-bold text-lg mb-6 text-brand-gold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors font-mono text-sm uppercase tracking-widest">
                Instagram
              </a>
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors font-mono text-sm uppercase tracking-widest">
                Facebook
              </a>
              <a href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors font-mono text-sm uppercase tracking-widest">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-brand-cream/50">
          <p>© 2025 Oishorjo Clothing. Dhaka, Bangladesh.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="#" className="hover:text-brand-cream transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-brand-cream transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
