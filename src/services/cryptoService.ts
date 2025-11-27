import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all cryptocurrencies
export const getAllCryptos = () =>
    apiFetch(`${API_URLS.BASE_CRYPTOS}`, {
        method: "GET",
    });

// Get a single cryptocurrency by ID
export const getCryptoById = (id: string) =>
    apiFetch(`${API_URLS.BASE_CRYPTOS}/${id}`, {
        method: "GET",
    });

// Create a new cryptocurrency
export const createCrypto = (data: any) =>
    apiFetch(`${API_URLS.BASE_CRYPTOS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });

// Update an existing cryptocurrency by ID
export const updateCrypto = (id: string, data: any) =>
    apiFetch(`${API_URLS.BASE_CRYPTOS}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

// Delete a cryptocurrency by ID
export const deleteCrypto = (id: string) =>
    apiFetch(`${API_URLS.BASE_CRYPTOS}/${id}`, {
        method: "DELETE",
    });