import { z } from "zod";
import { CreatePlanStateDto, UpdatePlanStateDto } from "../types/planStates";

// Default values for create form
export const planStateCreateDefaultValues: CreatePlanStateDto = {
  planId: "",
  status: "",
  updatedAt: "",
};

// Default values for update form
export const planStateUpdateDefaultValues: UpdatePlanStateDto = {
  status: "",
};

// Zod schema for create and update
export const planStateSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  status: z.string().min(1, "Status is required"),
  updatedAt: z.string().optional(),
});

// For create, enforce required fields
export const planStateCreateSchema = planStateSchema.required({
  planId: true,
  status: true,
});

// For update, all fields are optional
export const planStateUpdateSchema = planStateSchema.partial();