import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-b border-brand-gold/20 pb-12 text-center">
            <p className="font-mono text-brand-gold mb-4 uppercase tracking-widest text-sm">Get in Touch</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-brand-cream">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-playfair text-3xl text-brand-cream mb-8">Send a Message</h2>
              <form className="space-y-6 font-sans">
                <div>
                  <label htmlFor="name" className="block text-sm text-brand-cream/80 mb-2 uppercase tracking-widest">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-transparent border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-brand-cream/80 mb-2 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-transparent border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-brand-cream/80 mb-2 uppercase tracking-widest">Message</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    className="w-full bg-transparent border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="button"
                  className="w-full bg-brand-gold text-brand-black font-sans font-medium uppercase tracking-[0.2em] py-4 hover:bg-transparent hover:text-brand-gold border border-brand-gold transition-all duration-300"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-playfair text-3xl text-brand-cream mb-8">Studio</h2>
                <div className="font-mono text-brand-cream/80 space-y-6">
                  <div>
                    <p className="text-brand-gold uppercase tracking-widest text-xs mb-2">Location</p>
                    <p>House 42, Road 7</p>
                    <p>Banani, Dhaka 1213</p>
                    <p>Bangladesh</p>
                  </div>
                  <div>
                    <p className="text-brand-gold uppercase tracking-widest text-xs mb-2">Email</p>
                    <p>hello@oishorjoclothing.com</p>
                  </div>
                  <div>
                    <p className="text-brand-gold uppercase tracking-widest text-xs mb-2">Phone</p>
                    <p>+880 1711 000 000</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 md:mt-0 p-8 border border-brand-gold/20 bg-brand-charcoal">
                <h3 className="font-playfair text-xl text-brand-gold mb-4">Stockists</h3>
                <p className="font-sans text-brand-cream/80 text-sm leading-relaxed mb-4">
                  Currently, our complete collection is only available online and at our flagship studio in Banani. For wholesale inquiries, please reach out via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
