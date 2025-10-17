import type { Currency, Network } from "./crypto.ts";

export interface CryptoCurrency {
    id?: string;
    method: string;
    currency: Currency;
    networks: Network[];
    address: {
        [key in Network]?: {
            link: string;
            maxAmount: number;
            isActive: boolean;
        };
    };
}