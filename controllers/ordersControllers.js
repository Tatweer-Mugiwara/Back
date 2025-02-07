import AppError from '../utils/AppError.js';
import Order from '../models/Order.js';


const getOrders = async (req, res, next) => {
    
        try {
            const orders = await Order.find({});
            res.status(200).json({ orders });
        } catch (error) {
            next(error)
        }
    }

const createOrder = async(req, res, next) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ order });
    } catch (error) {
        next(error)
    }
}

export default { getOrders , createOrder };
