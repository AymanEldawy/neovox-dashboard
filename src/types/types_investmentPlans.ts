export interface CreateInvestmentPlanDto {
  name: string;
  description: string;
  minAmount: number; // Minimum investment amount
  maxAmount?: number; // Optional max investment
  returnRate: number; // e.g., percentage return
  duration: number; // e.g., days or months
  createdAt?: string; // ISO date string
}

export interface UpdateInvestmentPlanDto {
  name?: string;
  description?: string;
  minAmount?: number;
  maxAmount?: number;
  returnRate?: number;
  duration?: number;
}