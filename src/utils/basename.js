/* Returns file name without extension – handy for alt texts */
export const basename = (path = '', ext = true) => {
  const name = path.split('/').pop().split('#')[0].split('?')[0];
  return ext ? name : name.replace(/\.[^/.]+$/, '');
};
