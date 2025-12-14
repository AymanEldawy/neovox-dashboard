export interface Task {
    title: string;
    description: string;
    type: "article" | "quiz";
    requirements: {
        content?: string; // For article
        // For quiz
        quizQuestions?: {
            question: string;
            type: 'multiple' | 'boolean';
            difficulty: 'easy' | 'medium' | 'hard';
            correctAnswer: string;
            incorrectAnswers: string[];
            allOptions: string[];
            correctIndex: number;
        }[];
    };
    rewards: {
        points: number;
    };
    isActive: boolean;
}