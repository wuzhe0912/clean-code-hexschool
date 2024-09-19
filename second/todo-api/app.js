let todoList = [];
let token = '';

const userData = {
  email: 'admin@gmail.com',
  password: '123456',
};

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
function showMessage(status = 'warning', message = '') {
  Toast.fire({
    icon: status,
    title: message,
  });
}

function isEmptyField(email, password) {
  if (!email || !password) {
    showMessage('warning', '用戶名稱和密碼不能為空');
    return;
  }
}

async function signUp(userData, nickname) {
  isEmptyField(userData.email, userData.password);

  try {
    await axios.post('https://todolist-api.hexschool.io/users/sign_up', {
      ...userData,
      nickname,
    });
    showMessage('success', '註冊成功');
  } catch (error) {
    showMessage('warning', error.response.data.message);
  }
}
// signUp(userData, 'admin');

// 提示：改使用 async await 寫法
function signIn(userData) {
  isEmptyField(userData.email, userData.password);

  // 提示：加入 try catch
  // 提示：使用 SweetAlert2 有效呈現錯誤資訊
  // 提示：函式一次只做一件事
  axios
    .post('https://todolist-api.hexschool.io/users/sign_in', {
      email: userData.email,
      password: userData.password,
    })
    .then((response) => {
      token = response.data.token;
    })
    .then(() => {
      axios
        .get('https://todolist-api.hexschool.io/todos/', {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          todoList = response.data.data;
          renderTodos();
          showMessage('success', '登入成功');
        });
    });
}
// signIn(userData);

const button = document.getElementById('todo-btn');
button.addEventListener('click', () => addTodo());

// 提示：改使用 async await 寫法
function addTodo() {
  const todoInput = document.getElementById('todo-input').value;

  if (!todoInput) return;

  // 提示：加入 try catch
  // 提示：使用 SweetAlert2 有效呈現錯誤資訊
  // 提示：將重複程式碼提取出來
  axios
    .post(
      'https://todolist-api.hexschool.io/todos/',
      {
        content: todoInput,
      },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then(() => {
      axios
        .get('https://todolist-api.hexschool.io/todos/', {
          headers: {
            authorization: token,
          },
        })
        .then((response) => {
          todoList = response.data.data;
          renderTodos();
        });
    });
}

function renderTodos() {
  const todoListContainer = document.getElementById('todo-list');
  let html = '';

  todoList.forEach((todo) => {
    html += `<li><b>${todo.content}</b></li>`;
  });

  todoListContainer.innerHTML = html;
}

// 提示：將重複程式碼提取出來
