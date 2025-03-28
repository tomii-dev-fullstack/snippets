import { FC } from "react";

interface SelectProps {
    language: string;
    onChange: (value: string) => void;
}

const Select: FC<SelectProps> = ({ language, onChange }) => {
    return (

        <select
            value={language}
            onChange={(value:any) => onChange(value.target.value)}
            className="w-full p-2 border rounded mb-3"
        >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
        </select>

    );
};

export default Select;
