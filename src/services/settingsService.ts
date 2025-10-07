import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";
export const saveSocialLinks = (data:any) =>
    apiFetch(`${API_URLS.BASE_SOCIAL_LINKS}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
// Get all plan states
export const  saveWithdrawalFee = (data: any) =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/fee`, {
        method: "POST",
        body: JSON.stringify(data),
    });

export const saveInitialGift = (data: any) =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/gift`, {
        method: "POST",
        body: JSON.stringify(data),
    });


export const getSocialLinks = () =>
    apiFetch(`${API_URLS.BASE_SOCIAL_LINKS}`, {
        method: "GET"
    });

export const getWithdrawalSettings = () =>
    apiFetch(`${API_URLS.BASE_WITHDRAWALS}/settings`, {
        method: "GET"
    });

export const getInitialGift = () =>
    apiFetch(`${API_URLS.BASE_DEPOSITS}/gift`, {
        method: "GET"
    });