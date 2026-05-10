import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import productService from '../api/productService';

const Collections = () => {
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const categories = ['All', 'Men', 'Women', 'Unisex', 'New Arrivals'];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const params = filter !== 'All' ? { category: filter } : {};
        // If filter is New Arrivals, we might map that to a tag parameter
        if (filter === 'New Arrivals') {
            delete params.category;
            params.tag = 'New Arrival';
        }
        
        const res = await productService.getAllProducts(params);
        if (res.success) {
          setProducts(res.data.products || res.data); // depending on how backend wraps it
        }
      } catch {
        setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="font-playfair text-5xl md:text-7xl text-brand-cream mb-6">Collections</h1>
            <p className="font-mono text-brand-cream/60 max-w-xl mx-auto">
              Explore our complete range of garments. Each piece is meticulously crafted to tell a story of heritage and modernity.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 border font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                  filter === cat 
                    ? 'border-brand-gold bg-brand-gold text-brand-black' 
                    : 'border-brand-cream/20 text-brand-cream hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-center py-12 text-red-500 font-sans">
              {error}
            </div>
          )}

          {isLoading ? (
             <div className="flex justify-center py-24">
               <div className="animate-spin h-8 w-8 border-4 border-brand-gold border-t-transparent rounded-full"></div>
             </div>
          ) : (
            <>
              {/* Grid */}
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-cream/10"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>

              {products.length === 0 && !error && (
                <div className="text-center py-24 text-brand-cream/50 font-mono">
                  No products found in this category.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Collections;
