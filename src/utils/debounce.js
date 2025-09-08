/* Re-exported standalone version (used outside React) */
export const debounce = (fn, ms = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};
