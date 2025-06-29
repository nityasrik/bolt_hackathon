import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  MessageSquare, 
  Send, 
  ChevronLeft, 
  ChevronRight,
  ThumbsUp,
  Award,
  Smile
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    language: "French",
    tutor: "Pierre Dubois",
    feedback: "Pierre made learning French so enjoyable! His cooking metaphors helped me remember vocabulary, and the pronunciation practice was incredibly helpful. I went from zero French to having conversations in just 3 months!",
    date: "2 weeks ago",
    verified: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    avatar: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    language: "Korean",
    tutor: "Minjun Kim",
    feedback: "As a K-drama fan, learning with Minjun was perfect! He incorporated pop culture references that made everything click. The pronunciation feedback feature is amazing - I finally got the hang of Korean sounds!",
    date: "1 month ago",
    verified: true
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    language: "Spanish",
    tutor: "María González",
    feedback: "María's energy is contagious! She made me feel confident speaking Spanish from day one. The cultural insights she shares make the lessons so much richer. ¡Muchas gracias, María!",
    date: "3 weeks ago",
    verified: true
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    language: "French",
    tutor: "Pierre Dubois",
    feedback: "The AI tutors feel so real and personalized! Pierre remembers my progress and adjusts the difficulty perfectly. The speech recognition is spot-on, and I love the immediate feedback.",
    date: "1 week ago",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Wang",
    avatar: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 5,
    language: "Spanish",
    tutor: "María González",
    feedback: "This app revolutionized my language learning! The conversation practice feels natural, and the progress tracking keeps me motivated. I've tried many apps, but this one actually works!",
    date: "2 months ago",
    verified: true
  },
  {
    id: 6,
    name: "Alex Johnson",
    avatar: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
    rating: 4,
    language: "Korean",
    tutor: "Minjun Kim",
    feedback: "The cultural context Minjun provides is invaluable. Learning about Korean customs while practicing the language makes everything more meaningful. Highly recommend!",
    date: "5 days ago",
    verified: true
  }
];

const stats = {
  totalReviews: 15420,
  averageRating: 4.8,
  fiveStars: 78,
  fourStars: 18,
  threeStars: 3,
  twoStars: 1,
  oneStar: 0
};

export default function Feedback() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 5,
    language: '',
    tutor: '',
    feedback: '',
    name: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log('New review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, language: '', tutor: '', feedback: '', name: '' });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${i < rating ? 'fill-current' : ''} text-yellow-400`}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-6 sm:pt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">Community Feedback</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-slate-400">
            See what our learners are saying about their language learning journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-12 border border-slate-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 mr-1 sm:mr-2 text-yellow-400" />
                <span className="text-2xl sm:text-4xl font-bold text-white">{stats.averageRating}</span>
              </div>
              <p className="font-medium text-slate-400 text-xs sm:text-base">Average Rating</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 mr-1 sm:mr-2 text-blue-400" />
                <span className="text-2xl sm:text-4xl font-bold text-white">{stats.totalReviews.toLocaleString()}</span>
              </div>
              <p className="font-medium text-slate-400 text-xs sm:text-base">Total Reviews</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 mr-1 sm:mr-2 text-red-400" />
                <span className="text-2xl sm:text-4xl font-bold text-white">{stats.fiveStars}%</span>
              </div>
              <p className="font-medium text-slate-400 text-xs sm:text-base">5-Star Reviews</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 mr-1 sm:mr-2 text-purple-400" />
                <span className="text-2xl sm:text-4xl font-bold text-white">98%</span>
              </div>
              <p className="font-medium text-slate-400 text-xs sm:text-base">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-12 border border-slate-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">Rating Breakdown</h2>
          <div className="max-w-md mx-auto space-y-2 sm:space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center">
                <span className="w-6 sm:w-8 text-xs sm:text-sm font-medium text-white">{stars}</span>
                <div className="flex mr-2 sm:mr-3">
                  {renderStars(stars)}
                </div>
                <div className="flex-1 bg-slate-700 rounded-full h-1.5 sm:h-2 mr-2 sm:mr-3">
                  <div
                    className="h-1.5 sm:h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-cyan-400"
                    style={{
                      width: `${stats[`${['', '', '', 'one', 'two', 'three', 'four', 'five'][stars]}Stars`]}%`
                    }}
                  ></div>
                </div>
                <span className="w-6 sm:w-8 text-xs sm:text-sm text-slate-400">
                  {stats[`${['', '', '', 'one', 'two', 'three', 'four', 'five'][stars]}Stars`]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-12 border border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Featured Reviews</h2>
            <div className="flex gap-2 justify-center sm:justify-end">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full transition-all duration-300 bg-slate-700 text-blue-400 hover:bg-slate-600"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full transition-all duration-300 bg-slate-700 text-blue-400 hover:bg-slate-600"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  {testimonials[currentTestimonial].verified && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 mx-auto sm:mx-0 w-fit">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 gap-2">
                  <div className="flex justify-center sm:justify-start">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400">
                    Learning {testimonials[currentTestimonial].language} with {testimonials[currentTestimonial].tutor}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400">
                    {testimonials[currentTestimonial].date}
                  </span>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-blue-300">
                  "{testimonials[currentTestimonial].feedback}"
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentTestimonial ? 'bg-blue-400' : 'bg-slate-600'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">All Reviews</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-sm sm:text-base"
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Write a Review
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3 sm:mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{testimonial.name}</h3>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      {testimonial.verified && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-slate-700 text-blue-300">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="mb-3 sm:mb-4 leading-relaxed text-slate-300 text-sm sm:text-base">
                  "{testimonial.feedback}"
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-1">
                  <span className="text-blue-300">
                    {testimonial.language} • {testimonial.tutor}
                  </span>
                  <span className="text-slate-400">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-slate-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] border border-slate-700" style={{ overflowY: 'auto' }}>
              <div className="p-4 sm:p-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Write a Review</h2>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 text-white hover:bg-slate-600 text-lg"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white placeholder-slate-400 focus:border-blue-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Rating
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 sm:h-8 sm:w-8 ${star <= newReview.rating ? 'fill-current' : ''} text-yellow-400`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        Language
                      </label>
                      <select
                        value={newReview.language}
                        onChange={(e) => setNewReview({ ...newReview, language: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white focus:border-blue-400 text-sm sm:text-base"
                        required
                      >
                        <option value="">Select Language</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Korean">Korean</option>
                        <option value="Italian">Italian</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        Tutor
                      </label>
                      <input
                        type="text"
                        value={newReview.tutor}
                        onChange={(e) => setNewReview({ ...newReview, tutor: e.target.value })}
                        placeholder="e.g., Pierre Dubois"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors bg-slate-700/50 text-white placeholder-slate-400 focus:border-blue-400 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.feedback}
                      onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
                      rows={4}
                      placeholder="Share your experience with Voicenary..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-slate-600 focus:outline-none transition-colors resize-none bg-slate-700/50 text-white placeholder-slate-400 focus:border-blue-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 border border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 text-sm sm:text-base"
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}