import { ordersModel, stockModel } from "./db.js";
// import sequelize from 'sequelize';
// const Op = sequelize.Op;

// const file = await fs.readFile('D:/Chaitanya/Projects/Diwali2021/exported.csv');
// const data = file.toString().split("\n").slice(1);
// const splitted = data.map(row => {
//   return row.split(",");
// });
// console.log(splitted[0]);


const errorResponse = async (
  req, res,
  data = {},
  message = MSG.SOMETHING_WRONG,
  code = 500,
) => {
  return res.status(code).send({ data, message });
};


const successResponse = async (
  req, res,
  data = {},
  message = MSG.SUCC,
  code = 200,
) => {
  return res.status(code).send({ data, message });
};


export default {
  getAllUnordered: async (req, res) => {
    try {
      const {
        search
      } = req.body;
      const query = { ordered: false };
      if (search) {
        query["$or"] = [
          { name: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } }
        ]
      }
      if (mobile) {
        query["or"] = {
          mobile: { regex: mobile, $options: "i" },
        }
      }

      const data = await ordersModel.find(query);
      if (!data) {
        return errorResponse(req, res, {}, "Error while fetching data.", 500);
      }
      return successResponse(req, res, data, "Success.");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message, 500);
    }
  },


  getAll: async (req, res) => {
    try {
      console.log(req.body);
      const {
        search,
        limit,
        ordered,
      } = req.body;
      const query = {
        $and: [{
          $or: [
            { ordered: false },
          ]
        }]
      };
      if (ordered) {
        query["$and"][0]["$or"].push({ ordered: true });
      }
      if (search) {
        query["$and"].push({
          "$or": [
            { name: { $regex: search, $options: "i" } },
            { mobile: { $regex: search, $options: "i" } }
          ]
        });
      }

      const data = await ordersModel
        .find(query)
        .limit(limit)
        .sort({ name: 1 });

      if (!data) {
        return errorResponse(req, res, {}, "Error while fetching data.", 500);
      }
      return successResponse(req, res, data, "Success.");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message, 500);
    }
  },


  submitOrder: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      const updated = await ordersModel.findByIdAndUpdate(
        id,
        { ordered: true },
        { new: true }
      );
      if (!updated) {
        return errorResponse(req, res, {}, "Error while updating order.");
      }
      return successResponse(req, res, {}, "Update successful.");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  },


  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await ordersModel.findById(id);
      if (!order) {
        return errorResponse(req, res, {}, "No order found.");
      }
      return successResponse(req, res, order, "Success.");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  },


  getStock: async (req, res) => {
    try {

      const [{ _id, __v, ...stock }] = await stockModel.find({}, {}, { lean: true });
      const data = await ordersModel.aggregate([
        {
          $group: {
            _id: "$ordered",
            kaju_mesub: { $sum: { $cond: [{ $ne: ["$kaju_mesub", ""] }, { $toDouble: "$kaju_mesub" }, 0] } },
            kaju_kasata: { $sum: { $cond: [{ $ne: ["$kaju_kasata", ""] }, { $toDouble: "$kaju_kasata" }, 0] } },
            kaju_katri: { $sum: { $cond: [{ $ne: ["$kaju_katri", ""] }, { $toDouble: "$kaju_katri" }, 0] } },
            anjeer_patra: { $sum: { $cond: [{ $ne: ["$anjeer_patra", ""] }, { $toDouble: "$anjeer_patra" }, 0] } },
            surti_ghari: { $sum: { $cond: [{ $ne: ["$surti_ghari", ""] }, { $toDouble: "$surti_ghari" }, 0] } },
            ghughra: { $sum: { $cond: [{ $ne: ["$ghughra", ""] }, { $toDouble: "$ghughra" }, 0] } },
            khajur_roll: { $sum: { $cond: [{ $ne: ["$khajur_roll", ""] }, { $toDouble: "$khajur_roll" }, 0] } },
            adadiya: { $sum: { $cond: [{ $ne: ["$adadiya", ""] }, { $toDouble: "$adadiya" }, 0] } },
            mohanthal: { $sum: { $cond: [{ $ne: ["$mohanthal", ""] }, { $toDouble: "$mohanthal" }, 0] } },
            sata: { $sum: { $cond: [{ $ne: ["$sata", ""] }, { $toDouble: "$sata" }, 0] } },
            pauva_chevdo: { $sum: { $cond: [{ $ne: ["$pauva_chevdo", ""] }, { $toDouble: "$pauva_chevdo" }, 0] } },
            tikha_gathiya: { $sum: { $cond: [{ $ne: ["$tikha_gathiya", ""] }, { $toDouble: "$tikha_gathiya" }, 0] } },
            flower_gathiya: { $sum: { $cond: [{ $ne: ["$flower_gathiya", ""] }, { $toDouble: "$flower_gathiya" }, 0] } },
            alu_sev: { $sum: { $cond: [{ $ne: ["$alu_sev", ""] }, { $toDouble: "$alu_sev" }, 0] } },
            tikhi_papdi: { $sum: { $cond: [{ $ne: ["$tikhi_papdi", ""] }, { $toDouble: "$tikhi_papdi" }, 0] } },
            tikhu_chavanu: { $sum: { $cond: [{ $ne: ["$tikhu_chavanu", ""] }, { $toDouble: "$tikhu_chavanu" }, 0] } },
            nankhatai: { $sum: { $cond: [{ $ne: ["$nankhatai", ""] }, { $toDouble: "$nankhatai" }, 0] } },
            pista_biscuits: { $sum: { $cond: [{ $ne: ["$pista_biscuits", ""] }, { $toDouble: "$pista_biscuits" }, 0] } },
            pista_biscuit: { $sum: { $cond: [{ $ne: ["$pista_biscuit", ""] }, { $toDouble: "$pista_biscuit" }, 0] } },
            cholafali: { $sum: { $cond: [{ $ne: ["$cholafali", ""] }, { $toDouble: "$cholafali" }, 0] } },
            mathiya: { $sum: { $cond: [{ $ne: ["$mathiya", ""] }, { $toDouble: "$mathiya" }, 0] } },
          }
        },
        {
          $addFields: {
            ordered: "$_id",
          }
        },
        {
          $project: {
            _id: 0,
            __v: 0,
          }
        }
      ]);

      const [order] = data.filter(item => item.ordered === true);
      console.log(order)

      for (let item in stock) {
        stock[item] -= order[item]
      }

      return successResponse(req, res, { stock, order }, "Success");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  }
}
