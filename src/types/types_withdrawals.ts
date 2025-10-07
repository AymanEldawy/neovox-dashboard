export interface WithdrawalUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Withdrawal {
    id: string;
    amount: string;       // يمكن تغييره إلى number إذا ترغب
    fee: string;          // يمكن تغييره إلى number
    netAmount: string;    // يمكن تغييره إلى number
    currency: string;
    method: string;
    destination: string;
    status: "pending" | "confirmed" | "rejected";
    reviewedBy: string;
    reviewedAt: string;   // أو Date إذا تريد تحويله
    reason: string;
    createdAt: string;    // أو Date
    user: WithdrawalUser;
}
