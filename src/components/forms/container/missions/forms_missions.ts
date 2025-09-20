import { z } from "zod";
import { CreateMissionDto, UpdateMissionDto } from "../types/missions";

// Default values for create form
export const missionCreateDefaultValues: CreateMissionDto = {
  title: "",
  description: "",
  reward: 0,
  difficulty: "",
  createdAt: "",
};

// Default values for update form
export const missionUpdateDefaultValues: UpdateMissionDto = {
  title: "",
  description: "",
  reward: 0,
  difficulty: "",
};

// Zod schema for create and update
export const missionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  reward: z.number().min(0, "Reward cannot be negative").optional(),
  difficulty: z.string().optional(),
  createdAt: z.string().optional(),
});

// For create, enforce required fields
export const missionCreateSchema = missionSchema.required({
  title: true,
  description: true,
});

// For update, all fields are optional
export const missionUpdateSchema = missionSchema.partial();