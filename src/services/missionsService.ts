import type { CreateMissionDto, UpdateMissionDto } from "@/types/types_missions";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all missions
export const getAllMissions = () =>
  apiFetch(`${API_URLS.BASE_MISSIONS}`, {
    method: "GET",
  });

// Get a single mission by ID
export const getMissionById = (id: string) =>
  apiFetch(`${API_URLS.BASE_MISSIONS}/${id}`, {
    method: "GET",
  });

// Create a new mission
export const createMission = (data: CreateMissionDto) =>
  apiFetch(`${API_URLS.BASE_MISSIONS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing mission by ID
export const updateMission = (id: string, data: UpdateMissionDto) =>
  apiFetch(`${API_URLS.BASE_MISSIONS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a mission by ID
export const deleteMission = (id: string) =>
  apiFetch(`${API_URLS.BASE_MISSIONS}/${id}`, {
    method: "DELETE",
  });