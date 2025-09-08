import api from './axiosConfig';

export const uploadAPI = {
  /* Server gives signed upload params → direct to Cloudinary */
  getSignature: () => api.get('/upload/signature').then((res) => res.data),

  /* Direct upload to Cloudinary (returns secure_url) */
  uploadToCloudinary: async (file, signature, timestamp, apiKey, cloudName) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('signature', signature);
    fd.append('timestamp', timestamp);
    fd.append('api_key', apiKey);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: fd,
    });
    return res.json(); // { secure_url, public_id }
  },
};
