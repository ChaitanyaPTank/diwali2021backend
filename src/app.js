import express from "express";
import morgan from "morgan";
import cors from 'cors';
import controller from "./controller.js";
import path from "path";
import expressBasicAuth from "express-basic-auth";


const app = express();

if (!process.env.USER || !process.env.PASSWORD) {
  console.log('No Default User and Password provided in environment variable');
  throw 'No Default User and Password provided in environment variable';
}

const users = process.env.USER.split(',');
const password = process.env.PASSWORD.split(',');


if (users.length !== password.length) {
  console.log('Users and Password count does not match');
  throw 'Users and Password count does not match';
}

const userPasswordMap = users.reduce((acc, u, idx) => {
  acc[u] = password[idx]
  return acc;
}, {});




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(expressBasicAuth({ challenge: true, users: userPasswordMap }));


const router = express.Router();

router.post('/all', controller.getAll);
router.post('/submit-order', controller.submitOrder);
router.post('/add-order', controller.addNewOrder);
router.get('/get-stock', controller.getStock);
router.post('/new-orders', controller.getNewOrders);

app.use('/api', router);

app.use('/', express.static(path.join('frontend')));
app.use('/*', express.static(path.join('frontend')));

// app.get('/', (_req, res) => {
//   return res.send("Jay Swaminarayan");
// })

export default app;

// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// })
