export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const randomInt = (min=1, max=5) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
