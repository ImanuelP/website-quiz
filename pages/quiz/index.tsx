import { getCookie, hasCookie } from "cookies-next"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Headers from "../../components/common/header"
import Content from "../../components/content"
import { QuizProps } from "../../interface"

export async function getStaticProps() {
    const res = await fetch('https://opentdb.com/api.php?amount=50')
    const data = await res.json()
    return {
      props: {
        data: data.results,
      },
    }
  }

const Quiz: React.FC<QuizProps> = (data) => {
    useEffect(() => {
        const name = getCookie('token')?.toString()

        if (!hasCookie('token') || name?.length === 0) {
            toast.error('Please login first')
            window.location.assign('/')
        }
    },[])
    return (
        <div>
            <Headers />
            <Content data={data.data}/>
        </div>
    )
}

export default Quiz