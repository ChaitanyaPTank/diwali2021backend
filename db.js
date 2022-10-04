import mongoose from 'mongoose';
const Schema = mongoose.Schema;


mongoose.connect(
  'mongodb://localhost:27017/DUSSERA2022',
  (err) => {
    if (err)
      console.log(err);
  }
);


const ORDERS_DATA_MODAL = {
  name: String,
  mobile: String,
  sata: Number,
  mohanthal: Number,
  magas: Number,
  gulab_jamun: Number,
  motichur_ladu: Number,
  churma_ladu: Number,
  dudh_na_penda: Number,
  surti_ghari: Number,
  kaju_katri: Number,
  kaju_mesub: Number,
  pauva_chavdo: Number,
  bhanagari_gathiya: Number,
  tikha_ganthiya: Number,
  naylon_ganthiya: Number,
  ratlami_sev: Number,
  tikhi_papdi: Number,
  moli_papdi: Number,
  sev_regular: Number,
  khari: Number,
  dry_kachori: Number,
  fulvadi: Number,
  nadiyadi_chavanu: Number,
  navratna_chavanu: Number,
  nankhatai: Number,
  dry_fruit_biscuit: Number,
  badam_biscuit: Number,
  black_berry_biscuit: Number,
  undhiyu: Number,
  jalebi: Number
};


const Orders = new Schema({
  ...ORDERS_DATA_MODAL,
  ordered: {
    type: Boolean,
    default: false
  }
});


const newOrders = new Schema(ORDERS_DATA_MODAL);


const { name: _name, mobile: _mobile, STOCK_DATA_MODEL } = ORDERS_DATA_MODAL;
const Stock = new Schema(STOCK_DATA_MODEL);

/**
 * TO ADD ITEMS WITH PRICE FOR FINAL CALCULATIONS
 */
// const Items = new Schema({
//   name: String,
//   price: Number
// }, {
//   collection: 'items'
// })

// const data = [
//   { name: "sata", price: 10 },
//   { name: "mohanthal", price: 10 },
//   { name: "magas", price: 10 },
//   { name: "gulab_jamun", price: 10 },
//   { name: "motichur_ladu", price: 10 },
//   { name: "churma_ladu", price: 10 },
//   { name: "dudh_na_penda", price: 10 },
//   { name: "surti_ghari", price: 10 },
//   { name: "kaju_katri", price: 10 },
//   { name: "kaju_mesub", price: 10 },
//   { name: "pauva_chavdo", price: 10 },
//   { name: "bhanagari_gathiya", price: 10 },
//   { name: "tikha_ganthiya", price: 10 },
//   { name: "naylon_ganthiya", price: 10 },
//   { name: "ratlami_sev", price: 10 },
//   { name: "tikhi_papdi", price: 10 },
//   { name: "moli_papdi", price: 10 },
//   { name: "sev_regular", price: 10 },
//   { name: "khari", price: 10 },
//   { name: "dry_kachori", price: 10 },
//   { name: "fulvadi", price: 10 },
//   { name: "nadiyadi_chavanu", price: 10 },
//   { name: "navratna_chavanu", price: 10 },
//   { name: "nankhatai", price: 10 },
//   { name: "dry_fruit_biscuit", price: 10 },
//   { name: "badam_biscuit", price: 10 },
//   { name: "black_berry_biscuit", price: 10 }
// ]
// mongoose.model('items', Items).insertMany(data);


// mongoose.model('stock', Stock).create({
//   "sata": 10,
//   "mohanthal": 10,
//   "magas": 10,
//   "gulab_jamun": 10,
//   "motichur_ladu": 10,
//   "churma_ladu": 10,
//   "dudh_na_penda": 10,
//   "surti_ghari": 10,
//   "kaju_katri": 10,
//   "kaju_mesub": 10,
//   "pauva_chavdo": 10,
//   "bhanagari_gathiya": 10,
//   "tikha_ganthiya": 10,
//   "naylon_ganthiya": 10,
//   "ratlami_sev": 10,
//   "tikhi_papdi": 10,
//   "moli_papdi": 10,
//   "sev_regular": 10,
//   "khari": 10,
//   "dry_kachori": 10,
//   "fulvadi": 10,
//   "nadiyadi_chavanu": 10,
//   "navratna_chavanu": 10,
//   "nankhatai": 10,
//   "dry_fruit_biscuit": 10,
//   "badam_biscuit": 10,
//   "black_berry_biscuit": 10
// });



export const ordersModel = mongoose.model('orders', Orders);
export const stockModel = mongoose.model('stock', Stock);
export const newOrdersModel = mongoose.model('new_orders', newOrders);