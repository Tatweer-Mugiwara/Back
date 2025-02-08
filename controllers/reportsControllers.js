import { isValidObjectId } from 'mongoose';
import AppError from '../utils/AppError.js';
import Report from '../models/Report.js';
import EmailSend from '../utils/EmailSender.js';

const getReports = async (req, res, next) => {
    try {
        const reports = await Report.find({});

        res.status(200).json(reports);
    } catch (error) {
        next(error)
    }
};

const getSingleReport = async (req, res, next) => {
    try {
        const { id: reportId } = req.params;

        if (!isValidObjectId(reportId)) {
            throw new AppError('Invalid report ID', 401)
        }

        const report = await Report.findById(reportId);

        if (!report) {
            throw new AppError('Report not found', 404);
        }

        res.status(200).json({ report });
    } catch (error) {
        next(error);
    }
};

const getTruckReports = async (req, res, next) => {
    try {
        const { tid: truckId } = req.params;

        if (!isValidObjectId(truckId)) {
            throw new AppError('Invalid truck ID', 401)
        }

        const reports = await Report.find({ truck: truckId });

        res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
}

const createReport = async (req, res, next) => {
    try {
        const { condition, capteur, description } = req.body;

        const report = new Report({
            condition,
            capteur,
            description
        });

        await report.save();

        res.status(200).json({ report });
    } catch (error) {
        next(error);
    }
};

const deleteReport = async (req, res, next) => {
    try {
        const { id: reportId } = req.params;

        if (!isValidObjectId(reportId)) {
            throw new AppError('Invalid report ID', 401)
        }

        const report = await Report.findByIdAndDelete(reportId);

        if (!report) {
            throw new AppError('Report not found', 404);
        }

        res.status(204).json({ message: 'Report deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const reportNow = async (req, res, next) => {
    try {
        const { id: reportId } = req.params;

        if (!isValidObjectId(reportId)) {
            throw new AppError('Invalid report ID', 401)
        }

        const report = await Report.findById(reportId);

        if (!report) {
            throw new AppError('Report not found', 404);
        }

        // Send alert (we can have many ways, just for the sake of the example)
        await EmailSend({
            name: 'Admin Report!',
            message: `Alert: ${report.condition}`,
            email: process.env.ADMIN_EMAIL,
            subject: 'Alert'
        })

        res.status(200).json({ report });
    } catch (error) {
        next(error);
    }
}

export default {
    getReports,
    getSingleReport,
    getTruckReports,
    createReport,
    deleteReport,
    reportNow
}
