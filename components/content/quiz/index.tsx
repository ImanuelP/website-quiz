import { useEffect, useState } from "react";
import { DataProps } from "../../../interface";
import Answer from "../answer";

const Quiz: React.FC<DataProps> = (props) => {
    const {select, page, setSelect, category, type, correct_answer, difficulty, incorrect_answers, question} = props;
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }, 1000);

        // Clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const list = [
        {name: 'Processing time', status: `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}` },
        {name: 'Category', status: category},
        {name: 'Level', status: difficulty}
    ]

    return (
        <div>
            {list.map((row: any, index:number) => (
                <div key={index} className="w-full flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-blue-700 dark:text-blue-300">{row?.name}</label>
                        <label className="text-right text-lg text-blue-900 font-bold dark:text-blue-200">{row?.status}</label>
                </div>
            ))}
            <div className="border border-blue-400 mb-4 p-3 rounded-md">
                <label className="font-bold text-blue-600 text-sm">Question:</label>
                <div dangerouslySetInnerHTML={{__html:question}} className="font-serif " />
            <Answer
                type={type}
                page={page}
                unanswer={incorrect_answers}
                answers={correct_answer}
                select={select}
                setSelect={setSelect}
            />
            </div>
        </div>
    )
}

export default Quiz;