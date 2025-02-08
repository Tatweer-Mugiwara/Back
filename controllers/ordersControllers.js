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

const fillDBOrders = async (req, res, next) => {
    try {
        const orders = await Order.insertMany([{
            "_id": "67a616ed1279db7b7e83f191",
            "client": "Client 1",
            "weight": 50,
            "departure": "Alger",
            "destination": "Chlef",
            "truck": "64b5e8f3c9e77b001d5a9b23",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:21:33.654Z",
            "updatedAt": "2025-02-07T14:21:33.654Z"
          },
          {
            "_id": "67a617161279db7b7e83f193",
            "client": "Client 2",
            "weight": 75,
            "departure": "Alger",
            "destination": "Oran",
            "truck": "64b5e8f3c9e77b001d5a9b24",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:22:14.010Z",
            "updatedAt": "2025-02-07T14:22:14.010Z"
          },
          {
            "_id": "67a6172b1279db7b7e83f195",
            "client": "Client 3",
            "weight": 100,
            "departure": "Alger",
            "destination": "Annaba",
            "truck": "64b5e8f3c9e77b001d5a9b25",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:22:35.476Z",
            "updatedAt": "2025-02-07T14:22:35.476Z"
          },
          {
            "_id": "67a6173e1279db7b7e83f197",
            "client": "Client 4",
            "weight": 130,
            "departure": "Alger",
            "destination": "Constantine",
            "truck": "64b5e8f3c9e77b001d5a9b26",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:22:54.073Z",
            "updatedAt": "2025-02-07T14:22:54.073Z"
          },
          {
            "_id": "67a617561279db7b7e83f199",
            "client": "Client 5",
            "weight": 90,
            "departure": "Alger",
            "destination": "Tlemcen",
            "truck": "64b5e8f3c9e77b001d5a9b27",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:23:18.921Z",
            "updatedAt": "2025-02-07T14:23:18.921Z"
          },
          {
            "_id": "67a6176b1279db7b7e83f19b",
            "client": "Client 6",
            "weight": 110,
            "departure": "Alger",
            "destination": "Batna",
            "truck": "64b5e8f3c9e77b001d5a9b28",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:23:39.035Z",
            "updatedAt": "2025-02-07T14:23:39.035Z"
          },
          {
            "_id": "67a6177e1279db7b7e83f19d",
            "client": "Client 7",
            "weight": 140,
            "departure": "Alger",
            "destination": "Setif",
            "truck": "64b5e8f3c9e77b001d5a9b29",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:23:58.866Z",
            "updatedAt": "2025-02-07T14:23:58.866Z"
          },
          {
            "_id": "67a617911279db7b7e83f19f",
            "client": "Client 8",
            "weight": 80,
            "departure": "Alger",
            "destination": "Blida",
            "truck": "64b5e8f3c9e77b001d5a9b30",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:24:17.638Z",
            "updatedAt": "2025-02-07T14:24:17.638Z"
          },
          {
            "_id": "67a617a51279db7b7e83f1a1",
            "client": "Client 9",
            "weight": 125,
            "departure": "Alger",
            "destination": "Béjaïa",
            "truck": "64b5e8f3c9e77b001d5a9b31",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:24:37.673Z",
            "updatedAt": "2025-02-07T14:24:37.673Z"
          },
          {
            "_id": "67a617bb1279db7b7e83f1a3",
            "client": "Client 10",
            "weight": 95,
            "departure": "Alger",
            "destination": "Tizi Ouzou",
            "truck": "64b5e8f3c9e77b001d5a9b32",
            "truckMaxWeight": 200,
            "status": "assigned",
            "departureTime": "2025-08-30T08:00:00.000Z",
            "createdAt": "2025-02-07T14:24:59.664Z",
            "updatedAt": "2025-02-07T14:24:59.664Z"
          }]
        );
        res.status(201).json({ orders });
    } catch (error) {
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

export default { getOrders, createOrder, getOrderById, updateOrder, deleteOrder, fillDBOrders };
