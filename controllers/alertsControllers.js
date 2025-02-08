import AppError from '../utils/AppError.js';
import Alert from '../models/Alert.js';
import { isValidObjectId } from 'mongoose';

const getAlerts = async (req, res, next) => {
    try {
        const alerts = await Alert.find({}).populate('history');;

        res.status(200).json(alerts);
    } catch (error) {
        next(error)
    }
};

const getSingleAlert = async (req, res, next) => {
    try {
        const { id: alertId } = req.params;

        if (!isValidObjectId(alertId)) {
            throw new AppError('Invalid alert ID', 401)
        }

        const alert = await Alert.findById(alertId).populate('alertRule').populate('history');

        if (!alert) {
            throw new AppError('Alert not found', 404);
        }

        res.status(200).json({ alert });
    } catch (error) {
        next(error);
    }
};

const createAlert = async (req, res, next) => {
    try {
        const { condition, description } = req.body;

        const alert = new Alert({
            condition,
            description,
            initiator: req.session.user._id,
            history: []
        });

        await alert.save();

        res.status(200).json({ alert });
    } catch (error) {
        next(error);
    }
};

const insertHistoryInAlert = async (req, res, next) => {
    try {
        const { action, description, actor } = req.body;
        const { id: alertId } = req.params;

        if (!isValidObjectId(alertId)) {
            throw new AppError('Invalid alert ID', 401);
        }

        const alert = await Alert.findById(alertId);

        if (!alert) {
            throw new AppError('Alert not found', 404);
        }

        const history = new History({
            action,
            actor,
            issuer: req.session.user._id,
            description,
            alert: alertId
        });

        await history.save();

        alert.history.push(history._id);

        await alert.save();

        res.status(200).json({ alert });
    } catch (error) {
        next(error);
    }
};

const deleteAlert = async (req, res, next) => {
    try {
        const { id: alertId } = req.params;

        if (!isValidObjectId(alertId)) {
            throw new AppError('Invalid alert ID', 401)
        }

        const alert = await Report.findByIdAndDelete(alertId);

        if (!alert) {
            throw new AppError('Alert not found', 404);
        }

        res.status(204).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default {
    getAlerts,
    getSingleAlert,
    createAlert,
    insertHistoryInAlert,
    deleteAlert
}