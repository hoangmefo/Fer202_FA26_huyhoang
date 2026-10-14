export const formatVND = (amount) =>
  amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })

export const getFinalPrice = ({ price, discount = 0 }) =>
  Math.round(price * (1 - discount / 100))
