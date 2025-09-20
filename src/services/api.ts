import { USER_STORE_KEY } from "@/data/constants";

const HTTP_BASE = import.meta.env.VITE_API_URL || "http://178.16.131.149";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getAuthHeaders = () => {
  const user = localStorage.getItem(USER_STORE_KEY);

  if (user) {
    const userStorage = JSON.parse(user);
    return {
      ...defaultHeaders,
      Authorization: `Bearer ${userStorage?.state?.token}`,
    };
  }
  return defaultHeaders;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${HTTP_BASE}${endpoint}`, {
    ...options,
    headers: getAuthHeaders(),
  });
  return response.json();
};
