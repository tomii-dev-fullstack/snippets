"use client";

import { FC, useState } from "react";
import Input from "./input";
import TextArea from "./textarea";
import Select from "./select";
import ButtonComponent from "./button";
import InputEditor from "./editor";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, code: string, language: string) => void;
}

const ModalComponent: FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    code: "// Escribe tu código aquí...",
    language: "javascript",
  });

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    onSave(formState.title, formState.description, formState.code, formState.language);

    try {
      // Realiza la solicitud POST a la API de Next.js
      const res = await fetch("/api/post_snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formState }),
      });

      if (res.ok) {
        alert("Código subido exitosamente!");
      } else {
        alert("Error al subir el código.");
      }
    } catch (error) {
      console.log("Hubo un error al subir el código.");
      console.error(error);
    }
  };

  /*   onClose(); */


  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-sm shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-10">Agregar código</h2>
        <form onSubmit={handleSave}>
          <Input title={formState.title} onChange={(value) => handleChange("title", value)} />
          <TextArea description={formState.description} onChange={(value) => handleChange("description", value)} />
          <Select language={formState.language} onChange={(value) => handleChange("language", value)} />
          <div className="border rounded-lg overflow-hidden mb-3">
            <InputEditor snippet={formState} onChange={(value) => handleChange("code", value || "")} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <ButtonComponent handleSave={handleSave} onClose={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
