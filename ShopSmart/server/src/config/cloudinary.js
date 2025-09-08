import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
  secure: true,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'shopsmart',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: (_, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});
