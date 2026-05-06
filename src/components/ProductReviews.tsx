import React, { useState, useEffect } from 'react';
import { Star, User, Send, StarHalf, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../data';

interface ProductReviewsProps {
  productId: string;
  onReviewAdded?: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, onReviewAdded }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial mock reviews
  const mockReviews: Review[] = [
    {
      id: 'r1',
      productId: productId,
      userName: 'Alexander V.',
      rating: 5,
      comment: 'Exquisite craftsmanship. The gold detail is even more stunning in person.',
      date: '2026-04-15'
    },
    {
      id: 'r2',
      productId: productId,
      userName: 'Sophia M.',
      rating: 4,
      comment: 'Absolutely beautiful piece. Delivery was swift and the packaging was pure luxury.',
      date: '2026-04-20'
    }
  ];

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(mockReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(mockReviews));
    }
  }, [productId]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.userName) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const reviewToAdd: Review = {
        id: Date.now().toString(),
        productId,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedReviews = [reviewToAdd, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
      setNewReview({ rating: 5, comment: '', userName: '' });
      setIsSubmitting(false);
      if (onReviewAdded) onReviewAdded();
    }, 800);
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setNewReview({ ...newReview, rating: star })}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <Star
              size={interactive ? 20 : 14}
              className={`${
                star <= (hoverRating || (interactive ? newReview.rating : rating))
                  ? 'text-gold-500 fill-gold-500'
                  : 'text-gray-600'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-12 py-12 border-t border-gold-900/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="font-serif text-3xl text-white italic">Guest Experiences</h3>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Verified Purchases & Reviews</p>
        </div>
        
        <div className="flex items-center gap-6 bg-luxury-charcoal/50 p-6 rounded-2xl border border-gold-900/5">
          <div className="text-center">
            <span className="block text-4xl font-serif text-white">{averageRating.toFixed(1)}</span>
            <span className="text-[10px] text-gold-600 font-bold tracking-widest uppercase">Average Rating</span>
          </div>
          <div className="h-10 w-[1px] bg-gold-900/10" />
          <div className="space-y-2">
            {renderStars(Math.round(averageRating))}
            <span className="block text-[10px] text-gray-500 tracking-widest uppercase">{reviews.length} Total Reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Review Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-luxury-charcoal p-8 rounded-2xl border border-gold-900/10 space-y-6 sticky top-24">
            <h4 className="font-serif text-xl text-white italic">Share Your Thoughts</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gold-600 tracking-widest uppercase">Your Rating</label>
                {renderStars(0, true)}
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gold-600 tracking-widest uppercase">Name</label>
                <input
                  type="text"
                  required
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-luxury-black border border-gold-900/20 rounded-lg p-3 text-sm text-white focus:border-gold-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gold-600 tracking-widest uppercase">Review</label>
                <textarea
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full bg-luxury-black border border-gold-900/20 rounded-lg p-3 text-sm text-white focus:border-gold-500 outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-600 hover:bg-gold-500 disabled:bg-gold-900 disabled:cursor-not-allowed text-black font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-all tracking-[0.2em] text-[10px]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  SUBMIT REVIEW
                </>
              )}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-luxury-charcoal/30 p-8 rounded-2xl border border-gold-900/5 group hover:border-gold-900/20 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold-950 flex items-center justify-center border border-gold-900/20">
                      <User size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-white font-bold text-sm tracking-wide">{review.userName}</h5>
                        <div className="flex items-center gap-1 bg-gold-600/10 px-2 py-0.5 rounded-full border border-gold-600/20">
                          <Check size={8} className="text-gold-500" />
                          <span className="text-[7px] text-gold-500 font-bold tracking-widest uppercase">Verified</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 tracking-widest uppercase">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-light italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {reviews.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gold-900/10 rounded-2xl">
              <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
