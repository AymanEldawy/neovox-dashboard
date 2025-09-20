export interface CreateReferralDto {
  referrerId: string; // User who refers
  referredId: string; // User being referred
  status?: string; // e.g., 'pending', 'accepted'
  createdAt?: string; // ISO date string
}

export interface UpdateReferralDto {
  status?: string;
}