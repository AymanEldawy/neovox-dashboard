// @ts-nocheck
import { z } from "zod";
import { CreateInvestmentPlanDto, UpdateInvestmentPlanDto } from "../types/investmentPlans";

// Default values for create form
export const investmentPlanCreateDefaultValues: CreateInvestmentPlanDto = {
  name: "",
  description: "",
  minAmount: 0,
  maxAmount: 0,
  returnRate: 0,
  duration: 0,
  createdAt: "",
};

// Default values for update form
export const investmentPlanUpdateDefaultValues: UpdateInvestmentPlanDto = {
  name: "",
  description: "",
  minAmount: 0,
  maxAmount: 0,
  returnRate: 0,
  duration: 0,
};

// Zod schema for create and update
export const investmentPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  minAmount: z.number().min(0, "Minimum amount cannot be negative"),
  maxAmount: z.number().min(0, "Maximum amount cannot be negative").optional(),
  returnRate: z.number().min(0, "Return rate cannot be negative"),
  duration: z.number().min(1, "Duration must be at least 1"),
  createdAt: z.string().optional(),
});

// For create, enforce required fields
export const investmentPlanCreateSchema = investmentPlanSchema.required({
  name: true,
  description: true,
  minAmount: true,
  returnRate: true,
  duration: true,
});

// For update, all fields are optional
export const investmentPlanUpdateSchema = investmentPlanSchema.partial();