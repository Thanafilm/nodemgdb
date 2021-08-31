const { Order, CartItem } = require('../model/order')
const { errorHandler } = require('../helper/errors');
const user = require('../model/user');


exports.create = (req, res) => {
    const order = new Order(req.body);
    order.user = req.profile
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data)
    })
    console.log(order.product);
}


exports.OrderHistory = (req, res, next) => {
    let history = []
    const order = Order(req.body)
   order.product.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            desc: item.desc,
            cateogory: item.cateogory,
            quantity: item.count,
            transaction_id: order.transaction_id,
            amount: order.amount
        })
    });
    user.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not update'
                })
            }
            next()
        })
}