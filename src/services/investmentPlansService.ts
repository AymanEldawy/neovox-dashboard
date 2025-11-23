import type { CreateInvestmentPlanDto,UpdateInvestmentPlanDto } from "@/types/types_investmentPlans";
import {apiFetch} from "./api";
import API_URLS from "./apiUrlPaths";

export const getAllInvestmentPlans = () =>
    apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}`, {
        method: "GET",
    });

export const getInvestmentPlanById = (id: string) =>
    apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
        method: "GET",
    });

// @ts-ignore
export const createInvestmentPlan = (data:CreateInvestmentPlanDto) =>
    apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
// @ts-ignore
export const updateInvestmentPlan = (id: string, data:UpdateInvestmentPlanDto) =>
    apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

export const deleteInvestmentPlan = (id: string) =>
    apiFetch(`${API_URLS.BASE_INVESTMENT_PLANS}/${id}`, {
        method: "DELETE",
    });