import AppError from '../utils/AppError.js';
import History from '../models/History.js';
import { isValidObjectId } from 'mongoose';

const getHistories = async (req, res, next) => {
    try {
        const { aid: alertId } = req.params;
        const histories = await History.find({
            alert: alertId
        });

        res.status(200).json(histories);
    } catch (error) {
        next(error)
    }
};

const getSingleHistory = async (req, res, next) => {
    try {
        const { id: historyId } = req.params;

        if (!isValidObjectId(historyId)) {
            throw new AppError('Invalid history ID', 401)
        }

        const history = await History.findById(historyId);

        if (!history) {
            throw new AppError('History not found', 404);
        }

        res.status(200).json({ history });
    } catch (error) {
        next(error);
    }
};

const createHistory = async (req, res, next) => {
    try {
        const { action, actor, issuer, description, alert } = req.body;

        if (!isValidObjectId(issuer)) {
            throw new AppError('Invalid issuer id', 401)
        }

        if (actor && !isValidObjectId(actor)) {
            throw new AppError('Invalid actor id', 401)
        }

        if (!alert) {
            throw new AppError('Alert ID is required', 401)
        }

        if (!isValidObjectId(alert)) {
            throw new AppError('Invalid alert id', 401)
        }

        const history = new History({
            action,
            actor,
            description,
            alert,
            issuer: req.session.user._id
        });

        await history.save();

        res.status(200).json({ history });
    } catch (error) {
        next(error);
    }
};

const updateHistory = async (req, res, next) => {
    try {
        const { action, actor, description, alert } = req.body;
        const { id: historyId } = req.params;

        if (!isValidObjectId(historyId)) {
            throw new AppError('Invalid history ID', 401)
        }

        if (!action && !actor && !description && !alert) {
            throw new AppError('At least one field is required', 401)
        }

        if (actor && !isValidObjectId(actor)) {
            throw new AppError('Invalid actor id', 401)
        }

        if (!alert) {
            throw new AppError('Alert ID is required', 401)
        }

        if (!isValidObjectId(alert)) {
            throw new AppError('Invalid alert id', 401)
        }


        const history = await History.findById(historyId);

        if (!history) {
            throw new AppError('History not found', 404);
        }

        if (action) {
            history.action = action;
        } 
        if (actor) {
            history.actor = actor;
        }
        if (description) {
            history.description = description;
        }
        if (alert) {
            history.alert = alert;
        }

        await history.save();

        res.status(200).json({ history });
    } catch (error) {
        next(error);
    }
};

const deleteHistory = async (req, res, next) => {
    try {
        const { id: historyId } = req.params;

        if (!isValidObjectId(historyId)) {
            throw new AppError('Invalid history ID', 401)
        }

        const history = await History.findByIdAndDelete(historyId);

        if (!history) {
            throw new AppError('History not found', 404);
        }

        res.status(204).json({ message: 'History deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default {
    getHistories,
    getSingleHistory,
    createHistory,
    updateHistory,
    deleteHistory
}