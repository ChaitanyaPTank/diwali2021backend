import {
  ordersModel,
  stockModel,
  newOrdersModel
} from "./db.js";

// (async () => {
//   const orders = await ordersModel.find();
//   const result = await Promise.all(orders.map(e => ordersModel.findByIdAndUpdate(e._id, { ordered: false })));
//   console.log(result)
// })()

const items = [
  "sata",
  "mohanthal",
  "magas",
  "gulab_jamun",
  "motichur_ladu",
  "churma_ladu",
  "dudh_na_penda",
  "surti_ghari",
  "kaju_katri",
  "kaju_mesub",
  "pauva_chavdo",
  "bhanagari_gathiya",
  "tikha_ganthiya",
  "naylon_ganthiya",
  "ratlami_sev",
  "tikhi_papdi",
  "moli_papdi",
  "sev_regular",
  "khari",
  "dry_kachori",
  "fulvadi",
  "nadiyadi_chavanu",
  "navratna_chavanu",
  "nankhatai",
  "dry_fruit_biscuit",
  "badam_biscuit",
  "black_berry_biscuit",
  "jalebi",
  "undhiyu"
]


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
        order[item] += newOrder[item];
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
