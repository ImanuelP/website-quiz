import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Headers: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [modal, setModal] = useState('hidden')
    useEffect(() => {
        const names = getCookie('name')
        if (names) {
            setName(names?.toString())
        }
    }, [])

    const controlModal = () => {
        if (modal === 'hidden') {
            setModal('visible')
        } else {
            setModal('hidden')
        }
    }

    const logout = () => {
        setCookie('token', '');
        setCookie('name', '');
        window.location.assign('/')
    }

    return (
        <div>
            <div
                className="w-full bg-blue-400 text-white flex justify-between items-center py-4 px-10"
            >
                <div>Quiz Test</div>
                <div>
                    <div className="rounded-full bg-blue-800 h-10 flex justify-center items-center w-10 cursor-pointer" onClick={() => controlModal()}>
                        {name[0]?.toLocaleUpperCase()}
                    </div>
                </div>
            </div>
            <div className={`${modal} w-40 p-3 -mt-6 right-8 rounded-md absolute bg-white shadow-2xl`} data-modal-show="true">
                <label>{name}</label>
                <hr className="my-2" />
                <div className="hover:bg-blue-500 hover:text-white rounded-sm cursor-pointer w-full"
                onClick={() => logout()}
                >Logout</div>
            </div>
        </div>
    )
}

export default Headers;
