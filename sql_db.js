import sqlize from "sequelize";
const { Sequelize, DataTypes } = sqlize;


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'D:\\Chaitanya\\Projects\\Diwali2021\\db.sqlite',
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const ordersTable = sequelize.define('orders', {
  name: DataTypes.STRING,
  mobile: DataTypes.STRING,
  kaju_mesub: DataTypes.DECIMAL,
  kaju_kasata: DataTypes.DECIMAL,
  kaju_katri: DataTypes.DECIMAL,
  anjeer_patra: DataTypes.DECIMAL,
  surti_ghari: DataTypes.DECIMAL,
  ghughra: DataTypes.DECIMAL,
  khajur_roll: DataTypes.DECIMAL,
  adadiya: DataTypes.DECIMAL,
  mohanthal: DataTypes.DECIMAL,
  sata: DataTypes.DECIMAL,
  pauva_chevdo: DataTypes.DECIMAL,
  tikha_gathiya: DataTypes.DECIMAL,
  flower_gathiya: DataTypes.DECIMAL,
  alu_sev: DataTypes.DECIMAL,
  tikhi_papdi: DataTypes.DECIMAL,
  tikhu_chavanu: DataTypes.DECIMAL,
  nankhatai: DataTypes.DECIMAL,
  pista_biscuit: DataTypes.DECIMAL,
  cholafali: DataTypes.DECIMAL,
  mathiya: DataTypes.DECIMAL,
}, {
  timestamps: false
});


export default ordersTable;
