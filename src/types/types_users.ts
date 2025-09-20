export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: string; // e.g., 'user', 'admin'
  createdAt?: string; // ISO date string
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}