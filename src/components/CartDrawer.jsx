import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartCount } = useContext(CartContext);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-charcoal z-[80] shadow-2xl flex flex-col border-l border-brand-cream/10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-brand-cream/10 bg-brand-black/50">
              <h2 className="font-playfair text-2xl text-brand-cream tracking-widest uppercase">
                Your Cart ({getCartCount()})
              </h2>
              <button onClick={onClose} className="text-brand-cream hover:text-brand-gold transition-colors p-2">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-cream/50 space-y-6">
                  <p className="font-mono text-sm uppercase tracking-widest">Your cart is empty.</p>
                  <button 
                    onClick={onClose}
                    className="border border-brand-cream/20 px-8 py-3 font-sans text-xs uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-24 h-32 bg-brand-black shrink-0 relative border border-brand-cream/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-sans text-sm text-brand-cream line-clamp-2 pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-brand-cream/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="font-mono text-xs text-brand-cream/50 mt-1 uppercase">Size: {item.size}</p>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-brand-cream/20 bg-brand-black">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-2 text-brand-cream/60 hover:text-brand-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-mono text-xs text-brand-cream w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-2 text-brand-cream/60 hover:text-brand-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="font-mono text-sm text-brand-gold">
                          ৳ {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-brand-cream/10 p-6 bg-brand-black/50">
                <div className="flex justify-between items-center mb-6 font-mono text-sm text-brand-cream">
                  <span className="uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg text-brand-gold">৳ {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-brand-cream/40 text-xs font-sans mb-6">Shipping & taxes calculated at checkout.</p>
                <Link 
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full text-center bg-brand-gold text-brand-black font-sans font-bold uppercase tracking-[0.2em] py-4 hover:bg-brand-cream transition-colors duration-300"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
