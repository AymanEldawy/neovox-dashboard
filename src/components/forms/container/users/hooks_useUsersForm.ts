// @ts-nocheck
import * as z from 'zod';

export const UserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.string().optional(),
});

// Infer types from Zod schemas
export type UserValidationSchema = z.infer<typeof UserSchema>;

export const userDefaultValues: UserValidationSchema = {
  username: '',
  email: '',
  password: '',
  role: undefined,
};