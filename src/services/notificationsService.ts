import type { CreateNotificationDto, UpdateNotificationDto } from "@/types/types_notifications";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all notifications
export const getAllNotifications = () =>
  apiFetch(`${API_URLS.BASE_NOTIFICATIONS}`, {
    method: "GET",
  });

// Get a single notification by ID
export const getNotificationById = (id: string) =>
  apiFetch(`${API_URLS.BASE_NOTIFICATIONS}/${id}`, {
    method: "GET",
  });

// Create a new notification
export const createNotification = (data: CreateNotificationDto) =>
  apiFetch(`${API_URLS.BASE_NOTIFICATIONS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing notification by ID
export const updateNotification = (id: string, data: UpdateNotificationDto) =>
  apiFetch(`${API_URLS.BASE_NOTIFICATIONS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a notification by ID
export const deleteNotification = (id: string) =>
  apiFetch(`${API_URLS.BASE_NOTIFICATIONS}/${id}`, {
    method: "DELETE",
  });