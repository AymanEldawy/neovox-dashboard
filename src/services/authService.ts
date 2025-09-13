import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

export const login = (data: { username: string; password: string }) =>
  apiFetch(`${API_URLS.BASE_AUTH}/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgetPassword = (data: { email: string }) =>
  apiFetch(`${API_URLS.BASE_AUTH}/forget-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPassword = (data: { email: string }) =>
  apiFetch(`${API_URLS.BASE_AUTH}/reset-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = () =>
  apiFetch(`${API_URLS.BASE_AUTH}/logout`, {
    method: "GET",
  });

export const updatePassword = (data: {
  old_password: string;
  new_password: string;
  confirm_password: string;
}) =>
  apiFetch(`${API_URLS.BASE_AUTH}/update-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });
