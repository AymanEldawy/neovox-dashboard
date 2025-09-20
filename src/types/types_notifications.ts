export interface CreateNotificationDto {
  title: string;
  message: string;
  recipientId: string;
  type?: string; // e.g., 'info', 'warning', 'error'
  createdAt?: string; // ISO date string
}

export interface UpdateNotificationDto {
  title?: string;
  message?: string;
  recipientId?: string;
  type?: string;
  read?: boolean; // Allow marking as read/unread
}