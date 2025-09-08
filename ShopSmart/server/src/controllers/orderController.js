import Order from '../models/Order.js';
import Product from '../models/Product.js';

/* ---------- customer ---------- */
export const createOrder = async (req, res, next) => {
  const { items, shippingAddress, totalPrice, paymentMethod } = req.body;

  /* stock check */
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.qty) {
      return res.status(400).json({ success: false, message: `Not enough stock for ${product?.name || item.product}` });
    }
  }

  /* create order */
  const order = await Order.create({ user: req.user.id, items, shippingAddress, totalPrice, paymentMethod });

  /* decrement stock */
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
  }

  res.status(201).json({ success: true, data: order });
};

export const getMyOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
  res.status(200).json({ success: true, data: orders });
};

export const getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product', 'name images');
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.user.id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }
  res.status(200).json({ success: true, data: order });
};

/* ---------- payment webhook (Stripe example) ---------- */
export const markPaid = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  order.paymentStatus = 'paid';
  await order.save();
  res.status(200).json({ success: true, data: order });
};
