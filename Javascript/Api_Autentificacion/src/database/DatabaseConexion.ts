import mongoose from 'mongoose';

const username = process.env.MONGO_USER || '';
const password = process.env.MONGO_PASSWORD || '';
const host = process.env.MONGO_HOST || '';
const port = process.env.MONGO_PORT || '';

class DatabaseConexion {
  private static instance: DatabaseConexion;
  private isConnected: boolean;

  public constructor() {
    this.isConnected = false;
  }

  public static getInstance(): DatabaseConexion {
    if (!DatabaseConexion.instance) {
      DatabaseConexion.instance = new DatabaseConexion();
    }
    return DatabaseConexion.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.isConnected) {
        //const uri = `mongodb://${username}:${password}@${host}:${port}`;
        const uri = `mongodb://${host}:${port}`;
        console.log('Connecting to MongoDB with URI:', uri);
        await mongoose.connect(uri, { dbName: 'userapp' });
        this.isConnected = true;
        console.log('Conexión exitosa');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  public disconnect(): void {
    if (this.isConnected) {
      mongoose.disconnect();
      this.isConnected = false;
      console.log('Desconexión exitosa');
    }
  }
}

export default DatabaseConexion;
