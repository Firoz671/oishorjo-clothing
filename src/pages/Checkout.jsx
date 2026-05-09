import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PageTransition from '../components/PageTransition';

const Checkout = () => {
  const { cart, getCartCount, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // If cart is empty and order not complete, redirect to collections
  if (cart.length === 0 && !orderComplete) {
    return <Navigate to="/collections" replace />;
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150; // 150 BDT flat shipping, free over 5000
  const total = subtotal + shipping;

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock processing time
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <PageTransition>
        <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full text-center border border-brand-cream/10 bg-brand-charcoal/20 p-12">
            <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-playfair text-4xl text-brand-cream mb-4">Order Confirmed</h1>
            <p className="font-sans text-brand-cream/70 mb-8 leading-relaxed">
              Thank you for shopping with Oishorjo. Your order has been placed successfully and will be processed shortly.
            </p>
            <Link 
              to="/"
              className="inline-block border border-brand-gold text-brand-gold px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-brand-black transition-colors duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl text-brand-cream mb-12">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left: Form */}
            <div className="w-full lg:w-[60%]">
              <form onSubmit={handleCheckout} className="space-y-10">
                {/* Contact Info */}
                <section>
                  <h2 className="font-sans text-xl text-brand-cream mb-6 border-b border-brand-cream/10 pb-4">Contact Information</h2>
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="+880"
                      />
                    </div>
                  </div>
                </section>

                {/* Shipping Info */}
                <section>
                  <h2 className="font-sans text-xl text-brand-cream mb-6 border-b border-brand-cream/10 pb-4">Shipping Address</h2>
                  <div className="space-y-4 font-sans">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">First Name</label>
                        <input type="text" required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Last Name</label>
                        <input type="text" required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Address</label>
                      <input type="text" required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" placeholder="Apartment, suite, etc." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">City</label>
                        <input type="text" required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Postal Code</label>
                        <input type="text" required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment Info */}
                <section>
                  <h2 className="font-sans text-xl text-brand-cream mb-6 border-b border-brand-cream/10 pb-4">Payment Method</h2>
                  <div className="bg-brand-charcoal/30 border border-brand-cream/20 p-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="form-radio text-brand-gold bg-transparent border-brand-cream/50 focus:ring-brand-gold h-4 w-4" />
                      <span className="text-brand-cream font-sans">Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </section>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full font-sans font-bold uppercase tracking-[0.2em] py-5 transition-all duration-300 ${
                    isProcessing 
                      ? 'bg-brand-cream text-brand-black opacity-70 cursor-not-allowed' 
                      : 'bg-brand-gold text-brand-black hover:bg-brand-cream'
                  }`}
                >
                  {isProcessing ? 'Processing Order...' : 'Complete Order'}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-brand-charcoal/20 border border-brand-cream/10 p-6 md:p-8 sticky top-32">
                <h2 className="font-sans text-xl text-brand-cream mb-6 border-b border-brand-cream/10 pb-4">Order Summary</h2>
                
                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-brand-black shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center z-10">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h3 className="font-sans text-sm text-brand-cream line-clamp-1">{item.name}</h3>
                        <p className="font-mono text-xs text-brand-cream/50 mt-1 uppercase">Size: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-end">
                        <p className="font-mono text-sm text-brand-cream">
                          ৳ {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 font-mono text-sm border-t border-brand-cream/10 pt-6">
                  <div className="flex justify-between text-brand-cream/80">
                    <span className="uppercase tracking-widest">Subtotal</span>
                    <span>৳ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-cream/80">
                    <span className="uppercase tracking-widest">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `৳ ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-brand-gold text-lg pt-4 border-t border-brand-cream/10">
                    <span className="uppercase tracking-widest font-sans font-bold">Total</span>
                    <span>৳ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
