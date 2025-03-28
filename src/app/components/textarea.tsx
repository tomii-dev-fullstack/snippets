import { FC } from "react";

interface TextAreaProps {
  description: string;
  onChange: (value: string) => void;
}

const TextArea: FC<TextAreaProps> = ({ description, onChange }) => {
  return (
    <textarea
    placeholder="Descripción breve..."
    value={description}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 border rounded mb-3"
    rows={2}
  />
  );
};

export default TextArea;
