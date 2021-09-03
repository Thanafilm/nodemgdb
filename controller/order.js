const { Order, CartItem } = require('../model/order')
const { errorHandler } = require('../helper/errors');
const user = require('../model/user');
const Product = require('../model/product')

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

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
}

exports.listOrder = (req, res) => {
    Order.find()
        .populate('user', "_id name address")
        .sort('-created')
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(order)
        })
}

exports.OrderHistory = (req, res, next) => {
    let history = []
    const order = Order(req.body)
    order.product.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            quantity: item.count,
            status: order.status,
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

exports.StockUpdate = (req, res, next) => {

    const order = Order(req.body)

    let bulkOps = order.product.map((item) => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    })
    Product.bulkWrite(bulkOps, {}, (error, product) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
}

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name lastname')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};