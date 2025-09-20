import type { CreateUserDto, UpdateUserDto } from "@/types/types_users";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all users
export const getAllUsers = () =>
  apiFetch(`${API_URLS.BASE_USERS}`, {
    method: "GET",
  });

// Get a single user by ID
export const getUserById = (id: string) =>
  apiFetch(`${API_URLS.BASE_USERS}/${id}`, {
    method: "GET",
  });

// Create a new user
export const createUser = (data: CreateUserDto) =>
  apiFetch(`${API_URLS.BASE_USERS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing user by ID
export const updateUser = (id: string, data: UpdateUserDto) =>
  apiFetch(`${API_URLS.BASE_USERS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a user by ID
export const deleteUser = (id: string) =>
  apiFetch(`${API_URLS.BASE_USERS}/${id}`, {
    method: "DELETE",
  });