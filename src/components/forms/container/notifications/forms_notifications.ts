// @ts-nocheck
import { z } from "zod";
import { CreateNotificationDto, UpdateNotificationDto } from "../types/notifications";

// Default values for create form
export const notificationCreateDefaultValues: CreateNotificationDto = {
  title: "",
  message: "",
  recipientId: "",
  type: "",
  createdAt: "",
};

// Default values for update form
export const notificationUpdateDefaultValues: UpdateNotificationDto = {
  title: "",
  message: "",
  recipientId: "",
  type: "",
  read: false,
};

// Zod schema for create and update
export const notificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  recipientId: z.string().min(1, "Recipient ID is required"),
  type: z.string().optional(),
  createdAt: z.string().optional(),
  read: z.boolean().optional(),
});

// For create, enforce required fields
export const notificationCreateSchema = notificationSchema.omit({ read: true }).required({
  title: true,
  message: true,
  recipientId: true,
});

// For update, all fields are optional
export const notificationUpdateSchema = notificationSchema.partial();