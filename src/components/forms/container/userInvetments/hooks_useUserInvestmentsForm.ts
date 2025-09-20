import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateUserInvestmentDto, UpdateUserInvestmentDto } from '../types/userInvestments';

// Zod schema for CreateUserInvestment
const createUserInvestmentSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  investedAt: z.string().optional(),
  status: z.enum(['active', 'completed', 'failed']).optional(),
});

// Zod schema for UpdateUserInvestment
const updateUserInvestmentSchema = z.object({
  amount: z.number().min(0, 'Amount must be positive').optional(),
  status: z.enum(['active', 'completed', 'failed']).optional(),
});

// Infer types from Zod schemas
type CreateUserInvestmentFormData = z.infer<typeof createUserInvestmentSchema>;
type UpdateUserInvestmentFormData = z.infer<typeof updateUserInvestmentSchema>;

// Default values for Create form
const createDefaultValues: CreateUserInvestmentFormData = {
  userId: '',
  planId: '',
  amount: 0,
  investedAt: undefined,
  status: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateUserInvestmentFormData = {
  amount: undefined,
  status: undefined,
};

// Hook for Create UserInvestment form
export const useCreateUserInvestmentForm = () => {
  return useForm<CreateUserInvestmentFormData>({
    resolver: zodResolver(createUserInvestmentSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update UserInvestment form
export const useUpdateUserInvestmentForm = () => {
  return useForm<UpdateUserInvestmentFormData>({
    resolver: zodResolver(updateUserInvestmentSchema),
    defaultValues: updateDefaultValues,
  });
};