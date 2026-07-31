import React from 'react';
import { Star, MapPin, ChevronRight } from 'lucide-react';
import './FeaturedServices.css';

const services = [
  {
    id: 1,
    title: 'Meetup Table',
    category: 'Restaurant',
    rating: 4.9,
    reviews: 128,
    price: '৳২৯৯',
    unit: '/table',
    location: 'Sylhet',
    image: 'https://i.postimg.cc/TPzb5Cyt/meetup.jpg',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Grand Sylhet Meeting Room',
    category: 'Business',
    rating: 4.8,
    reviews: 342,
    price: '৳৮৫',
    unit: '/hour',
    location: 'Sylhet',
    image: 'https://i.postimg.cc/VNxt0DSB/grandsylhet.jpg',
    color: 'orange'
  },
  {
    id: 3,
    title: 'Movie Ticket',
    category: 'Entertainment',
    rating: 4.9,
    reviews: 89,
    price: '৳১৫০',
    unit: '/ticket',
    location: 'Grand Sylhet Cineplex',
    image: 'https://i.postimg.cc/xdJHdWdP/movie.jpg',
    color: 'green'
  },
  {
    id: 4,
    title: 'Noorjahan Hotel',
    category: 'Hotel',
    rating: 5.0,
    reviews: 210,
    price: '৳৮৯৯',
    unit: '/night',
    location: 'Sylhet',
    image: 'https://i.postimg.cc/hGzxGHG5/noorjahan.avif',
    color: 'yellow'
  },
  {
    id: 5,
    title: 'Pansi Restaurant Table',
    category: 'Restaurant',
    rating: 4.7,
    reviews: 512,
    price: '৳৪৫০',
    unit: '/table',
    location: 'Sylhet',
    image: 'https://i.postimg.cc/zfshH0Lj/panshi.jpg',
    color: 'purple'
  },
  {
    id: 6,
    title: 'Grand Sultan Pool',
    category: 'Resort',
    rating: 4.9,
    reviews: 1024,
    price: '৳১২০',
    unit: '/person',
    location: 'Sreemangal',
    image: 'https://i.postimg.cc/0yHDP89w/grandsultan.jpg',
    color: 'pink'
  }
];

const FeaturedServices = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <div>
            <h2 className="services-title">Featured Services</h2>
            <p className="services-subtitle">Handpicked recommendations just for you</p>
          </div>
          <button className="btn btn-outline view-all-btn">
            View All <ChevronRight size={18} />
          </button>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card group">
              <div className="service-image-container">
                <img src={service.image} alt={service.title} className="service-image" />
                <div className="service-badge">
                  <Star className="star-icon" size={14} fill="currentColor" />
                  <span>{service.rating} ({service.reviews})</span>
                </div>
                <div className={`category-tag text-${service.color} bg-${service.color}-light`}>
                  {service.category}
                </div>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                
                <div className="service-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{service.location}</span>
                  </div>
                </div>

                <div className="service-footer">
                  <div className="service-price">
                    <span className="price-amount">{service.price}</span>
                    <span className="price-unit">{service.unit}</span>
                  </div>
                  <button className="btn btn-primary book-btn">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
