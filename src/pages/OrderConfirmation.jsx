import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../api/orderService';
import PageTransition from '../components/PageTransition';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderById(id);
        if (response.success) {
          setOrder(response.data);
        } else {
          setError(response.message || 'Failed to load order details');
        }
      } catch (err) {
        setError('Error loading order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-brand-black min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-brand-black min-h-screen pt-32 pb-24 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-playfair text-3xl text-brand-cream mb-4">Oops!</h1>
          <p className="font-sans text-brand-cream/70 mb-8">{error || 'Order not found'}</p>
          <Link to="/" className="inline-block border border-brand-gold text-brand-gold px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-3xl w-full border border-brand-cream/10 bg-brand-charcoal/20 p-8 md:p-12">
          
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-playfair text-4xl text-brand-cream mb-2">Order Confirmed</h1>
            <p className="font-sans text-brand-cream/70">Thank you for your purchase.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 border-t border-brand-cream/10 pt-8">
            <div>
              <h2 className="font-sans text-sm text-brand-cream/50 uppercase tracking-widest mb-4">Order Details</h2>
              <div className="space-y-2 font-mono text-sm text-brand-cream">
                <p><span className="text-brand-cream/50">Order ID:</span> #{order.id}</p>
                <p><span className="text-brand-cream/50">Date:</span> {new Date(order.created_at).toLocaleDateString()}</p>
                <p className="flex items-center gap-2">
                  <span className="text-brand-cream/50">Status:</span> 
                  <span className="bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded text-xs tracking-wider uppercase">
                    {order.order_status}
                  </span>
                </p>
                <p><span className="text-brand-cream/50">Payment:</span> {order.payment_method}</p>
              </div>

              <h2 className="font-sans text-sm text-brand-cream/50 uppercase tracking-widest mb-4 mt-8">Shipping To</h2>
              <div className="font-sans text-sm text-brand-cream/80 space-y-1">
                <p>{order.shipping_street}</p>
                <p>{order.shipping_city}, {order.shipping_district}</p>
                <p>{order.shipping_postal}</p>
              </div>
            </div>

            <div>
              <h2 className="font-sans text-sm text-brand-cream/50 uppercase tracking-widest mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <img src={item.current_product_image || item.product_image} alt={item.product_name} className="w-12 h-16 object-cover bg-brand-black" />
                      <div>
                        <p className="font-sans text-sm text-brand-cream line-clamp-1">{item.current_product_name || item.product_name}</p>
                        <p className="font-mono text-xs text-brand-cream/50">Size: {item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-brand-cream whitespace-nowrap">
                      ৳ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-cream/10 pt-4 space-y-2">
                <div className="flex justify-between items-center text-brand-cream/70 text-sm font-sans">
                  <span className="uppercase tracking-widest">Subtotal</span>
                  <span className="font-mono text-sm">৳ {Number(order.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-brand-gold pt-2">
                  <span className="font-sans uppercase tracking-widest font-bold">Total</span>
                  <span className="font-mono text-lg">৳ {Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-brand-cream/10 pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/collections"
              className="inline-block border border-brand-gold text-brand-gold px-12 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-brand-black transition-colors duration-300"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/orders"
              className="inline-block border border-brand-cream/20 text-brand-cream px-12 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:border-brand-cream hover:bg-brand-cream hover:text-brand-black transition-colors duration-300"
            >
              View All Orders
            </Link>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default OrderConfirmation;
