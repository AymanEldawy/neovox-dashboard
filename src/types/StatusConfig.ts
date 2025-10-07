import type {AlertCircle} from "lucide-react";

export type FinancialsStatus = "pending" | "confirmed" | "rejected";

export interface StatusConfig {
    bg: string;
    text: string;
    border: string;
    icon: typeof AlertCircle;
    label: string;
}