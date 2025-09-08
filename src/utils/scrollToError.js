/* Scroll first .is-invalid field into view on form error */
export const scrollToError = () => {
  const el = document.querySelector('.is-invalid');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
