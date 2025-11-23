import type { CurrencyType, NetworkType } from "./crypto.ts";

export interface CryptoCurrency {
    id?: string;
    method: string;
    currency: CurrencyType;
    networks: NetworkType[];
    address: {
        [key in NetworkType]?: {
            link: string;
            maxAmount: number;
            isActive: boolean;
        };
    };
}