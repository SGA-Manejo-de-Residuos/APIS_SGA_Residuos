const mongoose = require('mongoose');
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;

class DatabaseConexion {
  static instance
  constructor() {
    if (!!DatabaseConexion.instance) {
      return DatabaseConexion.instance;
    }
    this.isConnected = false;
    DatabaseConexion.instance=this
  }

  async connect() {
    try {
      if (!this.isConnected) {
        const uri = `mongodb://${username}:${password}@${host}:${port}/archivos`;
        await mongoose.connect(uri,{})
        this.isConnected = true;
        console.log('Conexión exitosa');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  disconnect() {
    if (this.isConnected) {
      mongoose.disconnect();
      this.isConnected = false;
      console.log('Desconexión exitosa');
    }
  }
}

module.exports = DatabaseConexion;
