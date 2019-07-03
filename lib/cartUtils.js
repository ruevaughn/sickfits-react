const totalItems = cart => {
  return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
};

export default totalItems;
