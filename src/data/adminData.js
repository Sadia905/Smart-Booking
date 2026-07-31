// Refined & Lightweight Mock Data for Admin Dashboard (Synced with Landing Page)

export const INITIAL_SERVICES = [
  {
    id: "SRV-101",
    name: "Meetup Table",
    category: "Restaurant",
    price: 299,
    availableSeats: 12,
    location: "Sylhet",
    duration: "2 Hours",
    imageUrl: "https://i.postimg.cc/TPzb5Cyt/meetup.jpg",
    galleryImages: ["https://i.postimg.cc/TPzb5Cyt/meetup.jpg"],
    shortDescription: "Exclusive reserved dining table at prime central Sylhet location.",
    fullDescription: "Reserve a private meetup table for business discussions, family gatherings, or casual dining with priority service and dedicated staff assistance.",
    features: ["Private Table", "Priority Service", "Free Wi-Fi", "Complimentary Welcome Drink"],
    includedItems: ["Table Reservation", "Welcome Drink", "Dedicated Server"],
    excludedItems: ["Food & Beverage Orders"],
    bookingRules: "Please arrive within 15 minutes of reservation time.",
    cancellationPolicy: "Full refund up to 12 hours prior to reservation.",
    status: "Active",
    isFeatured: true,
    createdAt: "2026-07-15"
  },
  {
    id: "SRV-102",
    name: "Grand Sylhet Meeting Room",
    category: "Business",
    price: 85,
    availableSeats: 30,
    location: "Sylhet",
    duration: "Per Hour",
    imageUrl: "https://i.postimg.cc/VNxt0DSB/grandsylhet.jpg",
    galleryImages: ["https://i.postimg.cc/VNxt0DSB/grandsylhet.jpg"],
    shortDescription: "Fully equipped corporate conference hall with 4K projector and high-speed Wi-Fi.",
    fullDescription: "Modern corporate meeting room designed for executive presentations, team workshops, and client pitches. Includes smart display screens, video conferencing gear, and coffee service.",
    features: ["4K Projection Screen", "Video Conferencing", "High-speed Fiber Wi-Fi", "Whiteboard & Markers"],
    includedItems: ["Room Rental", "AV Technician", "Coffee & Water Service"],
    excludedItems: ["Full Catering Packages"],
    bookingRules: "2 hours minimum reservation requirement.",
    cancellationPolicy: "Free cancellation up to 24 hours in advance.",
    status: "Active",
    isFeatured: true,
    createdAt: "2026-07-18"
  },
  {
    id: "SRV-103",
    name: "Movie Ticket",
    category: "Entertainment",
    price: 150,
    availableSeats: 45,
    location: "Grand Sylhet Cineplex",
    duration: "3 Hours",
    imageUrl: "https://i.postimg.cc/xdJHdWdP/movie.jpg",
    galleryImages: ["https://i.postimg.cc/xdJHdWdP/movie.jpg"],
    shortDescription: "Premium Dolby Atmos theater seat with complimentary popcorn & drink combo.",
    fullDescription: "Experience blockbusters in ultimate comfort. Enjoy recliner seating, 3D laser projection, crystal-clear audio surround sound, and snack service.",
    features: ["Dolby Atmos Audio", "Recliner Seating", "Laser 3D Projection"],
    includedItems: ["Theater Ticket", "Medium Popcorn", "Soft Drink"],
    excludedItems: ["3D Glasses (available at counter)"],
    bookingRules: "Tickets non-transferable 1 hour before showtime.",
    cancellationPolicy: "Full refund 4 hours prior to showtime.",
    status: "Active",
    isFeatured: true,
    createdAt: "2026-07-20"
  },
  {
    id: "SRV-104",
    name: "Noorjahan Hotel",
    category: "Hotel",
    price: 899,
    availableSeats: 4,
    location: "Sylhet",
    duration: "Per Night",
    imageUrl: "https://i.postimg.cc/hGzxGHG5/noorjahan.avif",
    galleryImages: ["https://i.postimg.cc/hGzxGHG5/noorjahan.avif"],
    shortDescription: "Luxury deluxe suite with city view, king bed, and complimentary breakfast buffet.",
    fullDescription: "Indulge in unmatched hospitality at Noorjahan Hotel. Featuring spacious air-conditioned suites, marble bathrooms, flat-screen Smart TVs, 24/7 room service, and complimentary buffet breakfast.",
    features: ["King Size Bed", "City View Balcony", "Buffet Breakfast", "Free Airport Shuttle"],
    includedItems: ["Deluxe Suite Stay", "Daily Breakfast", "Wi-Fi & Parking"],
    excludedItems: ["Laundry Service", "Mini-bar Consumables"],
    bookingRules: "Check-in 2:00 PM, Check-out 12:00 PM.",
    cancellationPolicy: "Free cancellation up to 48 hours prior to check-in.",
    status: "Active",
    isFeatured: true,
    createdAt: "2026-07-22"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK-9001",
    customerName: "Sophia Martinez",
    customerEmail: "sophia.m@gmail.com",
    customerPhone: "+1 (555) 234-5678",
    serviceId: "SRV-101",
    serviceName: "Meetup Table",
    bookingDate: "2026-08-05",
    bookingTime: "18:00",
    seats: 2,
    totalPrice: 598,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-07-31 18:22"
  },
  {
    id: "BK-9002",
    customerName: "Ethan Vance",
    customerEmail: "ethan.vance@techcorp.io",
    customerPhone: "+1 (555) 876-5432",
    serviceId: "SRV-102",
    serviceName: "Grand Sylhet Meeting Room",
    bookingDate: "2026-08-08",
    bookingTime: "14:00",
    seats: 4,
    totalPrice: 340,
    paymentStatus: "Paid",
    bookingStatus: "Pending",
    createdAt: "2026-07-31 16:45"
  },
  {
    id: "BK-9003",
    customerName: "Marcus Sterling",
    customerEmail: "marcus.sterling@outlook.com",
    customerPhone: "+1 (555) 345-6789",
    serviceId: "SRV-104",
    serviceName: "Noorjahan Hotel",
    bookingDate: "2026-08-12",
    bookingTime: "15:00",
    seats: 1,
    totalPrice: 899,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-07-31 14:10"
  },
  {
    id: "BK-9004",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@designstudio.co",
    customerPhone: "+1 (555) 901-2345",
    serviceId: "SRV-103",
    serviceName: "Movie Ticket",
    bookingDate: "2026-08-02",
    bookingTime: "19:30",
    seats: 3,
    totalPrice: 450,
    paymentStatus: "Unpaid",
    bookingStatus: "Pending",
    createdAt: "2026-07-31 11:30"
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: "FB-301",
    customerName: "Sarah Jenkins",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    serviceId: "SRV-101",
    serviceName: "Meetup Table",
    rating: 5,
    review: "The booking process was incredibly smooth. I found the perfect ocean view suite in minutes. Highly recommend using this platform for all travel needs!",
    date: "2026-07-30",
    status: "Displayed"
  },
  {
    id: "FB-302",
    customerName: "Michael Chen",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    serviceId: "SRV-102",
    serviceName: "Grand Sylhet Meeting Room",
    rating: 5,
    review: "Scheduling client dinners and events used to be a headache. Now, it's just a few clicks. The automated reminders are a lifesaver for my busy schedule.",
    date: "2026-07-29",
    status: "Displayed"
  },
  {
    id: "FB-303",
    customerName: "Emily Rodriguez",
    customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    serviceId: "SRV-104",
    serviceName: "Noorjahan Hotel",
    rating: 4,
    review: "I booked a hotel room through here and the experience was flawless. The platform gave me all the details I needed upfront without any hidden fees.",
    date: "2026-07-28",
    status: "Displayed"
  }
];

export const INITIAL_SETTINGS = {
  general: {
    websiteName: "SmartBooking Admin",
    adminEmail: "admin@smartbooking.io",
    contactNumber: "+1 (800) 555-BOOK",
    businessAddress: "750 Innovation Way, San Francisco, CA 94107"
  },
  branding: {
    logoUrl: "https://i.postimg.cc/TPzb5Cyt/meetup.jpg",
    faviconUrl: "https://i.postimg.cc/TPzb5Cyt/meetup.jpg",
    primaryColor: "#4F46E5",
    secondaryColor: "#0ea5e9"
  },
  bookingSettings: {
    defaultSeatLimit: 10,
    autoConfirmation: true,
    allowCancellation: true,
    cancellationTimeLimitHours: 24
  },
  notificationSettings: {
    emailNotifications: true,
    bookingAlerts: true,
    feedbackAlerts: true
  },
  theme: {
    mode: "light"
  }
};
