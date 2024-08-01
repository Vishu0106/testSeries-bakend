
import express, { urlencoded } from 'express';
import cors from 'cors'
import userRoutes from './routes/user.routes.js';
import resultRoutes from './routes/result.routes.js';
import testRoutes from './routes/test.routes.js'; 
import { protect } from './middlewares/authentication.medileware.js';
import {config} from "dotenv"
config()

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/results',protect, resultRoutes);
app.use('/api/v1/tests', protect, testRoutes);







export { app } 