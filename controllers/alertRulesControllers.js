import AppError from '../utils/AppError.js';
import AlertRule from '../models/AlertRule.js';
import { isValidObjectId } from 'mongoose';
import Alert from '../models/Alert.js';
import EmailSend from '../utils/EmailSender.js';

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
            initiator: req.session.user._id
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

const alertNow = async (req, res, next) => {
    try {
        const { id: aRuleId } = req.params;

        if (!isValidObjectId(aRuleId)) {
            throw new AppError('Invalid alert rule ID', 401)
        }

        const aRule = await AlertRule.findById(aRuleId);

        if (!aRule) {
            throw new AppError('Alert rule not found', 404);
        }

        const alert = new Alert({
            condition: aRule.condition,
            description: aRule.description,
            initiator: aRule.initiator
        });

        await alert.save();

        aRule.alerts.push(alert);

        await aRule.save();

        // Send alert (we can have many ways, just for the sake of the example)
        await EmailSend({
            name: 'Admin Alert!',
            message: `Alert: ${aRule.description}`,
            subject: 'Alert'
        })

        res.status(200).json({ alert });
    } catch (error) {
        next(error);
    }
};

export default {
    getAlertRules,
    getSingleAlertRule,
    createAlertRule,
    updateAlertRule,
    deleteAlertRule,
    alertNow
}
