import AppError from '../utils/AppError.js';
import Capteur from '../models/Capteur.js';

const getCapteurs = async (req, res, next) => {
    try {
        const capteurs = await Capteur.find({});
        res.status(200).json(capteurs);
    } catch (error) {
        next(error)
    }
}

const createCapteur = async(req, res, next) => {
    try {
        const order = await Capteur.create(req.body);
        res.status(201).json({ order });
    } catch (error) {
        next(error)
    }
}

const getCapteurById = async (req, res, next) => {
    try {
        const { capteurId } = req.params;
        const capteur = await Capteur.findById(capteurId);
        if (!capteur) {
            return next(new AppError(`Capteur with ID ${capteurId} not found`, 404));
        }
        res.status(200).json({ capteur });
    }
    catch (error) {
        next(error)
    }
}

const updateCapteur = async (req, res, next) => {
    try {
        const { capteurId } = req.params;
        const capteur = await Capteur.findByIdAndUpdate(capteurId, req.body, {
            new: true,
            runValidators: true
        });
        if (!capteur) {
            return next(new AppError(`Capteur with ID ${capteurId} not found`, 404));
        }
        res.status(200).json({ capteur });
    }
    catch (error) {
        next(error)
    }
}

const deleteCapteur = async (req, res, next) => {
    try {
        const { capteurId } = req.params;
        const capteur = await Capteur.findByIdAndDelete(capteurId);
        if (!capteur) {
            return next(new AppError(`Capteur with ID ${capteurId} not found`, 404));
        }
        res.status(204).json();
    }
    catch (error) {
        next(error)
    }
}

export default { getCapteurs, createCapteur, getCapteurById, updateCapteur, deleteCapteur };
