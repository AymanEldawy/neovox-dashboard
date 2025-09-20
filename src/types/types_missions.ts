export interface CreateMissionDto {
  title: string;
  description: string;
  reward?: number; // e.g., points or currency
  difficulty?: string; // e.g., 'easy', 'medium', 'hard'
  createdAt?: string; // ISO date string
}

export interface UpdateMissionDto {
  title?: string;
  description?: string;
  reward?: number;
  difficulty?: string;
}