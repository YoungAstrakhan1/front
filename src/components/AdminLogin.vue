<template>
  <div class="admin-login-container">
    <h1>Админ Вход</h1>
    <form @submit.prevent="loginAdmin">
      <div>
        <label>Логин</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async loginAdmin() {
      try {
        const response = await axios.post('http://localhost:8000/admin/login', {
          username: this.username,
          password: this.password
        }, {
          withCredentials: true // Отправка cookies с запросом
        });
        if (response.data.message === 'Успешная аутентификация') {
          alert('Вход успешен!');
          this.$router.push('/admin-panel');
        } else {
          alert('Неверный логин или пароль');
        }
      } catch (error) {
        alert('Ошибка входа: ' + (error.response ? error.response.data.error : error.message));
      }
    }
  }
};
</script>

<style scoped>
.admin-login-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
