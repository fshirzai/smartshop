import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const salesByDay = (days = 30) =>
  Order.aggregate([
    { $match: { paymentStatus: 'paid', createdAt: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$totalPrice' } } },
    { $sort: { _id: 1 } },
  ]);

export const topProducts = (limit = 5) =>
  Order.aggregate([
    { $unwind: '$items' },
    { $group: { _id: '$items.product', sold: { $sum: '$items.qty' } } },
    { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'p' } },
    { $unwind: '$p' },
    { $project: { name: '$p.name', sold: 1 } },
    { $sort: { sold: -1 } },
    { $limit: limit },
  ]);
