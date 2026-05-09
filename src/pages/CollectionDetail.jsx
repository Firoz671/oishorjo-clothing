import { useParams, Navigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const CollectionDetail = () => {
  const { slug } = useParams();
  
  // Create a mapping or unslugify function
  const collectionName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Here we'd normally fetch by collection slug, but we'll use a simple filter for mock data
  const collectionProducts = products.filter(p => p.collection.toLowerCase() === collectionName.toLowerCase() || p.collection.toLowerCase().includes(slug.split('-')[0].toLowerCase()));

  if (collectionProducts.length === 0) {
    return <Navigate to="/collections" replace />;
  }

  return (
    <PageTransition>
      <div className="bg-brand-black min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-b border-brand-gold/20 pb-8">
            <p className="font-mono text-brand-gold mb-4 uppercase tracking-widest text-sm">Collection</p>
            <h1 className="font-playfair text-5xl md:text-7xl text-brand-cream">{collectionName}</h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-cream/10">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CollectionDetail;
