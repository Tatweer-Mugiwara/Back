import AppError from '../utils/AppError.js';
import AlertRule from '../models/AlertRule.js';
import { isValidObjectId } from 'mongoose';

const getAlertRules = async (req, res, next) => {
    try {
        const aRules = await AlertRule.find({});

        res.status(200).json(aRules);
    } catch (error) {
        next(error)
    }
};

const getSingleAlertRule = async (req, res, next) => {
    try {
        const { id: aRuleId } = req.params;

        if (!isValidObjectId(aRuleId)) {
            throw new AppError('Invalid alert rule ID', 401)
        }

        const aRule = await AlertRule.findById(aRuleId);

        if (!aRule) {
            throw new AppError('Alert rule not found', 404);
        }

        res.status(200).json({ aRule });
    } catch (error) {
        next(error);
    }
};

const createAlertRule = async (req, res, next) => {
    try {
        const { condition, description } = req.body;

        const aRule = new AlertRule({
            condition,
            description,
            initiator: req.user._id
        });

        await aRule.save();

        res.status(200).json({ aRule });
    } catch (error) {
        next(error);
    }
};

const updateAlertRule = async (req, res, next) => {
    try {
        const { id: aRuleId } = req.params;
        const { condition, description } = req.body;

        if (!isValidObjectId(aRuleId)) {
            throw new AppError('Invalid alert rule ID', 401)
        }

        const aRule = await AlertRule.findByIdAndUpdate(aRuleId, { condition, description }, { new: true });

        if (!aRule) {
            throw new AppError('Alert rule not found', 404);
        }

        res.status(200).json({ aRule });
    } catch (error) {
        next(error);
    }
};

const deleteAlertRule = async (req, res, next) => {
    try {
        const { id: reportId } = req.params;

        if (!isValidObjectId(reportId)) {
            throw new AppError('Invalid alert rule ID', 401)
        }

        const aRule = await AlertRule.findByIdAndDelete(reportId);

        if (!aRule) {
            throw new AppError('Alert rule not found', 404);
        }

        res.status(204).json({ message: 'Alert rule deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export default {
    getAlertRules,
    getSingleAlertRule,
    createAlertRule,
    updateAlertRule,
    deleteAlertRule
}
