import React, { useEffect, useState } from 'react';
interface Snippet {
    title: string;
    body: string;
}
const MyComponent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamada a tu API personalizada
        fetch('/api/snippets')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
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
    }, []);
    console.log(JSON.stringify(data))
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        {/* Asegúrate de que 'data' sea un array antes de intentar iterar */}
        {data && data.length > 0 ? (
            data.slice(0,1).map((s: Snippet, index:number) => (
                <div key={index}>
                    <h1>{s.title}</h1>
                    <p>{s.body}</p>
                </div>
            ))
        ) : (
            <p>No data available</p>
        )}
    </div>
    );
};

export default MyComponent;
