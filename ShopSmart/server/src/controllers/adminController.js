import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

/* ---------- dashboard KPI ---------- */
export const getDashboard = async (req, res, next) => {
  const totalSales = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();

  /* last 30 days sales chart */
  const salesChart = await Order.aggregate([
    { $match: { paymentStatus: 'paid', createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$totalPrice' } } },
    { $sort: { _id: 1 } },
  ]);

  /* top 5 products */
  const topProducts = await Order.aggregate([
    { $unwind: '$items' },
    { $group: { _id: '$items.product', totalSold: { $sum: '$items.qty' } } },
    { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
    { $limit: 5 },
    { $project: { name: { $arrayElemAt: ['$product.name', 0] }, totalSold: 1 } },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      totalUsers,
      salesChart,
      topProducts,
    },
  });
};

/* ---------- products ---------- */
export const getAdminProducts = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 20;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
  const count = await Product.countDocuments(keyword);
  const products = await Product.find(keyword)
    .select('-reviews')
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort('-createdAt');
  res.status(200).json({ success: true, products, page, pages: Math.ceil(count / pageSize) });
};

export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
};

export const updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.status(200).json({ success: true, data: product });
};

export const deleteProduct = async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'Product removed' });
};

/* ---------- orders ---------- */
export const getAdminOrders = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 20;
  const status = req.query.status ? { status: req.query.status } : {};
  const count = await Order.countDocuments(status);
  const orders = await Order.find(status)
    .populate('user', 'name email')
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort('-createdAt');
  res.status(200).json({ success: true, orders, page, pages: Math.ceil(count / pageSize) });
};

export const updateOrderStatus = async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.status(200).json({ success: true, data: order });
};

/* ---------- users ---------- */
export const getUsers = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 20;
  const count = await User.countDocuments();
  const users = await User.find().select('-password').skip((page - 1) * pageSize).limit(pageSize);
  res.status(200).json({ success: true, users, page, pages: Math.ceil(count / pageSize) });
};

export const updateUserRole = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.status(200).json({ success: true, data: user });
};
