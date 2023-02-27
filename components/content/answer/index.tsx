import { useEffect, useState } from "react";

interface AnswerProps {
    type: string,
    unanswer: string[] | undefined,
    answers: string | undefined,
    select: string,
    setSelect: Function
    page: number,
}
const Answer: React.FC<AnswerProps> = (props) => {
    const {answers, type, unanswer, select, setSelect, page} = props;
    const [choice, setChoice] = useState<string[]>([]);

    useEffect(() => {
        if (answers && unanswer) {
            if (type === "multiple") {
                const newAnswer = [...unanswer]
                const randomIndex = Math.floor(Math.random() * (newAnswer.length + 1));
                newAnswer.splice(randomIndex, 0, answers);
                setChoice(newAnswer)
            } else {
                setChoice(['True', 'False'])
            }
        }
    }, [answers, unanswer])

    function handleChoice(e: string, i: number) {
        setSelect(e)
    }
    return (
        <div className="my-4">
            {choice.map((row, index) => (
            // <div key={index}>{row}</div>
            <div className="flex items-center mb-4" key={index}>
                <input type="radio" onChange={() => handleChoice(row, index)} checked={select === row} name="default-radio" className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-white dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-1" onClick={() => handleChoice(row, page)} className="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300" dangerouslySetInnerHTML={{__html:row}} ></label>
            </div>
        ))}
        </div>
    )
}

export default Answer;
