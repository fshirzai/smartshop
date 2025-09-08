/* Merge guest cart (local) with server cart (last saved order) */
export const mergeCarts = (localItems, serverItems) => {
  const map = new Map();
  localItems.forEach((i) => map.set(i._id, { ...i, qty: i.qty }));
  serverItems.forEach((i) => {
    if (map.has(i._id)) map.get(i._id).qty += i.qty;
    else map.set(i._id, { ...i, qty: i.qty });
  });
  return Array.from(map.values());
};
