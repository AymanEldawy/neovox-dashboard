export type UserType = {
    firstName: string;
    lastName: string;
    id: string;
    email: string;
    role: string;
};

export type UserLoginType = {
    email: string;
    password: string;
};

export type LoginResponse= {
    success: boolean;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}

export type AuthStoreType = {
    user: UserType | null;
    token: string | null;
    login: (user: UserLoginType) => Promise<LoginResponse>;
    logout: () => void;
    getProfile:()=>void;
};

export type EmployeeType = {
    id?: string;
    name: string;
    role: string;
    status?: 'active' | 'inactive';
};

export type EmployeeStoreType = {
    users: EmployeeType[];
    addUser: (user: EmployeeType) => void;
    deleteUser: (id: string) => void;
    updateUser: (id: string, data: EmployeeType) => void;
};

export type EmployeeFiltersType = {
    search: string;
    role: string;
    status?: string;
};

export type AdminLogType = {
    adminId: string;
    action: string;
    targetType: string;
    targetId: string;
    details?: unknown;
    timestamp: string;
};
