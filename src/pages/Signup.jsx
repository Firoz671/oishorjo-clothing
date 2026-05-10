import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const name = `${firstName} ${lastName}`.trim();
      const res = await register(name, email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="font-playfair text-4xl text-brand-cream mb-4">Create Account</h1>
            <p className="font-mono text-brand-cream/60 text-sm">Join the Oishorjo community</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 mb-6 font-sans text-sm text-center">
              {error}
            </div>
          )}

          <div className="border border-brand-cream/10 bg-brand-charcoal/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="name@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-xs text-brand-cream/80 mb-2 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-black border border-brand-cream/20 px-4 py-3 text-brand-cream focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center bg-brand-gold text-brand-black font-sans font-bold uppercase tracking-[0.2em] py-4 transition-colors duration-300 mt-4 ${
                  isLoading ? 'opacity-70 cursor-not-allowed bg-brand-cream' : 'hover:bg-brand-cream'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-brand-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Up...
                  </span>
                ) : 'Sign Up'}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center font-mono text-sm text-brand-cream/60">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-gold hover:text-brand-cream transition-colors underline decoration-brand-gold/30 underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
