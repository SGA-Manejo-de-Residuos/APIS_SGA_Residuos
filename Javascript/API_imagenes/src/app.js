const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.static("src/public"))
app.use("/api/",require("./routes/imagenes"))
const DatabaseConexion =require("./database/DatabaseConexion")
const database = new DatabaseConexion();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const port = process.env.APP_PORT || 3001; 
app.listen(port);
database.connect()