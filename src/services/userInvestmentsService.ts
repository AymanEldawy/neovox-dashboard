import type { CreateUserInvestmentDto, UpdateUserInvestmentDto } from "@/types/types_userInvestments";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all user investments
export const getAllUserInvestments = () =>
  apiFetch(`${API_URLS.BASE_USER_INVESTMENTS}`, {
    method: "GET",
  });

// Get a single user investment by ID
export const getUserInvestmentById = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_INVESTMENTS}/${id}`, {
    method: "GET",
  });

// Create a new user investment
export const createUserInvestment = (data: CreateUserInvestmentDto) =>
  apiFetch(`${API_URLS.BASE_USER_INVESTMENTS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing user investment by ID
export const updateUserInvestment = (id: string, data: UpdateUserInvestmentDto) =>
  apiFetch(`${API_URLS.BASE_USER_INVESTMENTS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a user investment by ID
export const deleteUserInvestment = (id: string) =>
  apiFetch(`${API_URLS.BASE_USER_INVESTMENTS}/${id}`, {
    method: "DELETE",
  });