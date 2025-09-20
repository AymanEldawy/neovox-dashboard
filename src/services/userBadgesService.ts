import type { CreateUserBadgeDto, UpdateUserBadgeDto } from "@/types/types_userBadges";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all user badges
export const getAllUserBadges = () =>
  apiFetch(`${API_URLS.BASE_USER_BADGES}`, {
    method: "GET",
  });

// Get a single user badge by ID
export const getUserBadgeById = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_BADGES}/${id}`, {
    method: "GET",
  });

// Create a new user badge
export const createUserBadge = (data: CreateUserBadgeDto) =>
  apiFetch(`${API_URLS.BASE_USER_BADGES}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing user badge by ID
export const updateUserBadge = (id: string, data: UpdateUserBadgeDto) =>
  apiFetch(`${API_URLS.BASE_USER_BADGES}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a user badge by ID
export const deleteUserBadge = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_BADGES}/${id}`, {
    method: "DELETE",
  });