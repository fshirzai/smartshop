import Product from '../models/Product.js';
import Order from '../models/Order.js';

/* ---------- public ---------- */
export const getProducts = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 12;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const filter = { ...keyword, ...category };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .select('-reviews')
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort(req.query.sort || '-createdAt');

  res.status(200).json({
    success: true,
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
};

export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.status(200).json({ success: true, data: product });
};

export const getFeatured = async (req, res, next) => {
  const products = await Product.find({}).sort('-rating').limit(8);
  res.status(200).json({ success: true, data: products });
};

/* ---------- customer protected ---------- */
export const createReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user.id);
  if (alreadyReviewed) return res.status(400).json({ success: false, message: 'Already reviewed' });

  const review = { user: req.user.id, name: req.user.name, rating: Number(rating), comment };
  product.reviews.push(review);
  await product.updateRating();

  res.status(201).json({ success: true, message: 'Review added' });
};
