// src/models/InvestmentPlan.ts

export class InvestmentPlan {
  id?: string;
  name: string;
  tier: string;
  minInvestment: number;
  maxInvestment: number;
  dailyReturn: number;
  duration: number;
  description: string;
  isActive: boolean;
  isTeam: boolean;
  teamMembersCount: number | null;
  icon: string;
  monthlyLimitCR: number;
  dailyLimitCR: number;
  subscriptionLimit: number;
  requirements: {
    tasksPerDay: number;
    totalTasks: number;
    taskTime: string;
    dailyTime: string;
    acceleratedReturn: string;
  };

  constructor(data?: Partial<InvestmentPlan>) {
    this.id = data?.id;
    this.name = data?.name ?? "";
    this.tier = data?.tier ?? "";
    this.minInvestment = data?.minInvestment ?? 0;
    this.maxInvestment = data?.maxInvestment ?? 0;
    this.dailyReturn = data?.dailyReturn ?? 0;
    this.duration = data?.duration ?? 0;
    this.description = data?.description ?? "";
    this.isActive = data?.isActive ?? true;
    this.isTeam = data?.isTeam ?? false;
    this.teamMembersCount = data?.teamMembersCount ?? null;
    this.icon = data?.icon ?? "";
    this.monthlyLimitCR = data?.monthlyLimitCR ?? 0;
    this.dailyLimitCR = data?.dailyLimitCR ?? 0;
    this.subscriptionLimit = data?.subscriptionLimit ?? 1;
    this.requirements = data?.requirements ?? {
      tasksPerDay: 0,
      totalTasks: 0,
      taskTime: "",
      dailyTime: "",
      acceleratedReturn: "",
    };
  }

  toDto(): CreateInvestmentPlanDto | UpdateInvestmentPlanDto {
    const dto: any = {
      name: this.name,
      tier: this.tier,
      minInvestment: this.minInvestment,
      maxInvestment: this.maxInvestment,
      dailyReturn: this.dailyReturn,
      duration: this.duration,
      description: this.description,
      isActive: this.isActive,
      icon: this.icon,
      monthlyLimitCR: this.monthlyLimitCR,
      dailyLimitCR: this.dailyLimitCR,
      subscriptionLimit: this.subscriptionLimit,
      requirements: JSON.stringify({
        ...this.requirements,
        isTeam: this.isTeam,
        teamMembersCount: this.teamMembersCount,
      }),
    };
    if (this.id) dto.id = this.id;
    return dto;
  }
}

export interface CreateInvestmentPlanDto {
  name: string;
  tier: string;
  minInvestment: number;
  maxInvestment: number;
  dailyReturn: number;
  duration: number;
  description: string;
  isActive: boolean;
  icon?: string;
  monthlyLimitCR?: number;
  dailyLimitCR?: number;
  subscriptionLimit?: number;
  requirements?: string;
}

export interface UpdateInvestmentPlanDto extends Partial<CreateInvestmentPlanDto> {
  id?: string;
}
