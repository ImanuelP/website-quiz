interface TextInputProps {
    type?: string,
    name: string,
    onChange: Function
}
const TextInput: React.FC<TextInputProps> = (props) => {
    const {
        type = 'text',
        name = "",
        onChange,
     } = props;
    return (
        <input
            className="w-full border border-green-500 h-10 p-4 outline-green-500 focus:outline-green-800 rounded-md my-2"
            placeholder={name}
            type={type}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default TextInput;