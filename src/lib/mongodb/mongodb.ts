import mongoose, { ConnectOptions } from 'mongoose';

const uri: string = "mongodb+srv://files:db_files@cluster0.wwpoqjz.mongodb.net/files?retryWrites=true&w=majority&appName=Cluster0";

// Opciones de conexión para mongoose
const clientOptions: ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

// Esta función devuelve la conexión de mongoose
export async function run() {
  try {
    const connection = await mongoose.connect(uri, clientOptions);

    // Verificamos si la conexión está lista
    if (connection.connection.readyState !== 1) {
      throw new Error('No se pudo conectar a la base de datos');
    }

    console.log("Conexión exitosa con MongoDB");
    return connection; // Devolvemos la conexión
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error; // Propagamos el error
  }
}
