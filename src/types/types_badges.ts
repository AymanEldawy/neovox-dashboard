export interface CreateBadgeDto {
  name: string;
  description: string;
  imageUrl?: string; // URL to badge icon
  criteria?: string; // Description of how to earn
  createdAt?: string; // ISO date string
}

export interface UpdateBadgeDto {
  name?: string;
  description?: string;
  imageUrl?: string;
  criteria?: string;
}