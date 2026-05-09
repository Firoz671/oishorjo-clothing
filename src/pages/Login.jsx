import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Login = () => {
  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="font-playfair text-4xl text-brand-cream mb-4">Welcome Back</h1>
            <p className="font-mono text-brand-cream/60 text-sm">Sign in to your Oishorjo account</p>
          </div>

          <div className="border border-brand-cream/10 bg-brand-charcoal/20 p-8">
            <form className="space-y-6 font-sans">
              <div>
                <label htmlFor="email" className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-xs text-brand-cream/80 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-xs font-mono text-brand-cream/50 hover:text-brand-gold transition-colors">Forgot?</Link>
                </div>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="button"
                className="w-full bg-brand-gold text-brand-black font-sans font-bold uppercase tracking-[0.2em] py-4 hover:bg-brand-cream transition-colors duration-300 mt-4"
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="mt-8 text-center font-mono text-sm text-brand-cream/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-gold hover:text-brand-cream transition-colors underline decoration-brand-gold/30 underline-offset-4">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
