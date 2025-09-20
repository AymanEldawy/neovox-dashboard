import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateUserBadgeDto, UpdateUserBadgeDto } from '../types/userBadges';

// Zod schema for CreateUserBadge
const createUserBadgeSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  badgeId: z.string().min(1, 'Badge ID is required'),
  awardedAt: z.string().optional(),
});

// Zod schema for UpdateUserBadge
const updateUserBadgeSchema = z.object({
  awardedAt: z.string().optional(),
});

// Infer types from Zod schemas
type CreateUserBadgeFormData = z.infer<typeof createUserBadgeSchema>;
type UpdateUserBadgeFormData = z.infer<typeof updateUserBadgeSchema>;

// Default values for Create form
const createDefaultValues: CreateUserBadgeFormData = {
  userId: '',
  badgeId: '',
  awardedAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateUserBadgeFormData = {
  awardedAt: undefined,
};

// Hook for Create UserBadge form
export const useCreateUserBadgeForm = () => {
  return useForm<CreateUserBadgeFormData>({
    resolver: zodResolver(createUserBadgeSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update UserBadge form
export const useUpdateUserBadgeForm = () => {
  return useForm<UpdateUserBadgeFormData>({
    resolver: zodResolver(updateUserBadgeSchema),
    defaultValues: updateDefaultValues,
  });
};