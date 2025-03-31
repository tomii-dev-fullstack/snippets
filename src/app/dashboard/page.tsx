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
    type: "file" | "component"
}



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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const onSave = () => { };
    console.log(data)
    return (
        <div className="container max-w-7xl mx-auto  min-h-screen">
            {/* Fila con el botón de "+" alineado a la derecha */}
            <div className="flex justify-between items-center mb-10">
                <h1 className={`${inter.className} text-lg sm:text-4xl font-bold text-gray-800`}>
                    Tus snippets
                </h1>

                <div className="flex justify-end gap-2 items-center">
                    <button
                        onClick={openModal}
                        className="text-xs sm:text-lg w-auto py-2 px-5 rounded-full cursor-pointer bg-gray-900 text-white flex items-center justify-center"
                    >
                        Crear snippet
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
                <ul className="rounded-sm border border-gray-300 bg-gray-50">
                    {data.map((d) => (
                        <li key={d._id} className="flex justify-between p-4 hover:bg-gray-100">
                            <div className="text-gray-800">
                                <Link
                                    href={`/snippets/${d._id}`}
                                    className={`text-sm sm:text-lg text-gray-800 hover:text-blue-800 ${poppins.className}`}
                                >
                                    {d.title}
                                </Link>
                                <span className={`ml-5 rounded-full px-2 text-sm text-gray-800 bg-gray-200 border border-gray-400 ${roboto.className}`}>
                                    {d.type === "file" ? "Archivo" : "Componente"}
                                </span>
                            </div>
                            <button className="bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
                                <i className="fa-solid fa-trash text-xs"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-600 mt-4">Cargando datos...</div>
            )}
        </div>
    );
}
