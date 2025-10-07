
import {apiFetch} from "./api";
import API_URLS from "./apiUrlPaths";

// Get all Teams
export const getAllTeams = () =>
    apiFetch(`${API_URLS.BASE_TEAMS}`, {
        method: "GET",
    });

// Get a single Team by ID
export const getTeamById = (id: string) =>
    apiFetch(`${API_URLS.BASE_TEAMS}/${id}`, {
        method: "GET",
    });

// Create a new Team
export const createTeam = (data: any) =>
    apiFetch(`${API_URLS.BASE_TEAMS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });

// Update an existing Team by ID
export const updateTeam = (id: string, data: any) =>
    apiFetch(`${API_URLS.BASE_TEAMS}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

// Delete a Team by ID
export const deleteTeam = (id: string) =>
    apiFetch(`${API_URLS.BASE_TEAMS}/${id}`, {
        method: "DELETE",
    });