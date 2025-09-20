import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateInvestmentPlanDto, UpdateInvestmentPlanDto } from '../types/investmentPlans';

// Zod schema for CreateInvestmentPlan
const createInvestmentPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  minAmount: z.number().min(0, 'Minimum amount must be positive'),
  maxAmount: z.number().min(0).optional(),
  returnRate: z.number().min(0, 'Return rate must be positive'),
  duration: z.number().min(1, 'Duration must be at least 1'),
  createdAt: z.string().optional(),
});

// Zod schema for UpdateInvestmentPlan
const updateInvestmentPlanSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  minAmount: z.number().min(0, 'Minimum amount must be positive').optional(),
  maxAmount: z.number().min(0).optional(),
  returnRate: z.number().min(0, 'Return rate must be positive').optional(),
  duration: z.number().min(1, 'Duration must be at least 1').optional(),
});

// Infer types from Zod schemas
type CreateInvestmentPlanFormData = z.infer<typeof createInvestmentPlanSchema>;
type UpdateInvestmentPlanFormData = z.infer<typeof updateInvestmentPlanSchema>;

// Default values for Create form
const createDefaultValues: CreateInvestmentPlanFormData = {
  name: '',
  description: '',
  minAmount: 0,
  maxAmount: undefined,
  returnRate: 0,
  duration: 1,
  createdAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateInvestmentPlanFormData = {
  name: undefined,
  description: undefined,
  minAmount: undefined,
  maxAmount: undefined,
  returnRate: undefined,
  duration: undefined,
};

// Hook for Create InvestmentPlan form
export const useCreateInvestmentPlanForm = () => {
  return useForm<CreateInvestmentPlanFormData>({
    resolver: zodResolver(createInvestmentPlanSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update InvestmentPlan form
export const useUpdateInvestmentPlanForm = () => {
  return useForm<UpdateInvestmentPlanFormData>({
    resolver: zodResolver(updateInvestmentPlanSchema),
    defaultValues: updateDefaultValues,
  });
};