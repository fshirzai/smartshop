import dayjs from 'dayjs';
import slugify from 'slugify';

/* ----- currency ----- */
export const formatMoney = (num) =>
  Number(num || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

/* ----- dates ----- */
export const formatDate = (d) => dayjs(d).format('DD MMM YYYY');
export const formatDateTime = (d) => dayjs(d).format('DD MMM YYYY hh:mm A');

/* ----- strings ----- */
export const generateSlug = (str) =>
  slugify(str, { lower: true, strict: true, trim: true });

export const truncate = (str, len = 100) =>
  str?.length > len ? `${str.substring(0, len)}…` : str;

/* ----- validation ----- */
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isStrongPassword = (v) => v.length >= 8; // extend later

/* ----- arrays ----- */
export const uniqueArray = (arr, key = '_id') =>
  arr.filter((x, idx, self) => idx === self.findIndex((t) => t[key] === x[key]));

/* ----- localStorage ----- */
export const storage = {
  get: (k) => JSON.parse(window.localStorage.getItem(k) || 'null'),
  set: (k, v) => window.localStorage.setItem(k, JSON.stringify(v)),
  remove: (k) => window.localStorage.removeItem(k),
};
