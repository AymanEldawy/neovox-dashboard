import type { CreatePlanStateDto, UpdatePlanStateDto } from "@/types/types_planStates";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all plan states
export const getAllPlanStates = () =>
  apiFetch(`${API_URLS.BASE_PLAN_STATES}`, {
    method: "GET",
  });

// Get a single plan state by ID
export const getPlanStateById = (id: string) =>
  apiFetch(`${API_URLS.BASE_PLAN_STATES}/${id}`, {
    method: "GET",
  });

// Create a new plan state
export const createPlanState = (data: CreatePlanStateDto) =>
  apiFetch(`${API_URLS.BASE_PLAN_STATES}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing plan state by ID
export const updatePlanState = (id: string, data: UpdatePlanStateDto) =>
  apiFetch(`${API_URLS.BASE_PLAN_STATES}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a plan state by ID
export const deletePlanState = (id: string) =>
  apiFetch(`${API_URLS.BASE_PLAN_STATES}/${id}`, {
    method: "DELETE",
  });