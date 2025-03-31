import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("❌ La variable de entorno MONGO_URI no está definida");
}

// Opciones de conexión para mongoose
const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Función para conectar a MongoDB
export async function run() {
  try {
    const connection = await mongoose.connect(uri, clientOptions);

    if (connection.connection.readyState !== 1) {
      throw new Error("❌ No se pudo conectar a la base de datos");
    }

    console.log("✅ Conexión exitosa con MongoDB");
    return connection;
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    throw error;
  }
}
