// @ts-nocheck
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateReferralDto, UpdateReferralDto } from '@/types/types_referrals';

// Zod schema for CreateReferral
const createReferralSchema = z.object({
  referrerId: z.string().min(1, 'Referrer ID is required'),
  referredId: z.string().min(1, 'Referred ID is required'),
  status: z.enum(['pending', 'accepted', 'rejected']).optional(),
  createdAt: z.string().optional(),
});

// Zod schema for UpdateReferral
const updateReferralSchema = z.object({
  status: z.enum(['pending', 'accepted', 'rejected']).optional(),
});

// Infer types from Zod schemas
type CreateReferralFormData = z.infer<typeof createReferralSchema>;
type UpdateReferralFormData = z.infer<typeof updateReferralSchema>;

// Default values for Create form
const createDefaultValues: CreateReferralFormData = {
  referrerId: '',
  referredId: '',
  status: undefined,
  createdAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateReferralFormData = {
  status: undefined,
};

// Hook for Create Referral form
export const useCreateReferralForm = () => {
  return useForm<CreateReferralFormData>({
    resolver: zodResolver(createReferralSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update Referral form
export const useUpdateReferralForm = () => {
  return useForm<UpdateReferralFormData>({
    resolver: zodResolver(updateReferralSchema),
    defaultValues: updateDefaultValues,
  });
};