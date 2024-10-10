import mongoose from 'mongoose';
const Schema = mongoose.Schema;


mongoose.connect(
  // 'mongodb://127.0.0.1:27017/amreli_diwali_2023',
  process.env.DB_URL,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info('Connected to database successfully');
  }
);


const ORDERS_DATA_MODAL = {
  name: String,
  mobile: String,
  undhiyu: Number,
  jalebi: Number,
  rotli: Number,
  kajukatri: Number,
  ghari: Number,
  magaj: Number,
  khajur_roll: Number,
  mohanthal: Number,
  sata: Number,
  ghughra: Number,
  motichur_ladu: Number,
  flower_gathiya: Number,
  bhavnagari_gathiya: Number,
  tikha_gathiya: Number,
  alusev: Number,
  tametasev: Number,
  surti_chavanu: Number,
  chakri: Number,
  shakkarpara: Number,
  ghau_puri: Number,
  tikho_pauva_chevdo: Number,
  mitho_pauva_chevdo: Number,
  tikhi_papdi: Number,
  moli_papdi: Number,
  dryfruit_cookies: Number,
  badam_cookies: Number,
  chocolate_biscuit: Number,
  pineapple_biscuit: Number,
  nankhatai: Number,
  pineapple_nankhatai: Number,
  kesar_nankhatai: Number,
  jira_khari: Number,
  masala_khari: Number,
  methi_khari: Number,
  cholafali: Number,
  mathiya: Number,
  ordered: Boolean
};


const Orders = new Schema({
  ...ORDERS_DATA_MODAL,
  ordered: {
    type: Boolean,
    default: false
  }
});


const newOrders = new Schema(ORDERS_DATA_MODAL);


const { name: _name, mobile: _mobile, ...STOCK_DATA_MODEL } = ORDERS_DATA_MODAL;
const Stock = new Schema(STOCK_DATA_MODEL);

/**
 * TO ADD ITEMS WITH PRICE FOR FINAL CALCULATIONS
 */
const Items = new Schema({
  name: String,
  price: Number
}, {
  collection: 'items'
})

const data = [
  { name: 'undhiyu', price: 130 },
  { name: 'jalebi', price: 230 },
  { name: 'rotli', price: 12 },
  { name: 'kajukatri', price: 400 },
  { name: 'ghari', price: 400 },
  { name: 'magaj', price: 180 },
  { name: 'khajur_roll', price: 200 },
  { name: 'mohanthal', price: 200 },
  { name: 'sata', price: 120 },
  { name: 'ghughra', price: 220 },
  { name: 'motichur_ladu', price: 140 },
  { name: 'flower_gathiya', price: 100 },
  { name: 'bhavnagari_gathiya', price: 100 },
  { name: 'tikha_gathiya', price: 100 },
  { name: 'alusev', price: 100 },
  { name: 'tametasev', price: 100 },
  { name: 'surti_chavanu', price: 100 },
  { name: 'chakri', price: 150 },
  { name: 'shakkarpara', price: 110 },
  { name: 'ghau_puri', price: 130 },
  { name: 'tikho_pauva_chevdo', price: 100 },
  { name: 'mitho_pauva_chevdo', price: 100 },
  { name: 'tikhi_papdi', price: 100 },
  { name: 'moli_papdi', price: 100 },
  { name: 'dryfruit_cookies', price: 220 },
  { name: 'badam_cookies', price: 200 },
  { name: 'chocolate_biscuit', price: 180 },
  { name: 'pineapple_biscuit', price: 160 },
  { name: 'nankhatai', price: 120 },
  { name: 'pineapple_nankhatai', price: 140 },
  { name: 'kesar_nankhatai', price: 160 },
  { name: 'jira_khari', price: 125 },
  { name: 'masala_khari', price: 125 },
  { name: 'methi_khari', price: 125 },
  { name: 'cholafali', price: 130 },
  { name: 'mathiya', price: 130 },
];

mongoose.model('items', Items).insertMany(data);


// mongoose.model('stock', Stock).create({
//   surti_ghari: 0,
//   kajukatri: 0,
//   kaju_mesub: 0,
//   kaju_kasata: 0,
//   anjeer_patra: 0,
//   motichur_ladu: 0,
//   gughra: 0,
//   magas: 0,
//   mohanthal: 0,
//   sata: 0,
//   plain_halvo: 0,
//   pineapple_halvo: 0,
//   sandvich_halvo: 0,
//   flower_gathiya: 0,
//   tikha_gathiya: 0,
//   nylon_gathiya: 0,
//   alu_sev: 0,
//   ratlami_sev: 0,
//   tometo_sev: 0,
//   tikhi_papdi: 0,
//   dry_kachori: 0,
//   chakri: 0,
//   ghau_msalapuri: 0,
//   fulwadi: 0,
//   nadiyadi_chavanu: 0,
//   navratna_chavanu: 0,
//   moli_papdi: 0,
//   pauva_chevdo: 0,
//   nankhatai: 0,
//   dryfruit_biscuit: 0,
//   badam_biscuit: 0,
//   pineapple_biscuit: 0,
//   jira_khari: 0,
//   cholafali: 0,
//   mathiya: 0
// });



export const ordersModel = mongoose.model('orders', Orders);
export const stockModel = mongoose.model('stock', Stock);
export const newOrdersModel = mongoose.model('new_orders', newOrders);


// const orders = (await ordersModel.find()).map(order => order._id);
//
// console.log(await ordersModel.updateOne({ _id: orders[0] }, { ordered: false }));
//
// orders.forEach(async order => {
//   await ordersModel.updateOne({ _id: order }, { ordered: false });
// });
//
//
// (async () => {
//   const orders = await ordersModel.find();
//
//   const filtered = orders.filter(e => {
//     return e.alusev || e.ratlamisev
//   });
//
//   console.log(filtered.length);
//
//   const updated = filtered.map(e => {
//     const alusev = (e.alusev && Math.round(e.alusev / 0.2)) || 0;
//     const ratlamisev = (e.ratlamisev && Math.round(e.ratlamisev / 0.2)) || 0;
//     const newOrder = JSON.parse(JSON.stringify(e));
//     alusev && (newOrder.alusev = (newOrder.alusev || 0) + (alusev * 0.05))
//     ratlamisev && (newOrder.ratlamisev = (newOrder.ratlamisev || 0) + (ratlamisev * 0.05))
//     return newOrder;
//   });
//
//   updated.forEach(async order => {
//     await ordersModel.findOneAndUpdate({ _id: order._id }, order);
//   });
//
// })();
//






// anjir_patra,
//   kajukasata,
//   ghughra,
//   magas,
//   toprapak,
//   churma_ladu,
//   kesar_badam_pista,
//   kajukatri,
//   khajur_roll,
//   mohanthal,
//   sata,
//   motichur_ladu,
//   chavanu_mithu,
//   chvanu_tikhu,
//   chavanu_surti,
//   ghau_masala_puri,
//   sakkarpara,
//   pauva_chevdo_tikho,
//   pauva_chevdo_mitho,
//   tikh_zina_gathiya,
//   chakri,
//   tikhi_papdi,
//   moli_papdi,
//   flower_gathiya,
//   alusev,
//   ratlami_sev,
//   plain_halvo,
//   pineapple_halvo,
//   sandwich_halvo,
//   dryfruit_cookies,
//   badam_cookies,
//   nankhatai,
//   jira_khari,
//   cholafali,
//   mathiya,
//   ordered,
