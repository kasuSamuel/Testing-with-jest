export interface Quizdata {
    title: string;
    icon: string;
    questions: Questions[];
    question: string;
    options: string[];
    answer: string;
}

export interface Questions{
    question: string;
    options: string[];
    answer: string;
}