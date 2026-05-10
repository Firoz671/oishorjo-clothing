import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../api/orderService';
import PageTransition from '../components/PageTransition';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    postal_code: '',
  });

  // If cart is empty, redirect to collections
  if (cart.length === 0) {
    return <Navigate to="/collections" replace />;
  }

  // Must be logged in to checkout
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: '/checkout' }} />;
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150; // 150 BDT flat shipping, free over 5000
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const orderItems = cart.map((item) => ({
        product_id: item.product_id || item.id,
        size: item.size,
        quantity: item.quantity,
      }));

      const shippingAddress = {
        street: formData.street,
        city: formData.city,
        district: formData.district,
        postal_code: formData.postal_code
      };

      const res = await orderService.placeOrder(orderItems, shippingAddress, 'COD');
      
      if (res.success) {
        await clearCart();
        navigate(`/order-confirmation/${res.data.id}`);
      } else {
        setError(res.message || 'Order failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl text-brand-cream mb-12">Checkout</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 mb-8 font-sans text-sm">
              {error}
            </div>
          )}

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
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Address</label>
                      <input type="text" name="street" value={formData.street} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" placeholder="Apartment, suite, etc." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">District</label>
                        <input type="text" name="district" value={formData.district} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
                      </div>
                    </div>
                    <div>
                        <label className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Postal Code</label>
                        <input type="text" name="postal_code" value={formData.postal_code} onChange={handleInputChange} required className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors" />
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
                  className={`w-full flex items-center justify-center font-sans font-bold uppercase tracking-[0.2em] py-5 transition-all duration-300 ${
                    isProcessing 
                      ? 'bg-brand-cream text-brand-black opacity-70 cursor-not-allowed' 
                      : 'bg-brand-gold text-brand-black hover:bg-brand-cream'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-brand-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </span>
                  ) : 'Complete Order'}
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
