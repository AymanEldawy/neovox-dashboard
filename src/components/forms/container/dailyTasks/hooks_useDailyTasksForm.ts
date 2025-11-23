// @ts-nocheck
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateDailyTaskDto, UpdateDailyTaskDto } from '@/types/types_dailyTasks';

// Zod schema for CreateDailyTask
const createDailyTaskSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  reward: z.number().min(0).optional(),
  dueDate: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

// Zod schema for UpdateDailyTask
const updateDailyTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  reward: z.number().min(0).optional(),
  dueDate: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

// Infer types from Zod schemas
type CreateDailyTaskFormData = z.infer<typeof createDailyTaskSchema>;
type UpdateDailyTaskFormData = z.infer<typeof updateDailyTaskSchema>;

// Default values for Create form
const createDefaultValues: CreateDailyTaskFormData = {
  userId: '',
  title: '',
  description: '',
  reward: undefined,
  dueDate: undefined,
  status: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateDailyTaskFormData = {
  title: undefined,
  description: undefined,
  reward: undefined,
  dueDate: undefined,
  status: undefined,
};

// Hook for Create DailyTask form
export const useCreateDailyTaskForm = () => {
  return useForm<CreateDailyTaskFormData>({
    resolver: zodResolver(createDailyTaskSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update DailyTask form
export const useUpdateDailyTaskForm = () => {
  return useForm<UpdateDailyTaskFormData>({
    resolver: zodResolver(updateDailyTaskSchema),
    defaultValues: updateDefaultValues,
  });
};