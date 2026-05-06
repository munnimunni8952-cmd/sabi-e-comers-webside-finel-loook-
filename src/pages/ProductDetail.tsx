import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, ShieldCheck, Truck, RotateCcw, ZoomIn, Zap, Share2, Facebook, Instagram, Link, Check, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductReviews from '../components/ProductReviews';
import { trackEvent } from '../services/fbPixelService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);

  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [copied, setCopied] = useState(false);
  const [avgRating, setAvgRating] = useState(4.5);
  const [reviewCount, setReviewCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadReviews = () => {
    if (!product) return;
    const savedReviews = localStorage.getItem(`reviews_${product.id}`);
    if (savedReviews) {
      const reviews = JSON.parse(savedReviews);
      setReviewCount(reviews.length);
      if (reviews.length > 0) {
        const avg = reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / reviews.length;
        setAvgRating(avg);
      }
    } else {
      setReviewCount(2);
      setAvgRating(4.5);
    }
  };

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
      loadReviews();
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-serif text-4xl text-white">Product Not Found</h1>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-gold-600 text-luxury-black px-8 py-3 text-xs font-bold tracking-widest"
        >
          BACK TO SHOP
        </button>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleBuyNow = () => {
    addToCart(product);
    trackEvent('AddToCart', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR'
    });
    trackEvent('InitiateCheckout', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR',
      num_items: 1
    });
    navigate('/checkout');
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this ${product.name} at Royale Luxe!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL for web links in the same way
        // Usually handled by copying link or mobile apps
        alert('To share on Instagram, please copy the link and paste it in your story or bio.');
        return;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const images = product.images || [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gold-600 text-[10px] font-bold tracking-widest uppercase mb-12 hover:text-gold-400 transition-colors"
      >
        <ChevronLeft size={16} /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            ref={containerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-[4/5] bg-luxury-charcoal overflow-hidden border border-gold-900/10 cursor-zoom-in"
          >
            <motion.div 
              animate={{ 
                scale: isZoomed ? 2 : 1,
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="w-full h-full"
            >
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <AnimatePresence>
              {!isZoomed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 right-6 bg-luxury-black/40 backdrop-blur-md p-3 rounded-full text-white/60 pointer-events-none"
                >
                  <ZoomIn size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`aspect-square bg-luxury-charcoal border transition-all duration-300 p-2 cursor-pointer ${
                  activeImage === img ? 'border-gold-400' : 'border-gold-900/10 hover:border-gold-400/50'
                }`}
              >
                <img 
                  src={img} 
                  className={`w-full h-full object-cover transition-all ${activeImage === img ? 'grayscale-0' : 'grayscale opacity-50'}`} 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-gold-600 text-[10px] font-bold tracking-[0.3em] uppercase">{product.category}</span>
              {product.tag && (
                <span className="bg-gold-600/10 text-gold-400 text-[8px] font-bold tracking-widest px-2 py-1 uppercase">{product.tag}</span>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <p className="text-gold-400 text-2xl font-medium tracking-widest">₹{product.price.toLocaleString('en-IN')}</p>
              <div className="h-4 w-[1px] bg-gold-900/20" />
              <div className="flex items-center gap-1.5">
                <Star size={12} className="text-gold-500 fill-gold-500" />
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  {avgRating.toFixed(1)} / 5.0 ({reviewCount} Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Description</h3>
            <p className="text-gray-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6 pt-6 border-t border-gold-900/10">
            {/* Share Section */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2">
                <Share2 size={12} className="text-gold-600" /> Share this product
              </span>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => shareOnSocial('facebook')}
                  className="bg-luxury-charcoal flex items-center gap-3 px-5 py-3 text-[10px] text-gray-300 hover:text-gold-400 border border-gold-900/10 transition-all rounded-full font-bold tracking-widest"
                  title="Share on Facebook"
                >
                  <Facebook size={14} />
                  <span>FACEBOOK</span>
                </button>
                <button 
                  onClick={() => shareOnSocial('instagram')}
                  className="bg-luxury-charcoal flex items-center gap-3 px-5 py-3 text-[10px] text-gray-300 hover:text-gold-400 border border-gold-900/10 transition-all rounded-full font-bold tracking-widest"
                  title="Share on Instagram"
                >
                  <Instagram size={14} />
                  <span>INSTAGRAM</span>
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="bg-luxury-charcoal flex items-center gap-3 px-5 py-3 text-[10px] text-gray-300 hover:text-gold-400 border border-gold-900/10 transition-all rounded-full font-bold tracking-widest min-w-[140px]"
                  title="Copy Link"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      <span className="text-green-500">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Link size={14} />
                      <span>COPY LINK</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button 
                onClick={() => {
                  addToCart(product);
                  trackEvent('AddToCart', {
                    content_name: product.name,
                    content_category: product.category,
                    content_ids: [product.id],
                    content_type: 'product',
                    value: product.price,
                    currency: 'INR'
                  });
                }}
                className="w-full bg-transparent border border-gold-600 text-gold-400 py-5 font-bold tracking-[0.3em] text-xs hover:bg-gold-600/10 transition-all flex items-center justify-center gap-4"
              >
                <ShoppingBag size={18} /> ADD TO SHOPPING BAG
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="w-full bg-gold-600 text-luxury-black py-5 font-bold tracking-[0.3em] text-xs hover:bg-gold-500 transition-all flex items-center justify-center gap-4 shadow-lg shadow-gold-600/10"
              >
                <Zap size={18} fill="currentColor" /> BUY IT NOW
              </button>

              <p className="text-center text-[10px] text-gray-500 tracking-widest uppercase">
                Free Express Shipping on this item
              </p>
            </div>
          </div>

          {/* Trust Badges Simple */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={24} className="text-gold-600" />
              <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Verified Original</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={24} className="text-gold-600" />
              <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Express Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw size={24} className="text-gold-600" />
              <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-24">
        <ProductReviews productId={product.id} onReviewAdded={loadReviews} />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-24 border-t border-gold-900/10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-gold-600 font-bold tracking-[0.4em] text-[10px] uppercase">You May Also Like</span>
              <h2 className="font-serif text-4xl text-white tracking-tight">Related Products</h2>
            </div>
            <button 
              onClick={() => navigate('/shop')}
              className="text-gold-400 border-b border-gold-400 pb-1 font-bold tracking-widest text-[10px] uppercase hover:text-gold-300 transition-colors"
            >
              View Full Collection
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
