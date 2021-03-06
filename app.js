import express from "express";
import morgan from "morgan";
import cors from 'cors';
import controller from "./controller.js";


const PORT = process.env.port || 8085;


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.post('/all', controller.getAll);
app.post('/submit-order', controller.submitOrder);
app.get('/get-stock', controller.getStock);


app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})