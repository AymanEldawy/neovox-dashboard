import type { CreateUserMissionDto, UpdateUserMissionDto } from "@/types/types_userMissions";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all user missions
export const getAllUserMissions = () =>
  apiFetch(`${API_URLS.BASE_USER_MISSIONS}`, {
    method: "GET",
  });

// Get a single user mission by ID
export const getUserMissionById = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_MISSIONS}/${id}`, {
    method: "GET",
  });

// Create a new user mission
export const createUserMission = (data: CreateUserMissionDto) =>
  apiFetch(`${API_URLS.BASE_USER_MISSIONS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing user mission by ID
export const updateUserMission = (id: string, data: UpdateUserMissionDto) =>
  apiFetch(`${API_URLS.BASE_USER_MISSIONS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a user mission by ID
export const deleteUserMission = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_MISSIONS}/${id}`, {
    method: "DELETE",
  });