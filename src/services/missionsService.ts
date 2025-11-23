import type {UpdateMissionDto} from "@/types/types_missions";
import {apiFetch} from "./api";
import API_URLS from "./apiUrlPaths";
import type {Task} from "@/types/type_task.ts";

// Get all missions
export const getAllMissions = (page: number, limit: number) =>
    apiFetch(`${API_URLS.BASE_MISSIONS}?page=${page}&limit=${limit}`, {
        method: "GET",
    });

// Get a single mission by ID
export const getMissionById = (id: string) =>
    apiFetch(`${API_URLS.BASE_MISSIONS}/${id}`, {
        method: "GET",
    });

// Create a new mission
export const createMission = (data: Task) =>
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