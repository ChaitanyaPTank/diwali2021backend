import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/diwali',
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
  pista_biscuit: Number,
  cholafali: Number,
  mathiya: Number,
}, {
  strict: false,
  timestamps: false,
  collection: 'orders',
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
  pista_biscuit: Number,
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
//   kaju_mesub: 85,
//   kaju_kasata: 56,
//   kaju_katri: 266,
//   anjeer_patra: 66,
//   surti_ghari: 101,
//   ghughra: 161,
//   khajur_roll: 106,
//   adadiya: 161,
//   mohanthal: 321,
//   sata: 176,
//   pauva_chevdo: 180,
//   tikha_gathiya: 83,
//   flower_gathiya: 50,
//   alu_sev: 153,
//   tikhi_papdi: 72,
//   tikhu_chavanu: 148,
//   nankhatai: 115,
//   pista_biscuit: 130,
//   cholafali: 96,
//   mathiya: 81,
// });


export const ordersModel = mongoose.model('orders', Orders);
export const stockModel = mongoose.model('stock', Stock);