import AppError from '../utils/AppError.js';
import Truck from '../models/Truck.js';

const getTrucks = async (req, res, next) => {
    try {
        const trucks = await Truck.find({});
        res.status(200).json(trucks);
    } catch (error) {
        next(error)
    }
}

const createTruck = async(req, res, next) => {
    try {
        const truck = await Truck.create(req.body);
        res.status(201).json({ truck });
    } catch (error) {
        next(error)
    }
}

const getTruckById = async (req, res, next) => {
    try {
        const { id: truckId } = req.params;
        const truck = await Truck.findById(truckId);
        if (!truck) {
            return next(new AppError(`Truck with ID ${truckId} not found`, 404));
        }
        res.status(200).json({ truck });
    }
    catch (error) {
        next(error)
    }
}

const updateTruck = async (req, res, next) => {
    try {
        const { id: truckId } = req.params;
        const truck = await Truck.findByIdAndUpdate(truckId, req.body, {
            new: true,
            runValidators: true
        });
        if (!truck) {
            return next(new AppError(`Truck with ID ${truckId} not found`, 404));
        }
        res.status(200).json({ truck });
    }
    catch (error) {
        next(error)
    }
}

const deleteTruck = async (req, res, next) => {
    try {
        const { id: truckId } = req.params;
        const truck = await Truck.findByIdAndDelete(truckId);
        if (!truck) {
            return next(new AppError(`Truck with ID ${truckId} not found`, 404));
        }
        res.status(204).json();
    }
    catch (error) {
        next(error)
    }
}

export default { getTrucks, createTruck, getTruckById, updateTruck, deleteTruck };
