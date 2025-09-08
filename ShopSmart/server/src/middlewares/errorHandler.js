export const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Server Error';
  let code = err.statusCode || 500;

  /* Mongoose bad ObjectId */
  if (err.name === 'CastError') {
    message = 'Resource not found';
    code = 404;
  }

  /* Mongoose duplicate key */
  if (err.code === 11000) {
    message = 'Duplicate field value';
    code = 400;
  }

  /* Mongoose validation */
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message).join(', ');
    code = 400;
  }

  res.status(code).json({ success: false, message });
};
