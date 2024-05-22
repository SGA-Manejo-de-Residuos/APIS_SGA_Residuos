import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",require("./routes/auth"))
import DatabaseConexion from "./database/DatabaseConexion";
import {Request,Response} from 'express';
const database = DatabaseConexion.getInstance();
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.APP_PORT || 3001; 
app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
database.connect()
