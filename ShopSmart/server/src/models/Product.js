import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true, _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    images: [String],
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* virtual avg rating */
productSchema.virtual('avgRating').get(function () {
  if (this.reviews.length === 0) return 0;
  return this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
});

/* update rating & count */
productSchema.methods.updateRating = async function () {
  this.rating = this.avgRating;
  this.numReviews = this.reviews.length;
  await this.save();
};

export default mongoose.model('Product', productSchema);
