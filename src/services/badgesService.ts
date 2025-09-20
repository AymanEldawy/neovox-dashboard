import type { CreateBadgeDto, UpdateBadgeDto } from "@/types/types_badges";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all badges
export const getAllBadges = () =>
  apiFetch(`${API_URLS.BASE_BADGES}`, {
    method: "GET",
  });

// Get a single badge by ID
export const getBadgeById = (id: string) =>
  apiFetch(`${API_URLS.BASE_BADGES}/${id}`, {
    method: "GET",
  });

// Create a new badge
export const createBadge = (data: CreateBadgeDto) =>
  apiFetch(`${API_URLS.BASE_BADGES}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing badge by ID
export const updateBadge = (id: string, data: UpdateBadgeDto) =>
  apiFetch(`${API_URLS.BASE_BADGES}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a badge by ID
export const deleteBadge = (id: string) =>
  apiFetch(`${API_URLS.BASE_BADGES}/${id}`, {
    method: "DELETE",
  });