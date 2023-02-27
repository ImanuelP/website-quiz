interface ButtonProps {
    id?: string | number,
    onclick?: () => void,
    children?: string
}
const Button: React.FC<ButtonProps> = (props) => {
    const { id, onclick, children } =props;
    return <button
    key={id}
    onClick={onclick}
    className="w-full my-2 sm:my-0 sm:w-28 border border-blue-400 rounded-md h-8 hover:bg-blue-400 hover:text-white"
    >
    {children}
  </button>
}

export default Button;