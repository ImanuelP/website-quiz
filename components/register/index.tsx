import { Fragment, useState } from "react";
import Button from "../common/button";
import { toast } from "react-toastify";
import Modal from "../common/modal"
import TextInput from "../common/textinput";

interface RegisterProps {
    open?: 'hidden' | 'visible' | any,
    title: string,
    onClose: () => void
}
const Register: React.FC<RegisterProps> = (props) => {
    const { open, title, onClose } = props;
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    function onSubmit() {
        const data = {
            nama: name,
            password: password
        }
        const db = localStorage.getItem('member')
        if (db) {
            const newDb = JSON.parse(db)
            newDb.push(data)
            const format = JSON.stringify(newDb)
            localStorage.setItem('member', format)
        } else {
            const dataJson = JSON.stringify(data)
            localStorage.setItem('member', `[${dataJson}]`)
        }
        toast.success('Successfully creating me, please login')
        onClose()
    }
    return (
        <Modal open={open} title={title} onClose={onClose}>
            <Fragment>
                <div>
                    <TextInput name={'Name'} onChange={setName} />
                    <TextInput name={'Password'} type="password" onChange={setPassword} />
                    <div className="w-full text-center">
                        <Button
                        onclick={() => onSubmit()}
                        >Save</Button>
                    </div>
                </div>
            </Fragment>
        </Modal>
    )
}

export default Register;