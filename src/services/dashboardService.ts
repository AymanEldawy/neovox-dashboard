import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all DASHBOARD
export const getStats = () =>
    apiFetch(`${API_URLS.BASE_DASHBOARD}/stats`, {
        method: "GET",
    });

// Get a single user by ID
export const getUserById = (id: string) =>
    apiFetch(`${API_URLS.BASE_DASHBOARD}/${id}`, {
        method: "GET",
    });

// Create a new user
export const getPlanInvestmentStats = () =>
    apiFetch(`${API_URLS.BASE_DASHBOARD}/plan-stats`, {
        method: "GET",

    });
export const getUserMissionTypeStats = () =>
    apiFetch(`${API_URLS.BASE_DASHBOARD}/user-mission-stats`, {
        method: "GET",

    });
export const getRecentUsersAndFirstUserDeposit = () =>
    apiFetch(`${API_URLS.BASE_DASHBOARD}/recent-users`, {
        method: "GET",

    });
