import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden bg-brand-black">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
        <img 
          src="/images/hero_landscape_1778357024716.png" 
          alt="Oishorjo Editorial" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradients & Overlays */}
      <div className="absolute inset-0 bg-brand-black/20 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/40 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40 z-10"></div>
      <div className="absolute inset-0 bg-grain z-10 pointer-events-none opacity-50"></div>

      {/* Left Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-20">
        <motion.div 
          style={{ opacity, y: useTransform(scrollY, [0, 500], [0, -100]) }}
          className="flex flex-col items-start text-left max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="mb-6"
          >
            <h1 className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-[140px] text-brand-cream leading-[0.9] tracking-tight uppercase">
              Oishorjo
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-mono text-brand-cream tracking-[0.3em] uppercase text-xs md:text-sm max-w-md mb-12 pl-1"
          >
            Wear Your Roots. Own Your Story.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pl-1"
          >
            <Link 
              to="/collections" 
              className="inline-flex items-center justify-center border border-brand-cream text-brand-cream px-10 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-brand-cream hover:text-brand-black transition-all duration-500 backdrop-blur-sm bg-brand-black/20"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
