const cart = [
  {
    id: 0,
    name: 'Orange',
    price: 2,
    quantity: 1,
  },
];

const addItem = (item) => {
  const newItem = {
    id: Date.now(),
    ...item,
  };
  cart.push(newItem);
};

/**
  1. 使用 findIndex 找出要更新的商品的索引
  2. 使用展開運算符，將更新的商品覆寫到原始商品的屬性
**/
const editItem = (id, updateItem) => {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex] = { ...cart[itemIndex], ...updateItem };
  }
};

const removeItem = (id) => {
  if (!id) {
    cart = [];
    return;
  }

  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }
};

const calculateTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

let isLoggedIn = false;
const MAX_ITEMS_FOR_CHECKOUT = 5;

const checkout = () => {
  if (cart.length === 0) {
    return '您的購物車是空的';
  }

  if (!isLoggedIn) {
    return '請先登入';
  }

  if (cart.length > MAX_ITEMS_FOR_CHECKOUT) {
    return '您超出了允許結帳的最大商品數量';
  }

  return '付款成功';
};
