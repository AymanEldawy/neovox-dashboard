export interface CreateInvestmentPlanDto {
  name: string;
  tier: string;
  minInvestment: number;
  maxInvestment: number;
  dailyReturn: number;
  duration: number;
  description: string;
  isActive: boolean;
  requirements?: string;
}

export interface UpdateInvestmentPlanDto extends Partial<CreateInvestmentPlanDto> {
  id?: string;
}
