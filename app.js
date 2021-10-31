import express from "express";
import morgan from "morgan";
import cors from 'cors';
import controller from "./controller.js";


const PORT = process.env.port || 80;


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.post('/all', controller.getAll);


app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})