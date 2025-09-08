import { uploadAPI } from '../api/uploadAPI';

/* Drag-and-drop helper used in <ProductForm> */
export const uploadToCloudinary = async (file) => {
  if (!file.type.startsWith('image/')) throw new Error('Only images allowed');

  const { signature, timestamp, apiKey, cloudName } = await uploadAPI.getSignature();
  const res = await uploadAPI.uploadToCloudinary(file, signature, timestamp, apiKey, cloudName);
  if (res.error) throw new Error(res.error.message);

  return res.secure_url; // string
};
