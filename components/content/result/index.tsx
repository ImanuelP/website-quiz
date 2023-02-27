import { Fragment } from "react";
import Button from "../../common/button";
import Modal from "../../common/modal"

interface ResultProps{
    open: 'hidden' | 'visible' | any,
    score: number,
    total: number,
    answers?: number,
}
const Result: React.FC<ResultProps> = (props) => {
    const { open, score, total, answers } = props;
    const style="text-bold text-xl"
    return (
        <Modal open={open} onClose={() => location.reload()} key={1} title="Score">
            <Fragment>
                <div className="text-blue-700 font-semibold text-xl">Thank you for completing our quiz.</div>
                <div>You have answered <span className={style}>{answers}</span> from <span className={style}>{total}</span> question</div>
                <div>Your result: <span className="text-xl font-bold text-blue-800 underline">{score}</span></div>
                <div>Thanyou</div>
                <Button onclick={() => location.reload()}>Close</Button>
            </Fragment>
        </Modal>
    )
}

export default Result;