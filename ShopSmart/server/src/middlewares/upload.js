import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'shopsmart',
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  }),
});

export const upload = multer({ storage });
