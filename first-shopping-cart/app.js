// 提示：修改為有意義且可閱讀的變數名稱
let cart = [{
	id: 0,
	i: 'Orange',
	p: 2,
	q: 1
}];

// 提示：修改為有意義且可閱讀的變數名稱
// 提示：參數少於 2 個較佳
function add(item, price, quantity) {
		const id = Date.now();
    cart.push({ id: id, i: item, p: price, q: quantity });
}
// add('Banana',1,1);


// 提示：修改為有意義且可閱讀的變數名稱
// 提示：參數少於 2 個較佳
// 提示：進階寫法可以用 findIndex 語法（非必做）
function edit(id, newItem, newPrice, newQuantity) { 
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].i = newItem;
      cart[i].p = newPrice;
      cart[i].q = newQuantity;
      break;
    }
  }
}
// edit(0,'Strawberry',3,4);


// 提示：修改為有意義且可閱讀的變數名稱
// 提示：條件判斷邏輯複雜，可再整理得更清楚
// 提示：函式一次只做一件事
// 提示：進階寫法可以用 findIndex 語法（非必做）
function remove(id) {
  if (id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }
  } else {
    cart = [];
  }
}

// 提示：修改為有意義且可閱讀的變數名稱
// 提示：進階寫法可以用 reduce 語法（非必做）
function calcTotal() {
    var t = 0;
    for (var i = 0; i < cart.length; i++) {
        t += cart[i].p * cart[i].q;;
    }
    return t;
}

// 提示：修改為有意義且可閱讀的變數名稱
let loggedIn = false;

// 提示：條件判斷邏輯複雜（太多的 if/else），可再整理得更清楚
function checkout() {
    if (cart.length === 0) {
        return '您的購物車是空的';
    } else {
        if (loggedIn) {
            // 提示：使用可搜尋的名稱
            if (cart.length > 5) {
                return '您超出了允許結帳的最大商品數量';
            } else {      
                return '付款成功';
            }
        } else {
            return '請先登入';
        }
    }
}