import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateMissionDto, UpdateMissionDto } from '../types/missions';

// Zod schema for CreateMission
const createMissionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  reward: z.number().min(0).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  createdAt: z.string().optional(),
});

// Zod schema for UpdateMission
const updateMissionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  reward: z.number().min(0).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});

// Infer types from Zod schemas
type CreateMissionFormData = z.infer<typeof createMissionSchema>;
type UpdateMissionFormData = z.infer<typeof updateMissionSchema>;

// Default values for Create form
const createDefaultValues: CreateMissionFormData = {
  title: '',
  description: '',
  reward: undefined,
  difficulty: undefined,
  createdAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateMissionFormData = {
  title: undefined,
  description: undefined,
  reward: undefined,
  difficulty: undefined,
};

// Hook for Create Mission form
export const useCreateMissionForm = () => {
  return useForm<CreateMissionFormData>({
    resolver: zodResolver(createMissionSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update Mission form
export const useUpdateMissionForm = () => {
  return useForm<UpdateMissionFormData>({
    resolver: zodResolver(updateMissionSchema),
    defaultValues: updateDefaultValues,
  });
};