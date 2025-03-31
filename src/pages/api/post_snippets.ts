import { NextApiRequest, NextApiResponse } from "next";
import { run } from '../../lib/mongodb/mongodb'; // Asegúrate que esta función es asincrónica
import Code from "@/lib/mongodb/models/code"; // Asegúrate que el modelo Code esté bien importado

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificamos si el método de la solicitud es POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // Llamamos a la función para conectar con la base de datos
    const dbConnection = await run(); // Si run() maneja la conexión de MongoDB, asegúrate de que sea asincrónica

    // Verifica si la conexión es exitosa
    if (!dbConnection || !dbConnection.connection.readyState) {
      return res.status(500).json({ message: "No se pudo conectar a la base de datos" });
    }

    // Accedemos al cuerpo de la solicitud
    const { formState } = req.body;

    // Creamos un nuevo documento en la base de datos
    const newCode = new Code({
      title: formState.title,
      description: formState.description,
      code: formState.code,
      language: formState.language,
      type: formState.type
    });

    // Guardamos el documento
    await newCode.save();

    // Respondemos que el código fue creado correctamente
    return res.status(201).json({ message: 'Código creado correctamente', data: newCode });
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    // Si hay un error, respondemos con un error 500
    return res.status(500).json({ message: "Error al subir el archivo" });
  }
}

export default handler;
