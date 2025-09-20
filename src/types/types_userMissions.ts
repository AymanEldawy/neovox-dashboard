export interface CreateUserMissionDto {
  userId: string;
  missionId: string;
  status?: string; // e.g., 'active', 'completed'
  progress?: number; // e.g., percentage or steps completed
  assignedAt?: string; // ISO date string
}

export interface UpdateUserMissionDto {
  status?: string;
  progress?: number;
}