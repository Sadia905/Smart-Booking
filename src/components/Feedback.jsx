import React from 'react';
import { Star, Quote } from 'lucide-react';
import './Feedback.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Frequent Traveler',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: "The booking process was incredibly smooth. I found the perfect ocean view suite in minutes. Highly recommend using this platform for all travel needs!"
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: "Scheduling client dinners and events used to be a headache. Now, it's just a few clicks. The automated reminders are a lifesaver for my busy schedule."
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Wellness Enthusiast',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 4,
    text: "I booked a Bali retreat through here and the experience was flawless. The platform gave me all the details I needed upfront without any hidden fees."
  }
];

const Feedback = () => {
  return (
    <section className="feedback-section" id="reviews">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2 className="feedback-title">What Our Users Say</h2>
          <p className="feedback-subtitle">Don't just take our word for it, hear from our community</p>
        </div>

        <div className="feedback-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="feedback-card">
              <Quote className="quote-icon" size={40} />
              
              <div className="stars-container">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="star-icon" />
                ))}
              </div>
              
              <p className="feedback-text">"{item.text}"</p>
              
              <div className="feedback-author">
                <img src={item.image} alt={item.name} className="author-image" />
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
