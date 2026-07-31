import React from 'react';
import { Utensils, Bed, Stethoscope, Sun, Plane, Ticket } from 'lucide-react';
import './BookingCategories.css';

const categories = [
  { id: 1, title: 'Restaurant', icon: Utensils, color: 'orange', description: 'Book a table' },
  { id: 2, title: 'Hotel', icon: Bed, color: 'blue', description: 'Find a room' },
  { id: 3, title: 'Doctor', icon: Stethoscope, color: 'green', description: 'Schedule visit' },
  { id: 4, title: 'Resort', icon: Sun, color: 'yellow', description: 'Holiday packages' },
  { id: 5, title: 'Flight', icon: Plane, color: 'purple', description: 'Book tickets' },
  { id: 6, title: 'Events', icon: Ticket, color: 'pink', description: 'Shows & concerts' },
];

const BookingCategories = () => {
  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title">What are you looking for?</h2>
          <p className="categories-subtitle">Discover and book from our wide range of services</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="category-card">
                <div className={`icon-container bg-${cat.color}-light`}>
                  <Icon className={`category-icon text-${cat.color}`} />
                </div>
                <h3 className="category-name">{cat.title}</h3>
                <p className="category-desc">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookingCategories;
