import type { CreateReferralDto, UpdateReferralDto } from "@/types/types_referrals";
import { apiFetch } from "./api";
import API_URLS from "./apiUrlPaths";

// Get all referrals
export const getAllReferrals = () =>
  apiFetch(`${API_URLS.BASE_REFERRALS}`, {
    method: "GET",
  });

// Get a single referral by ID
export const getReferralById = (id: string) =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/${id}`, {
    method: "GET",
  });

// Create a new referral
export const createReferral = (data: CreateReferralDto) =>
  apiFetch(`${API_URLS.BASE_REFERRALS}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// Update an existing referral by ID
export const updateReferral = (id: string, data: UpdateReferralDto) =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// Delete a referral by ID
export const deleteReferral = (id: string) =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/${id}`, {
    method: "DELETE",
  });

export const payoutReferralCommissions = (userId: string) =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/payout/${userId}`, {
    method: "POST",
  });

export const getUnpaidReferralStats = () =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/unpaid-stats`, {
    method: "GET",
  });

export const payoutAllReferralCommissions = () =>
  apiFetch(`${API_URLS.BASE_REFERRALS}/payout-all`, {
    method: "POST",
  });