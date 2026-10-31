export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  category: string;
  location: string;
  basePrice: number;
  totalSeats: number;
  bookedSeats: number;
  image: string;
}

export interface TicketType {
  name: string;
  price: number;
}

export interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export interface Registration {
  id: number;
  eventId: number;
  eventName: string;
  ticketType: string;
  attendees: Attendee[];
  couponCode: string;
  subtotal: number;
  discount: number;
  total: number;
  registrationDate: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
}
