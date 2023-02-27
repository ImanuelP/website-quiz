import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QuizProps } from "../../interface"
import Button from "../common/button";
import Quiz from "./quiz";
import Result from "./result";

interface DataProps {
    no: number,
    ans: string
}
const Content: React.FC<QuizProps> = (props) => {
    const { data } = props;
    const [page, setPage] = useState(0)
    const [userAnswers, setUserAnswers] = useState('');
    const [answers, setAnswers] = useState<DataProps[]>([])
    const [result, setResult] = useState<any>({
        open: 'hidden',
        score: 0,
        total: 0,
        answers: 0
    })

    function submitAnswer() {
        const newData = answers.filter((row: DataProps) => row.no === page)
        if (newData.length === 0) {
            setAnswers([
                ...answers,
                {no: page, ans: userAnswers}
            ])
        } else {
            const newDatas = answers.map((row) => ({
                no: row.no,
                ans: row.no === page ? userAnswers : row.ans
            }))
            setAnswers(newDatas)
        }
    }

    function handlePage(status: string) {
        if (status === 'prev') {
            setPage(page - 1)
            submitAnswer()
        } else {
            setPage(page + 1)
            submitAnswer();
            setUserAnswers('')
        }
    }

    useEffect(() => {
        const filter = answers.filter((row: DataProps) => row.no === page)
        if (filter.length !== 0) {
            setUserAnswers(filter[0].ans)
        }
    }, [page])

    function handleSubmtit() {
        const listAnswer = data.map((row) => row.correct_answer)
        const correct = []
        for (let i = 0; listAnswer.length > i; i++) {
            const filter = answers.filter((row) => row.no === i)
            if (filter.length !== 0) {
                if (listAnswer[i] === filter[0]?.ans) {
                    correct.push(listAnswer[i])
                }
            }
        }
        setResult({
            open: 'visible',
            score: correct?.length,
            total: data.length,
            answers: answers.length,
        })
        
    }

    useEffect(() => {
            setInterval(() => {
        handleSubmtit()
                }, 1200000);
    }, [])

    function onClick() {
        if (answers.length < data.length) {
            toast.warning('You havenot answered all the questions, press one more time if you are sure you want to continue')
        } else {
            handleSubmtit()
        }
    }
    return (
        <div className="w-full p-10  h-full ">
            <div className="mx-auto min-w-[200px] p-4 rounded-lg shadow-xl max-w-[800px] bg-blue-50 relative dark:bg-black">
                <Quiz {...data[page]} select={userAnswers} setSelect={setUserAnswers} />
                <div className="flex justify-between items-center">
                    {page > 0 ? <Button onclick={() => handlePage('prev')}>Prev</Button> : <div></div>}
                    <div className="mx-1">{page + 1}</div>
                    <Button onclick={() => handlePage('next')}>Next</Button>
                </div>
            <div
                onClick={() => onClick()}
                className=" my-4 sm:w-52 bg-blue-400 text-center text-white rounded-full cursor-pointer hover:bg-white border border-blue-400 hover:text-blue-400"
                >Submit Your Answer</div>
            </div>
            <Result {...result} />
        </div>
    )
}

export default Content