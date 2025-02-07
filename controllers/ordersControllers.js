import AppError from '../utils/AppError.js';
import Order from '../models/Order.js';

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
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

const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) {
            return next(new AppError(`Order with ID ${orderId} not found`, 404));
        }
        res.status(200).json({ order });
    }
    catch (error) {
        next(error)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndUpdate(orderId, req.body, {
            new: true,
            runValidators: true
        });
        if (!order) {
            return next(new AppError(`Order with ID ${orderId} not found`, 404));
        }
        res.status(200).json({ order });
    }
    catch (error) {
        next(error)
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return next(new AppError(`Order with ID ${orderId} not found`, 404));
        }
        res.status(204).json();
    }
    catch (error) {
        next(error)
    }
}

export default { getOrders, createOrder, getOrderById, updateOrder, deleteOrder };
