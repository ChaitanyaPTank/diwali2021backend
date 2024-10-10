import {
  ordersModel,
  stockModel,
  newOrdersModel
} from "./db.js";


// (async () => {
//   const orders = await ordersModel.find();
//   const result = await Promise.all(orders.map(e => ordersModel.findByIdAndUpdate(e._id,)));
//   console.log(result)
// })()


const items = [
  "anjir_patra",
  "kajukasata",
  "ghughra",
  "magas",
  "toprapak",
  "churma_ladu",
  "kesar_badam_pista",
  "kajukatri",
  "khajur_roll",
  "mohanthal",
  "sata",
  "motichur_ladu",
  "chavanu_mithu",
  "chvanu_tikhu",
  "chavanu_surti",
  "ghau_masala_puri",
  "sakkarpara",
  "pauva_chevdo_tikho",
  "pauva_chevdo_mitho",
  "tikh_zina_gathiya",
  "chakri",
  "tikhi_papdi",
  "moli_papdi",
  "flower_gathiya",
  "alusev",
  "ratlami_sev",
  "plain_halvo",
  "pineapple_halvo",
  "sandwich_halvo",
  "dryfruit_cookies",
  "badam_cookies",
  "nankhatai",
  "jira_khari",
  "cholafali",
  "mathiya",
]


const errorResponse = async (
  _req, res,
  data = {},
  message = MSG.SOMETHING_WRONG,
  code = 500,
) => {
  return res.status(code).send({ data, message });
};


const successResponse = async (
  _req, res,
  data = {},
  message = MSG.SUCC,
  code = 200,
) => {
  return res.status(code).send({ data, message });
};


export default {

  getAll: async (req, res) => {
    try {
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
      const { id, order } = req.body;
      const updated = await ordersModel.findByIdAndUpdate(
        id,
        { ...order, ordered: true },
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
      const query = makeQuery(items)
      const data = await ordersModel.aggregate([
        {
          $group: {
            _id: "$ordered",
            ...query
          }
        },
        {
          $addFields: {
            ordered: "$_id"
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
      const newOrderData = await newOrdersModel.aggregate([
        {
          $group: {
            _id: "$ordered",
            ...makeQuery(items)
          }
        },
        {
          $addFields: {
            ordered: "$_id"
          }
        },
        {
          $project: {
            _id: 0,
            __v: 0,
          }
        }
      ])

      const [newOrder] = newOrderData.filter(item => item.ordered === true);

      for (let item in stock) {
        order[item] += newOrder ? (newOrder[item] || 0) : 0;
        stock[item] -= order[item];
      }

      return successResponse(req, res, { stock, order }, "Success");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  },

  addNewOrder: async (req, res) => {
    try {
      const order = req.body;
      const newOrder = await newOrdersModel.create({
        ...order,
        ordered: true
      });
      if (!newOrder) {
        return errorResponse(req, res, {}, "Error while adding new order");
      }
      return successResponse(req, res, {}, "Success!");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  },

  getNewOrders: async (req, res) => {
    try {
      const {
        search,
        limit,
      } = req.body;
      const query = {
      };

      if (search) {

        query["$or"] = [
          { name: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } }
        ];
      }

      const data = await newOrdersModel
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
  }
}

function makeQuery(entity) {
  const result = {};
  entity.map(e => result[e] = {
    $sum: { $cond: [{ $ne: [`$${e}`, ""] }, { $toDouble: `$${e}` }, 0] }
  })
  return result;
}


(async () => {

  const a = await ordersModel.find();
  console.log(a.length);
})()
