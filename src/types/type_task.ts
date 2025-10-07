export interface Task {
    title: string;
    description: string;
    type: "article" | "checkin" | "survey";
    requirements: {
        content?: string; // For article
        questions?: { q: string; options: string[] }[]; // For survey
    };
    rewards: {
        points: number;
    };
    isActive: boolean;
}