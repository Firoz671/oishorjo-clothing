import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const location = useLocation();
  const { getCartCount } = useContext(CartContext);

  const isHome = location.pathname === '/';
  const isScrolled = scrollPosition > 50;
  
  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    isHome && !isScrolled ? 'bg-transparent text-brand-cream' : 'bg-brand-black/95 backdrop-blur-md text-brand-cream border-b border-brand-cream/10'
  }`;

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-inherit">
                <Menu size={24} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-sans text-sm uppercase tracking-widest hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-center">
              <Link to="/" className="font-playfair text-2xl md:text-3xl tracking-[0.2em] font-bold">
                OISHORJO
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center justify-end space-x-6 flex-1">
              <button className="hidden sm:block hover:text-brand-gold transition-colors">
                <Search size={20} />
              </button>
              <Link to="/login" className="hidden sm:block hover:text-brand-gold transition-colors">
                <User size={20} />
              </Link>
              <button className="relative hover:text-brand-gold transition-colors">
                <ShoppingBag size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-black text-brand-cream"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <span className="font-playfair text-2xl tracking-[0.2em] font-bold">OISHORJO</span>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-8 mt-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="font-playfair text-4xl hover:text-brand-gold transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pb-8 font-mono text-sm text-brand-cream/50">
                <p>Wear Your Roots.</p>
                <p>Own Your Story.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
