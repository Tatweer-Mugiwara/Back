import Caption from '../models/Caption.js';
import AppError from '../utils/AppError.js';

const createCaption = async(req, res, next) => {
    try {
        const caption = await Caption.create(req.body);
        res.status(201).json({ caption });
    } catch (error) {
        next(error)
    }
}

const getTruckCaptions = async(req, res, next) => {
    try {
        const captions = await Caption.find({ truck: req.params.tid });
        if (captions.length === 0) {
            throw new AppError(`No captions found for truck with ID: ${req.params.tid}`, 404);
        }
        return res.status(200).json({ captions });
    } catch (error) {
        next(error)
    }
}

export default { createCaption, getTruckCaptions };
