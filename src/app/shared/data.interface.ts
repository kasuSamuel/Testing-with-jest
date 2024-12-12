export interface Quizdata {
    title: string;
    icon: string;
    questions: Questions[];
}

export interface Questions{
    question: string;
    options: string[];
    answer: string;
}