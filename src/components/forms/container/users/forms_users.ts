// @ts-nocheck
import { z } from "zod";
import { CreateUserDto, UpdateUserDto } from "../types/users";

// Default values for create form
export const userCreateDefaultValues: CreateUserDto = {
  username: "",
  email: "",
  password: "",
  role: "",
  createdAt: "",
};

// Default values for update form
export const userUpdateDefaultValues: UpdateUserDto = {
  username: "",
  email: "",
  password: "",
  role: "",
};

// Zod schema for create and update
export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional(),
  createdAt: z.string().optional(),
});

// For create, enforce required fields
export const userCreateSchema = userSchema.required({
  username: true,
  email: true,
  password: true,
});

// For update, all fields are optional
export const userUpdateSchema = userSchema.partial();