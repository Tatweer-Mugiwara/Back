import AppError from '../utils/AppError.js';

suggestOptimization = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        //Logic to suggest optimization
        res.status(200).json({ orders });
    } catch (error) {
        next(error)
    }
}

export default { suggestOptimization }; 