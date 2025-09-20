export interface CreatePlanStateDto {
  planId: string;
  status: string; // e.g., 'active', 'inactive', 'suspended'
  updatedAt?: string; // ISO date string
}

export interface UpdatePlanStateDto {
  status?: string;
}