import ordersModel from './db.js';
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
        // page,
        limit
      } = req.body;
      // const skip = (page - 1) * limit;
      const query = {};
      if (search) {
        query["$or"] = [
          { name: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } }
        ]
      }

      // const total = await ordersModel.find(query).count();
      // console.log(total);
      const data = await ordersModel
        .find(query)
        .limit(limit)
        .sort({ name: 1 });
      // .skip(skip);

      if (!data) {
        return errorResponse(req, res, {}, "Error while fetching data.", 500);
      }
      return successResponse(req, res, data, "Success.");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message, 500);
    }
  },


  updateOrder: async (req, res) => {
    try {
      const { id } = req.body;
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


  getTotal: async (req, res) => {
    try {
      return successResponse(req, res, data, "Success");
    } catch (err) {
      console.log(err);
      return errorResponse(req, res, {}, err.message);
    }
  }
}