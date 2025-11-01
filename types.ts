export enum Page {
  Home = 'Home',
  Profile = 'Your Profile',
  Purchases = 'Your Pet Purchase List',
  About = 'About Us',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unknown = 'Unknown',
}

export interface CareInstructions {
  feeding: string;
  grooming: string;
  exercise: string;
  medicalNeeds: string;
}

export interface Location {
  city: string;
  state: string;
  distance?: number;
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  type: 'Dog' | 'Cat' | 'Parrot' | 'Rabbit' | 'Other';
  age: number;
  gender: Gender;
  location: Location;
  description: string;
  careInstructions: CareInstructions;
  photos: string[];
  sellerId: number;
}

export interface User {
  id: number;
  fullName: string;
  location: Location;
  contactNumber: string;
  shareId: string;
  listings: number[];
  purchaseHistory: number[];
}

export type Geolocation = {
  latitude: number;
  longitude: number;
};
