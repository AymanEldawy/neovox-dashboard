import type { Employee } from "@/types/type_employee.ts";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all employees
export const getAllEmployees = () =>
  apiFetch(`${API_URLS.BASE_EMPLOYEES}`, {
    method: "GET",
  });

// Get a single employee by ID
export const getEmployeeById = (id: string) =>
  apiFetch(`${API_URLS.BASE_EMPLOYEES}/${id}`, {
    method: "GET",
  });

// Create a new employee
export const createEmployee = (data: Employee) =>
  apiFetch(`${API_URLS.BASE_EMPLOYEES}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing employee by ID
export const updateEmployee = (id: string, data: Partial<Employee>) =>
  apiFetch(`${API_URLS.BASE_EMPLOYEES}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete an employee by ID
export const deleteEmployee = (id: string) =>
  apiFetch(`${API_URLS.BASE_EMPLOYEES}/${id}`, {
    method: "DELETE",
  });