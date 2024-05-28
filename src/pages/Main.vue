<template>
    <div class="main-container">
      <h1>Добро пожаловать в систему бронирования "Записываемся на ноготочки"</h1>
      <p>Здесь вы можете записаться к мастерам маникюра и педикюра</p>
      <router-link to="/register" class="btn">Регистрация</router-link>
      <router-link to="/login" class="btn">Вход</router-link>
      <router-link to="/admin-login" class="btn">Админ-панель</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Main',
    created() {
          console.log('Register component created');
    }
  }
  </script>
  
  <style scoped>
  .main-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .btn {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  