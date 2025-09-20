import { z } from "zod";
import { CreateUserBadgeDto, UpdateUserBadgeDto } from "../types/userBadges";

// Default values for create form
export const userBadgeCreateDefaultValues: CreateUserBadgeDto = {
  userId: "",
  badgeId: "",
  awardedAt: "",
};

// Default values for update form
export const userBadgeUpdateDefaultValues: UpdateUserBadgeDto = {
  awardedAt: "",
};

// Zod schema for create and update
export const userBadgeSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  badgeId: z.string().min(1, "Badge ID is required"),
  awardedAt: z.string().optional(),
});

// For create, enforce required fields
export const userBadgeCreateSchema = userBadgeSchema.required({
  userId: true,
  badgeId: true,
});

// For update, all fields are optional
export const userBadgeUpdateSchema = userBadgeSchema.partial();