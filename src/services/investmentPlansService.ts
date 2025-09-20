import type { CreateInvestmentPlanDto, UpdateInvestmentPlanDto } from "@/types/types_investmentPlans";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all investment plans
export const getAllInvestmentPlans = () =>
  apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}`, {
    method: "GET",
  });

// Get a single investment plan by ID
export const getInvestmentPlanById = (id: string) =>
  apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
    method: "GET",
  });

// Create a new investment plan
export const createInvestmentPlan = (data: CreateInvestmentPlanDto) =>
  apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing investment plan by ID
export const updateInvestmentPlan = (id: string, data: UpdateInvestmentPlanDto) =>
  apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete an investment plan by ID
export const deleteInvestmentPlan = (id: string) =>
  apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
    method: "DELETE",
  });