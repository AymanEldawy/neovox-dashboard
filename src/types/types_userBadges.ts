export interface CreateUserBadgeDto {
  userId: string;
  badgeId: string;
  awardedAt?: string; // ISO date string
}

export interface UpdateUserBadgeDto {
  awardedAt?: string;
}