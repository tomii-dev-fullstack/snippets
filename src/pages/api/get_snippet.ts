import Code from "@/lib/mongodb/models/code";
import { run } from "@/lib/mongodb/mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    // Conectar a la base de datos
    const dbConnection = await run(); // Si run() maneja la conexión de MongoDB, asegúrate de que sea asincrónica
    if (!dbConnection || !dbConnection.connection.readyState) {
      return res.status(500).json({ message: "No se pudo conectar a la base de datos" });
    }
    const { id } = req.query;
    if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: "ID no válido" });
    }
    
    // Buscar el documento por su _id
    const code = await Code.findById(id);
    console.log(code)

    // Si no se encuentra el documento
    if (!code) {
      return res.status(404).json({ message: "Código no encontrado" });
    }

    return res.status(200).json(code);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
}
