export interface CreateDailyTaskDto {
  userId: string;
  title: string;
  description: string;
  reward?: number; // e.g., points or currency
  dueDate?: string; // ISO date string
  status?: string; // e.g., 'pending', 'completed'
}

export interface UpdateDailyTaskDto {
  title?: string;
  description?: string;
  reward?: number;
  dueDate?: string;
  status?: string;
}