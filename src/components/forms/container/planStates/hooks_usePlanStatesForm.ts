import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreatePlanStateDto, UpdatePlanStateDto } from '../types/planStates';

// Zod schema for CreatePlanState
const createPlanStateSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  status: z.enum(['active', 'inactive', 'suspended']),
  updatedAt: z.string().optional(),
});

// Zod schema for UpdatePlanState
const updatePlanStateSchema = z.object({
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

// Infer types from Zod schemas
type CreatePlanStateFormData = z.infer<typeof createPlanStateSchema>;
type UpdatePlanStateFormData = z.infer<typeof updatePlanStateSchema>;

// Default values for Create form
const createDefaultValues: CreatePlanStateFormData = {
  planId: '',
  status: 'active',
  updatedAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdatePlanStateFormData = {
  status: undefined,
};

// Hook for Create PlanState form
export const useCreatePlanStateForm = () => {
  return useForm<CreatePlanStateFormData>({
    resolver: zodResolver(createPlanStateSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update PlanState form
export const useUpdatePlanStateForm = () => {
  return useForm<UpdatePlanStateFormData>({
    resolver: zodResolver(updatePlanStateSchema),
    defaultValues: updateDefaultValues,
  });
};