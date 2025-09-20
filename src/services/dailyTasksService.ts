import type { CreateDailyTaskDto, UpdateDailyTaskDto } from "@/types/types_dailyTasks";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all daily tasks
export const getAllDailyTasks = () =>
  apiFetch(`${API_URLS.BASE_DAILY_TASKS}`, {
    method: "GET",
  });

// Get a single daily task by ID
export const getDailyTaskById = (id: string) =>
  apiFetch(`${API_URLS.BASE_DAILY_TASKS}/${id}`, {
    method: "GET",
  });

// Create a new daily task
export const createDailyTask = (data: CreateDailyTaskDto) =>
  apiFetch(`${API_URLS.BASE_DAILY_TASKS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing daily task by ID
export const updateDailyTask = (id: string, data: UpdateDailyTaskDto) =>
  apiFetch(`${API_URLS.BASE_DAILY_TASKS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a daily task by ID
export const deleteDailyTask = (id: string) =>
  apiFetch(`${API_URLS.BASE_DAILY_TASKS}/${id}`, {
    method: "DELETE",
  });