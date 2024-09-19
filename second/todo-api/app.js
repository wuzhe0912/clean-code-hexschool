const BASE_URL = 'https://todolist-api.hexschool.io';
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

const showMessage = (status = 'warning', message = '') => {
  Toast.fire({ icon: status, title: message });
};

const isEmptyField = (email, password) => {
  if (!email || !password) {
    showMessage('warning', '用戶名稱和密碼不能為空');
    return true;
  }
  return false;
};

const apiRequest = async (method, endpoint, data = null, useToken = false) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: useToken ? { authorization: token } : {},
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || `${method} request failed`;
  }
};

const signUp = async (userData, nickname) => {
  if (isEmptyField(userData.email, userData.password)) return;

  try {
    await apiRequest('post', '/users/sign_up', { ...userData, nickname });
    showMessage('success', '註冊成功');
  } catch (error) {
    showMessage('warning', error);
  }
};

const signIn = async (userData) => {
  if (isEmptyField(userData.email, userData.password)) return;

  try {
    const data = await apiRequest('post', '/users/sign_in', userData);
    token = data.token;
    await fetchTodoList();
    showMessage('success', '登入成功');
  } catch (error) {
    showMessage('error', error);
  }
};

const fetchTodoList = async () => {
  try {
    const data = await apiRequest('get', '/todos/', null, true);
    todoList = data.data;
    renderTodoList();
  } catch (error) {
    showMessage('error', '新增待辦事項失敗');
  }
};

const addTodoList = async () => {
  const todoInput = document.getElementById('todo-input');
  const content = todoInput.value.trim();

  if (!content) return;

  try {
    const response = await apiRequest('post', '/todos/', { content }, true);
    todoList.unshift(response.data);
    addTodoWithAnimation(content);
    todoInput.value = '';
    showMessage('success', '新增待辦事項成功');
  } catch (error) {
    showMessage('error', error);
  }
};

const renderTodoList = () => {
  const todoListContainer = document.getElementById('todo-list');
  todoListContainer.innerHTML = '';

  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `<b>${todo.content}</b>`;
    todoListContainer.appendChild(li);

    setTimeout(() => {
      li.classList.add('show');
    }, 50 * index);
  });
};

const addTodoWithAnimation = (content) => {
  const todoListContainer = document.getElementById('todo-list');
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `<b>${content}</b>`;
  todoListContainer.prepend(li);
  li.offsetHeight;
  li.classList.add('show');
};

document.getElementById('todo-btn').addEventListener('click', addTodoList);

// Initial login
signIn(userData);
