import { FC } from "react";

interface InputProps {
  title: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({ title, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Título del fragmento"
      value={title}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded mb-3"
    />
  );
};

export default Input;
