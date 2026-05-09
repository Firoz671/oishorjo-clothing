import { useState, useContext } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { CartContext } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams(); // Using slug as id in the route
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.slug === id);

  if (!product) {
    return <Navigate to="/collections" replace />;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    setIsAdding(true);
    addToCart(product, selectedSize);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs font-mono text-brand-cream/60 mb-8 uppercase tracking-widest">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/collections" className="hover:text-brand-gold transition-colors">Collections</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-brand-gold truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Image Left */}
            <div className="w-full md:w-[60%]">
              <div className="aspect-[3/4] bg-brand-charcoal overflow-hidden w-full relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-brand-black/80 backdrop-blur-sm text-brand-cream text-xs font-mono px-3 py-1 uppercase tracking-wider">
                    {product.tag}
                  </div>
                )}
              </div>
            </div>

            {/* Info Right */}
            <div className="w-full md:w-[40%] flex flex-col pt-8">
              <div className="mb-8 border-b border-brand-gold/20 pb-8">
                <h1 className="font-playfair text-4xl lg:text-5xl text-brand-cream mb-4">
                  {product.name}
                </h1>
                <p className="font-mono text-2xl text-brand-gold">
                  ৳ {product.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-10">
                <p className="font-sans text-brand-cream/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-sans text-sm tracking-widest text-brand-cream uppercase">Size</span>
                  <Link to="#" className="font-mono text-xs text-brand-cream/60 hover:text-brand-gold underline decoration-brand-cream/30">Size Guide</Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border flex items-center justify-center font-mono text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-brand-gold bg-brand-gold text-brand-black'
                          : 'border-brand-cream/20 text-brand-cream hover:border-brand-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`w-full py-5 font-sans tracking-[0.2em] uppercase text-sm transition-all duration-300 ${
                  isAdding 
                    ? 'bg-brand-cream text-brand-black border border-brand-cream' 
                    : 'bg-brand-gold text-brand-black border border-brand-gold hover:bg-transparent hover:text-brand-gold'
                }`}
              >
                {isAdding ? 'Added to Cart' : 'Add to Cart'}
              </motion.button>

              <div className="mt-12 space-y-4 font-mono text-xs text-brand-cream/60">
                <p>Free shipping on orders over ৳ 5000</p>
                <p>Delivery within 2-3 business days inside Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
