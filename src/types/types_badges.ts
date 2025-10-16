export interface CreateBadgeDto {
  id?: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  category?: string;
  requiredAction?: string;
  rarity?: string;
}
