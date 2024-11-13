// === 1. Promise 與 Async/Await 比較 ===
// 模擬範例
// Promise 寫法
// function fetchData() {
//   return new Promise(function(resolve) {
//       setTimeout(() => {
//           resolve("資料已經獲取");
//       }, 2000);
//   });
// }

// function getExample() {
//   console.log("開始獲取資料...");
//   fetchData().then(function (data) {
//       console.log(data);
//   });
// }

// Async/Await 寫法
// function fetchData() {
//   return new Promise(function(resolve) {
//       setTimeout(() => {
//           resolve("資料已經獲取");
//       }, 2000);
//   });
// }

// async function getExample() {
//   console.log("開始獲取資料...");
//   const data = await fetchData();
//   console.log(data);
// }

// 串接本地 API
const api_path = "http://localhost:3000/api";
// Promise 寫法
// === Get Method ===
// const getExample = () => {
//   axios.get(`${api_path}/getExample`).then(response => {
//     console.log('Print Data:', response.data);
//   })
// }

// Async/Await 寫法
// const getExample = async () => {
//   const response = await axios.get(`${api_path}/getExample`);
//   console.log('Print Data:', response.data);
// }

// === Post Method ===
// Promise 寫法
// const createProduct = () => {
//   const newProduct = {
//     name: '摩卡咖啡',
//     price: 110,
//     description: '巧克力與咖啡的完美結合'
//   };

//   axios.post(`${api_path}/createProduct`, newProduct)
//     .then(response => {
//       console.log('新增成功:', response.data);
//     })
//     .catch(error => {
//       console.log('發生錯誤:', error.response.data.message);
//     });
// }

// Async/Await 寫法
// const createProduct = async () => {
//   const newProduct = {
//     name: '摩卡咖啡',
//     price: 110,
//     description: '巧克力與咖啡的完美結合'
//   };

//   try {
//     const response = await axios.post(`${api_path}/createProduct`, newProduct);
//     console.log('新增成功:', response.data);
//   } catch (error) {
//     console.log('發生錯誤:', error.response.data.message);
//   }
// }

// === 2. 錯誤與例外處理 ===
// 隨機數
// function customPromise() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const randomNumber = Math.floor(Math.random() * 100) + 1;
//       if (randomNumber % 2 === 0) {
//         resolve(randomNumber);
//       } else {
//         reject(new Error(`奇數: ${randomNumber}`));
//       }
//     }, 1000);
//   });
// }

// function count(){
//   customPromise()
//   .then(result => console.log(`成功: ${result}`))
//   .catch(error => console.error(`失敗: ${error.message}`));
// }

// === 3. axios 搭配 Async/Await 與錯誤管理整合 ===
// 取得商品列表
const getProductList = async () => {
  try {
    const response = await axios.get(`${api_path}/getProductList`);
    console.log('取得商品列表:', response.data);
  } catch(error) {
    console.log('取得商品列表失敗:', error);
  }
}

// 加入購物車
const addToShoppingCart = async (productId, quantity) => {
  try {
    // 第一個參數為商品 ID，第二個參數為商品數量
    const response = await axios.post(`${api_path}/addToShoppingCart`, {
      productId,
      quantity
    });
    console.log('加入購物車成功:', response.data);
  } catch (error) {
    console.log('加入購物車失敗:', error.response.data.message);
  }
}

