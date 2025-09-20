export interface CreateUserInvestmentDto {
  userId: string;
  planId: string;
  amount: number; // Investment amount
  investedAt?: string; // ISO date string
  status?: string; // e.g., 'active', 'completed'
}

export interface UpdateUserInvestmentDto {
  amount?: number;
  status?: string;
}