// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Zod schema for CreateBadge
const createBadgeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Invalid URL').optional(),
  criteria: z.string().optional(),
  createdAt: z.string().optional(),
});

// Zod schema for UpdateBadge
const updateBadgeSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid URL').optional(),
  criteria: z.string().optional(),
});

// Infer types from Zod schemas
type CreateBadgeFormData = z.infer<typeof createBadgeSchema>;
type UpdateBadgeFormData = z.infer<typeof updateBadgeSchema>;

// Default values for Create form
const createDefaultValues: CreateBadgeFormData = {
  name: '',
  description: '',
  imageUrl: undefined,
  criteria: undefined,
  createdAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateBadgeFormData = {
  name: undefined,
  description: undefined,
  imageUrl: undefined,
  criteria: undefined,
};

// Hook for Create Badge form
export const useCreateBadgeForm = () => {
  return useForm<CreateBadgeFormData>({
    resolver: zodResolver(createBadgeSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update Badge form
export const useUpdateBadgeForm = () => {
  return useForm<UpdateBadgeFormData>({
    resolver: zodResolver(updateBadgeSchema),
    defaultValues: updateDefaultValues,
  });
};