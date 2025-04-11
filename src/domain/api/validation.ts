import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const registerSchema = z.object({
  salutation: z.enum(['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.', 'Prof.']),
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'Username is required').min(4, 'Username must be at least 4 characters long'),
  password: z.string().min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(passwordComplexityRegex, 'Password should contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string().min(1, 'Password is required'),
  email: z.string().min(1, 'Email is required')
    .email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required')
    .regex(phoneRegex, 'Wrong phone number format'),

}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords are not the same',
  path: ['confirmPassword'],
});

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z.string().email('Invalid email').optional()
  ),
  message: z.string().min(1, 'Message is required'),
});
