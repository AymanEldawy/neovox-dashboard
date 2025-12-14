export interface CreateMissionDto {
  title: string;
  description: string;
  rewards: number; // e.g., points or currency
  type: string; // e.g., "Daily", "Weekly", "Special"
  createdAt: string; // ISO date string
}

export interface UpdateMissionDto {
  title?: string;
  description?: string;
  rewards?: { points: number };
  difficulty?: string;
  type?: string;
  requirements?: any;
  isActive?: boolean;
}