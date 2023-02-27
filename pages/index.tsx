import { useState } from "react"
import Button from "../components/common/button";
import TextInput from "../components/common/textinput"
import Register from "../components/register";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

export default function Home() {
  const [register, setRegister] = useState('hidden')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const messageError = () => toast.error('The account is not found, check the name and password again. Or re -register.')
  function onClick() {
    const member = localStorage.getItem('member') || '[]'
    const members = JSON.parse(member)
    if (members.length === 0) {
      messageError()
    } else {
      const names = members.filter((row: any) => row.nama === name);
      if (names.length === 0) {
        messageError()
      } else {
        const passwords = names.filter((row: any) => row.password === password)
        if (passwords.length === 0) {
          messageError()
        } else {
          setCookie('token', `authorization_sederhana:_untuk_test:name${name}`);
          setCookie('name', name);
          toast.success('Login success')
          window.location.assign('/quiz')
        }
      }
    }
  }
  const buttons = [
    {name: 'Register', onclick: () => setRegister('visible')},
    {name: 'Login', onclick: () => onClick()}
  ];


  return (
    <div className='absolute h-full w-full bg-gray-200 flex justify-center items-center'>
      <div className="w-[400px] p-4">
        <div className="text-center my-4 w-full text-5xl font-bold text-green-800">Test Quiz</div>
        <TextInput name={'Name'}  onChange={setName} />
        <TextInput name={'Password'} type="password"  onChange={setPassword} />
        <div className="sm:flex sm:justify-between my-2">
          {buttons.map((row: any, index: number) => (
            <Button id={index} key={index} onclick={row.onclick}>
              {row.name}
            </Button>
          ))}
        </div>
      </div>
      <Register
        onClose={() => setRegister('hidden')}
        title={'Register'}
        open={register}
      />
    </div>
  )
}
