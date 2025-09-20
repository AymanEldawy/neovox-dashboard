import { z } from "zod";
import { CreateDailyTaskDto, UpdateDailyTaskDto } from "../types/dailyTasks";

// Default values for create form
export const dailyTaskCreateDefaultValues: CreateDailyTaskDto = {
  userId: "",
  title: "",
  description: "",
  reward: 0,
  dueDate: "",
  status: "",
};

// Default values for update form
export const dailyTaskUpdateDefaultValues: UpdateDailyTaskDto = {
  title: "",
  description: "",
  reward: 0,
  dueDate: "",
  status: "",
};

// Zod schema for create and update
export const dailyTaskSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  reward: z.number().min(0, "Reward cannot be negative").optional(),
  dueDate: z.string().optional(),
  status: z.string().optional(),
});

// For create, enforce required fields
export const dailyTaskCreateSchema = dailyTaskSchema.required({
  userId: true,
  title: true,
  description: true,
});

// For update, all fields are optional
export const dailyTaskUpdateSchema = dailyTaskSchema.partial();