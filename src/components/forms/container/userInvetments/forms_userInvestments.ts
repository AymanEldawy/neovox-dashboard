// @ts-nocheck
import { z } from "zod";
import { CreateUserInvestmentDto, UpdateUserInvestmentDto } from "../types/userInvestments";

// Default values for create form
export const userInvestmentCreateDefaultValues: CreateUserInvestmentDto = {
  userId: "",
  planId: "",
  amount: 0,
  investedAt: "",
  status: "",
};

// Default values for update form
export const userInvestmentUpdateDefaultValues: UpdateUserInvestmentDto = {
  amount: 0,
  status: "",
};

// Zod schema for create and update
export const userInvestmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  planId: z.string().min(1, "Plan ID is required"),
  amount: z.number().min(0, "Amount cannot be negative"),
  investedAt: z.string().optional(),
  status: z.string().optional(),
});

// For create, enforce required fields
export const userInvestmentCreateSchema = userInvestmentSchema.required({
  userId: true,
  planId: true,
  amount: true,
});

// For update, all fields are optional
export const userInvestmentUpdateSchema = userInvestmentSchema.partial();