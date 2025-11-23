// @ts-nocheck
import { z } from "zod";
import { CreateReferralDto, UpdateReferralDto } from "../types/referrals";

// Default values for create form
export const referralCreateDefaultValues: CreateReferralDto = {
  referrerId: "",
  referredId: "",
  status: "",
  createdAt: "",
};

// Default values for update form
export const referralUpdateDefaultValues: UpdateReferralDto = {
  status: "",
};

// Zod schema for create and update
export const referralSchema = z.object({
  referrerId: z.string().min(1, "Referrer ID is required"),
  referredId: z.string().min(1, "Referred ID is required"),
  status: z.string().optional(),
  createdAt: z.string().optional(),
});

// For create, enforce required fields
export const referralCreateSchema = referralSchema.required({
  referrerId: true,
  referredId: true,
});

// For update, all fields are optional
export const referralUpdateSchema = referralSchema.partial();