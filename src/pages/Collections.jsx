import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';

const Collections = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Men', 'Women', 'Unisex', 'New Arrivals'];

  const filteredProducts = products.filter(product => {
    if (filter === 'All') return true;
    if (filter === 'New Arrivals') return product.tag === 'New Arrival';
    return product.category === filter;
  });

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

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-cream/10"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 text-brand-cream/50 font-mono">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Collections;
