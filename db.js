import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// mongoose.connect('mongodb://localhost:27017/diwali',
mongoose.connect(`mongodb+srv://chaitanya:%40Akshardham@mandir.6mpry.mongodb.net/diwali?authSource=admin&replicaSet=atlas-i6i4zx-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
  (err) => {
    if (err)
      console.log(err);
  });

const Orders = new Schema({
  name: String,
  mobile: String,
  kaju_mesub: Number,
  kaju_kasata: Number,
  kaju_katri: Number,
  anjeer_patra: Number,
  surti_ghari: Number,
  ghughra: Number,
  khajur_roll: Number,
  adadiya: Number,
  mohanthal: Number,
  sata: Number,
  pauva_chevdo: Number,
  tikha_gathiya: Number,
  flower_gathiya: Number,
  alu_sev: Number,
  tikhi_papdi: Number,
  tikhu_chavanu: Number,
  nankhatai: Number,
  pista_biscuits: Number,
  cholafali: Number,
  mathiya: Number,
}, {
  strict: false,
  timestamps: false,
  collection: 'orders',
});

const newOrders = new Schema({
  name: String,
  mobile: String,
  kaju_mesub: Number,
  kaju_kasata: Number,
  kaju_katri: Number,
  anjeer_patra: Number,
  surti_ghari: Number,
  ghughra: Number,
  khajur_roll: Number,
  adadiya: Number,
  mohanthal: Number,
  sata: Number,
  pauva_chevdo: Number,
  tikha_gathiya: Number,
  flower_gathiya: Number,
  alu_sev: Number,
  tikhi_papdi: Number,
  tikhu_chavanu: Number,
  nankhatai: Number,
  pista_biscuits: Number,
  cholafali: Number,
  mathiya: Number,
}, {
  strict: false,
  timestamps: false,
  collection: 'new_orders',
});

const Stock = new Schema({
  kaju_mesub: Number,
  kaju_kasata: Number,
  kaju_katri: Number,
  anjeer_patra: Number,
  surti_ghari: Number,
  ghughra: Number,
  khajur_roll: Number,
  adadiya: Number,
  mohanthal: Number,
  sata: Number,
  pauva_chevdo: Number,
  tikha_gathiya: Number,
  flower_gathiya: Number,
  alu_sev: Number,
  tikhi_papdi: Number,
  tikhu_chavanu: Number,
  nankhatai: Number,
  pista_biscuits: Number,
  cholafali: Number,
  mathiya: Number,
}, {
  collection: 'stock'
});

// const data = [
//   { name: "kaju_mesub", price: 450 },
//   { name: "kaju_kasata", price: 400 },
//   { name: "kaju_katri", price: 360 },
//   { name: "anjeer_patra", price: 400 },
//   { name: "surti_ghari", price: 320 },
//   { name: "ghughra", price: 210 },
//   { name: "khajur_roll", price: 200 },
//   { name: "adadiya", price: 200 },
//   { name: "mohanthal", price: 150 },
//   { name: "sata", price: 100 },
//   { name: "pauva_chevdo", price: 75 },
//   { name: "tikha_gathiya", price: 80 },
//   { name: "flower_gathiya", price: 80 },
//   { name: "alu_sev", price: 80 },
//   { name: "tikhi_papdi", price: 90 },
//   { name: "tikhu_chavanu", price: 80 },
//   { name: "nankhatai", price: 90 },
//   { name: "pista_biscuit", price: 90 },
//   { name: "cholafali", price: 110 },
//   { name: "mathiya", price: 110 },
// ]
// mongoose.model('items', Items).insertMany(data);


// mongoose.model('stock', Stock).create({
//   "kaju_mesub": 69,
//   "kaju_kasata": 44,
//   "kaju_katri": 202.5,
//   "anjeer_patra": 54,
//   "surti_ghari": 75,
//   "ghughra": 126,
//   "khajur_roll": 80,
//   "adadiya": 112.5,
//   "mohanthal": 227,
//   "sata": 140,
//   "pauva_chevdo": 145,
//   "tikha_gathiya": 70.5,
//   "flower_gathiya": 43.5,
//   "alu_sev": 117,
//   "tikhi_papdi": 57,
//   "tikhu_chavanu": 114.5,
//   "nankhatai": 86,
//   "pista_biscuits": 101,
//   "cholafali": 70,
//   "mathiya": 60.5,
// });



export const ordersModel = mongoose.model('orders', Orders);
export const stockModel = mongoose.model('stock', Stock);
export const newOrdersModel = mongoose.model('new_orders', newOrders);