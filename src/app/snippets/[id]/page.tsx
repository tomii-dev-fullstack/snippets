"use client";

import { useEffect, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";// Asegúrate de tener un botón estilizado
import clsx from "clsx";
import { Editor } from "@monaco-editor/react";
import Link from "next/link";
import InputEditor from "@/app/components/editor";
import { useParams } from "next/navigation";
import { inter, poppins } from "@/lib/fonts";
interface Snippet {
  title: string;
  code: string;
  description: string;
  language: string
}

interface Language {
  name: string;
  color: string;
}

const languages: Language[] = [
  { name: "JavaScript", color: "bg-yellow-500" },
  { name: "TypeScript", color: "bg-blue-500" },
  { name: "Python", color: "bg-green-500" }
];
export default function CodeEditor() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    code: "// Escribe tu código aquí...",
    language: "javascript",
  });



  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };



  const id = useParams<{ id: string }>();
  const [data, setData] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) return; // Si no hay id, no hacer la solicitud

    setLoading(true); // Resetear loading en cada búsqueda
    fetch(`/api/get_snippet?id=${id.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => {
        setData(data); // Guarda los datos de la respuesta
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // <-- ✅ Se añade `id` en dependencias para ejecutar cuando cambia

  // Si está cargando, muestra el mensaje de "Loading"
  if (loading) return <p>Loading...</p>;

  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;

  // Si no hay datos, muestra un mensaje
  if (!data) {
    return <p>No data available</p>;
  }

  // Formatea los datos para el editor (concatenando título y cuerpo)


  return (
    <div className="container max-w-7xl mt-10  mx-auto p-6 justify-center items-center min-h-screen">
      <div className="mb-10 flex items-center gap-3">
        <Link href={"/"} className="px-4 py-2 bg-transparent border border-gray-400 text-sm text-lg  rounded-lg hover:bg-gray-400 flex items-center">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <span className="text-sm sm:text-xl">Volver</span>

      </div>
      {/* Editor de Código */}
      <div className="flex flex-col justify-start sm:mb-5">
        <h2 className={`${inter.className} text-left flex-1 text-sm text-black font-bold sm:text-xl`}>{data.title}</h2>
        <p className={`${poppins.className} text-left flex-1 text-sm sm:text-lg min-h-32`}>{data.description}</p>

        <div className="flex flex-wrap gap-3  sm:mt-0 mb-5 sm:mb-0 justify-end md:justify-end items-center">
          {languages.map((lang, index) => (
            <div key={index} className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${lang.color} inline-block`}></span> {/* El punto */}
              <span className={`${poppins.className} text-xs sm:text-lg ml-2`}>{lang.name}</span> {/* El nombre del lenguaje */}
            </div>
          ))}
        </div>
      </div>




      <InputEditor snippet={data} onChange={(value) => handleChange("code", value || "")} />

    </div >
  );
}
