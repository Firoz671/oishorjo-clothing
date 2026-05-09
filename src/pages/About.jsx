import PageTransition from '../components/PageTransition';

const About = () => {
  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-b border-brand-gold/20 pb-12 text-center">
            <p className="font-mono text-brand-gold mb-4 uppercase tracking-widest text-sm">Our Story</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-brand-cream">The Oishorjo Ethos</h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none font-sans text-brand-cream/80 space-y-8">
            <p className="text-xl leading-relaxed text-brand-cream font-medium">
              Oishorjo (ঐশ্বর্য), meaning wealth or abundance in Bengali, is not about material riches. It is about the wealth of culture, the abundance of heritage, and the richness of our stories.
            </p>
            
            <p>
              Born in the vibrant chaos of Dhaka, Bangladesh, we observed a disconnect. Our generation was consuming global streetwear while our own rich textile history—Jamdani weaves, Nakshi Kantha embroidery, and vibrant Rickshaw art—was relegated to occasional traditional wear.
            </p>

            <div className="my-16 aspect-video bg-brand-charcoal relative overflow-hidden">
              <img 
                src="/images/about_studio_1778356158031.png" 
                alt="Dhaka Streets" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-brand-black/30"></div>
            </div>

            <h2 className="font-playfair text-3xl text-brand-gold mt-12 mb-6">Wear Your Roots</h2>
            
            <p>
              We decided to bridge this gap. Oishorjo is a luxury streetwear brand that takes the silhouettes of modern urban fashion—oversized tees, structured jackets, wide-leg trousers—and infuses them with the soul of South Asia.
            </p>

            <p>
              Every garment we create is a canvas. We work with local artisans to incorporate traditional motifs into contemporary designs. We use premium fabrics that withstand the monsoon humidity and the winter chill. We design for the global citizen who is unapologetically proud of where they come from.
            </p>

            <blockquote className="border-l-4 border-brand-gold pl-6 py-2 my-12 font-playfair italic text-2xl text-brand-cream">
              "We are not just selling clothes. We are documenting a cultural renaissance."
            </blockquote>

            <p>
              When you wear Oishorjo, you carry a piece of Dhaka with you. You wear your roots. You own your story.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
