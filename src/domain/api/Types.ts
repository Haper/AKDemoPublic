export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  availabilityStatus: string;
  images: string[];
  reviews: Review[];
};

export type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type UserRoleType = 'admin' | 'moderator' | 'user';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  role: UserRoleType;
  company: {
    name: string;
    title: string;
    department: string;
  };
  address: {
    country: string;
  };
};

export type Users = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type LoginType = {
  username: string;
  password: string;
};

export type POSTResponseType = {
  success: boolean;
};

export type RegisterType = {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  confirmPassword: string
  email: string,
  phone: string,
};

export type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
};

export type NewMessage = {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
};
