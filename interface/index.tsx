export interface DataProps {
    category?: string,
    correct_answer?: string,
    difficulty?: string,
    incorrect_answers?: string[],
    question: string,
    type: string,
    select: string,
    setSelect: Function,
    page: number,
}

export interface QuizProps {
    data: Array<DataProps>
}