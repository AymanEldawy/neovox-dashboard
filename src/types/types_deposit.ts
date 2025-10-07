
export interface UserDto {
    firstName: string;
    lastName: string;
    email: string;
}

export interface DepositDto {
    id: string;
    amount: number;
    currency: string;
    method: string;
    status: "pending" | "confirmed" | "rejected";
    createdAt: string;
    receiptFile: string;
    user: UserDto;
}

// واجهة لإنشاء Deposit جديدة
export interface CreateDepositDto {
    amount: number;
    currency: string;
    method: string;
    userId: string;
    receiptFile?: string;
    description?: string;
}

// واجهة لتحديث Deposit
export interface UpdateDepositDto extends Partial<CreateDepositDto> {
    id: string;
}
