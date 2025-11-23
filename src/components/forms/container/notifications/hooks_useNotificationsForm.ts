// @ts-nocheck
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateNotificationDto, UpdateNotificationDto } from '@/types/types_notifications';

// Zod schema for CreateNotification
const createNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  recipientId: z.string().min(1, 'Recipient ID is required'),
  type: z.string().optional(),
  createdAt: z.string().optional(),
});

// Zod schema for UpdateNotification
const updateNotificationSchema = z.object({
  title: z.string().optional(),
  message: z.string().optional(),
  recipientId: z.string().optional(),
  type: z.string().optional(),
  read: z.boolean().optional(),
});

// Infer types from Zod schemas
type CreateNotificationFormData = z.infer<typeof createNotificationSchema>;
type UpdateNotificationFormData = z.infer<typeof updateNotificationSchema>;

// Default values for Create form
const createDefaultValues: CreateNotificationFormData = {
  title: '',
  message: '',
  recipientId: '',
  type: undefined,
  createdAt: undefined,
};

// Default values for Update form
const updateDefaultValues: UpdateNotificationFormData = {
  title: undefined,
  message: undefined,
  recipientId: undefined,
  type: undefined,
  read: undefined,
};

// Hook for Create Notification form
export const useCreateNotificationForm = () => {
  return useForm<CreateNotificationFormData>({
    resolver: zodResolver(createNotificationSchema),
    defaultValues: createDefaultValues,
  });
};

// Hook for Update Notification form
export const useUpdateNotificationForm = () => {
  return useForm<UpdateNotificationFormData>({
    resolver: zodResolver(updateNotificationSchema),
    defaultValues: updateDefaultValues,
  });
};