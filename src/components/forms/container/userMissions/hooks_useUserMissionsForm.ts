// @ts-nocheck
import * as z from 'zod';

// Zod schema for UserMission
export const userMissionSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  missionId: z.string().min(1, 'Mission ID is required'),
  status: z.enum(['active', 'completed', 'failed']).optional(),
  progress: z.number().min(0).max(100).optional(),
  assignedAt: z.string().optional(),
});

// Infer types from Zod schemas
export type UserMissionFormData = z.infer<typeof userMissionSchema>;

// Default values for  form
export const userMissionDefaultValues: UserMissionFormData = {
  userId: '',
  missionId: '',
  status: undefined,
  progress: undefined,
  assignedAt: undefined,
};
