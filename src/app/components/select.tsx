import { FC } from "react";

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
}

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded mb-3"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
