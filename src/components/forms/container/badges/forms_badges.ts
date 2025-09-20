import { z } from "zod";
import { CreateBadgeDto, UpdateBadgeDto } from "../types/badges";

// Default values for create form
export const badgeCreateDefaultValues: CreateBadgeDto = {
  name: "",
  description: "",
  imageUrl: "",
  criteria: "",
  createdAt: "",
};

// Default values for update form
export const badgeUpdateDefaultValues: UpdateBadgeDto = {
  name: "",
  description: "",
  imageUrl: "",
  criteria: "",
};

// Zod schema for create and update
export const badgeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid URL").optional(),
  criteria: z.string().optional(),
  createdAt: z.string().optional(),
});

// For create, enforce required fields
export const badgeCreateSchema = badgeSchema.required({
  name: true,
  description: true,
});

// For update, all fields are optional
export const badgeUpdateSchema = badgeSchema.partial();