import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative border-b border-r border-brand-cream/10 hover:bg-brand-charcoal/30 transition-colors duration-500 flex flex-col h-full"
    >
      <Link to={`/product/${product.slug}`} className="block h-full p-6 lg:p-8 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-charcoal mb-6 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-20 bg-brand-black text-brand-cream text-xs font-mono px-3 py-1 uppercase tracking-wider">
              {product.tag}
            </div>
          )}
        </div>
        
        {/* Text Container */}
        <div className="flex flex-col flex-grow justify-between mt-auto">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-sans font-medium text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="font-mono text-sm text-brand-cream whitespace-nowrap">
              ৳ {product.price.toLocaleString()}
            </p>
          </div>
          <p className="font-mono text-xs text-brand-cream/50 uppercase tracking-wider mt-2">
            {product.category}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
