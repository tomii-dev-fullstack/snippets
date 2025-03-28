'use client'; // Asegúrate de que esto esté al principio del archivo

import { useState, useEffect } from "react";
import ModalComponent from "@/app/components/modal"; // Asegúrate de que la ruta sea correcta
import Link from "next/link";
import { Inter, Poppins, Roboto } from "next/font/google";
import { inter, poppins, roboto } from "@/lib/fonts";

interface Snippet {
    _id?: string
    title: string;
    description: string;
    language: string;
}

interface Language {
    name: string;
    color: string;
}

const languages: Language[] = [
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Python", color: "bg-purple-500" }
];

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<Snippet[]>([]); // Cambié el tipo a array de Snippet
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true); // Resetear loading en cada búsqueda
        fetch(`/api/get_snippets`)
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
    }, []); // Se ejecuta una sola vez al cargar el componente

    // Si está cargando, muestra el mensaje de "Loading"
    if (loading) return <p>Cargando...</p>;

    // Si hay un error, muestra el mensaje de error
    if (error) return <p>{error}</p>;

    // Si no hay datos, muestra un mensaje
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles</p>;
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const onSave = () => { };

    return (
        <div className="container max-w-7xl mx-auto p-6 min-h-screen">
            {/* Fila con el botón de "+" alineado a la derecha */}
            <div className="flex justify-between items-center mb-10">
                <h1 className={`${inter.className} text-4xl font-bold text-gray-800`}>
                    Tus snippets
                </h1>

                <div className="flex justify-end gap-2 items-center">
                    <button
                        onClick={openModal}
                        className="w-auto py-2 px-5 rounded-full cursor-pointer bg-gray-900 text-white flex items-center justify-center"
                    >
                        Crear
                        <span className="ml-2">
                            <i className="fa-solid fa-add"></i>
                        </span>
                    </button>
                </div>
            </div>

            {/* Modal */}
            <ModalComponent onSave={onSave} isOpen={isModalOpen} onClose={closeModal} />

            {/* Renderizar datos si están disponibles */}
            {data.length > 0 ? (
                <table className="min-w-full rounded-lg  bg-gray-50">
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    <Link
                                        href={`/snippets/${d._id}`} // Cambié `post.id` a `d.title` para un enlace con el título
                                        className={`${roboto.className} text-lg text-gray-800 hover:text-blue-800 `}
                                    >
                                        {d.title}
                                    </Link>
                                  
                                </td>
                              {/*   <td className="px-6 py-4 text-sm text-gray-800">{d.language}</td> */}
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    {languages
                                        .map((language, index) => (
                                            <span
                                                key={index}
                                                className={`inline-block ${language.color} text-gray-700 bg-gray-100 text-xs px-2 py-1 rounded-full mr-2`}
                                            >
                                                {language.name}
                                            </span>
                                        ))}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    <span className="bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                                        <i className="fa-solid fa-trash text-sm"></i>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-600 mt-4">Cargando datos...</div>
            )}
        </div>
    );
}
