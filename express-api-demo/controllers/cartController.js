let cart = [];
const productList = [
  { id: 1, name: '美式咖啡', price: 80 },
  { id: 2, name: '拿鐵咖啡', price: 100 },
  { id: 3, name: '卡布奇諾', price: 100 }
];

exports.getProductList = (req, res) => {
  res.json({
    message: '取得咖啡列表成功',
    productList
  });
};

exports.addToShoppingCart = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const numericProductId = Number(productId);

    // 1. 檢查商品 ID 格式
    if (isNaN(numericProductId)) {
      return res.status(400).json({ message: '商品 ID 必須為數字' });
    }

    // 2. 檢查商品是否存在
    const product = productList.find(p => p.id === numericProductId);
    if (!product) {
      return res.status(404).json({ message: '找不到此商品' });
    }

    // 3. 檢查數量是否正確
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: '商品數量必須大於 0' });
    }

    // 4. 檢查購物車是否已有此商品
    const existingItem = cart.find(item => item.productId === numericProductId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ 
        productId: numericProductId, 
        name: product.name,
        price: product.price,
        quantity 
      });
    }

    res.status(200).json({ 
      message: '成功加入購物車', 
      item: product,
      cart 
    });
  } catch (error) {
    res.status(500).json({ message: '加入購物車失敗', error: error.message });
  }
};