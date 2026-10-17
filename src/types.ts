export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  category: 'Cooling' | 'Heating' | 'Refrigeration' | 'Emergency' | 'Air Quality';
  priceRange: string;
  responseSpeed: string;
  features: string[];
  commonIssues: string[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceId: string;
  propertyType: 'residential' | 'commercial';
  preferredDate: string;
  preferredTime: string;
  isEmergency: boolean;
  notes: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  date: string;
  comment: string;
  serviceDone: string;
}
