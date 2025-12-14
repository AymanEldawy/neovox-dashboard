import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

export const getAllWithdrawals = (page: number = 1, limit: number = 10) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}?page=${page}&limit=${limit}`, {
        method: "GET",
    });

export const getWithdrawalsById = (id: string) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/${id}`, {
        method: "GET",
    });

// @ts-ignore
export const createWithdrawals = (data) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
// @ts-ignore
export const updateWithdrawals = (id: string, data) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
export const approveWithdrawal = (id: string) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/approveWithdrawal/${id}`, {
        method: "PATCH",
        body: JSON.stringify({})
    });
export const rejectWithdrawal = (id: string) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/rejectWithdrawal/${id}`, {
        method: "PATCH",
        body: JSON.stringify({})
    });

export const deleteWithdrawals = (id: string) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/${id}`, {
        method: "DELETE",
    });