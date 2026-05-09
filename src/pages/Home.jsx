import PageTransition from '../components/PageTransition';
import HeroSection from '../components/HeroSection';
import MarqueeStrip from '../components/MarqueeStrip';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen">
        <HeroSection />
        <MarqueeStrip />

        {/* Featured Collection */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-playfair text-4xl text-brand-cream mb-4">Latest Arrivals</h2>
              <p className="font-mono text-brand-cream/60 text-sm">Curated selection from our newest drop.</p>
            </div>
            <a href="/collections" className="hidden md:inline-block font-sans text-brand-gold text-sm tracking-widest uppercase hover:text-brand-cream transition-colors">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-cream/10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <a href="/collections" className="inline-block border border-brand-gold text-brand-gold px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-brand-gold hover:text-brand-black transition-colors">
              View All
            </a>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-24 bg-brand-charcoal border-t border-brand-gold/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <blockquote className="font-playfair italic text-3xl md:text-5xl text-brand-gold leading-tight">
                  "Fashion is the armor to survive the reality of everyday life."
                </blockquote>
              </motion.div>
              
              <div className="hidden lg:block w-px h-32 bg-brand-gold/30"></div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1"
              >
                <p className="font-sans text-brand-cream/80 text-lg leading-relaxed mb-6">
                  Born in the vibrant chaos of Dhaka, Bangladesh, Oishorjo is a tribute to South Asian heritage reimagined for the global streets.
                </p>
                <p className="font-sans text-brand-cream/80 text-lg leading-relaxed">
                  We blend centuries-old craftsmanship with modern silhouettes. Each piece is a canvas, telling a story of resilience, culture, and unapologetic identity.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
