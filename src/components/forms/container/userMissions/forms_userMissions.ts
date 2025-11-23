// @ts-nocheck
import { z } from "zod";
import { CreateUserMissionDto, UpdateUserMissionDto } from "../types/userMissions";

// Default values for create form
export const userMissionCreateDefaultValues: CreateUserMissionDto = {
  userId: "",
  missionId: "",
  status: "",
  progress: 0,
  assignedAt: "",
};

// Default values for update form
export const userMissionUpdateDefaultValues: UpdateUserMissionDto = {
  status: "",
  progress: 0,
};

// Zod schema for create and update
export const userMissionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  missionId: z.string().min(1, "Mission ID is required"),
  status: z.string().optional(),
  progress: z.number().min(0, "Progress cannot be negative").optional(),
  assignedAt: z.string().optional(),
});

// For create, enforce required fields
export const userMissionCreateSchema = userMissionSchema.required({
  userId: true,
  missionId: true,
});

// For update, all fields are optional
export const userMissionUpdateSchema = userMissionSchema.partial();