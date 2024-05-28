<template>
  <div class="login-container">
    <h1>Вход</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label>Логин</label>
        <input type="text" v-model="login" required>
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
      login: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        await axios.post('http://localhost:8000/login', {
          login: this.login,
          password: this.password
        }, {
          withCredentials: true // Отправка cookies с запросом
        });
        alert('Вход успешен!');
        this.$router.push('/orders');
      } catch (error) {
        alert('Ошибка входа: ' + error.response.data.error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
