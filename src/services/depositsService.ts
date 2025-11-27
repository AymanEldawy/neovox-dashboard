import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

export const getAllDeposits = (page: number = 1, limit: number = 10) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}?page=${page}&limit=${limit}`, {
        method: "GET",
    });

export const getDepositById = (id: string) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/${id}`, {
        method: "GET",
    });

// @ts-ignore
export const createDeposit = (data) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
// @ts-ignore
export const updateDeposit = (id: string, data) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
export const approveDeposit = (id: string) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/approveDeposit/${id}`, {
        method: "PATCH"
    });
export const rejectDeposit = (id: string) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/rejectDeposit/${id}`, {
        method: "PATCH"
    });
export const deleteDeposit = (id: string) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/${id}`, {
        method: "DELETE",
    });