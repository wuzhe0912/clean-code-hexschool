// Get Method
exports.getExample = (req, res) => {
  res.json({ message: 'Welcome to Coffee API!' });
};

// Post Method
exports.createProduct = (req, res) => {
  const { name, price, description } = req.body;

  let products = [];

  // 1. 檢查必填欄位
  if (!name || !price || !description) {
    return res.status(400).json({
      message: '所有欄位都是必填的！'
    });
  }

  // 2. 檢查價格是否為數字且大於 0
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      message: '價格必須是大於 0 的數字！'
    });
  }

  // 3. 檢查名稱是否重複
  const isExist = products.some(product => product.name === name);
  if (isExist) {
    return res.status(400).json({
      message: '這個咖啡品項已經存在！'
    });
  }
  
  // 建立新產品
  const newProduct = {
    id: 1,
    name,
    price,
    description
  };
  
  products.push(newProduct);
  
  res.json({
    message: '新增咖啡成功',
    product: newProduct
  });
};