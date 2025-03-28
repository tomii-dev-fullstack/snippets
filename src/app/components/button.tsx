import { FC } from "react";

interface ButtonProps {
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

const ButtonComponent: FC<ButtonProps> = ({ handleSave, onClose }) => {

    return (
        <div className="flex gap-2">
            {/* Botón de Cancelar */}
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                Cancelar
            </button>

            {/* Botón de Guardar */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Guardar
            </button>
        </div>
    );
};

export default ButtonComponent;
