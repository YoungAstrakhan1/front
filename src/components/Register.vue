<template>
  <div class="register-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label>ФИО</label>
        <input type="text" v-model="full_name" required>
      </div>
      <div>
        <label>Телефон</label>
        <input type="text" v-model="phone" required>
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label>Логин</label>
        <input type="text" v-model="login" required>
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      full_name: '',
      phone: '',
      email: '',
      login: '',
      password: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('http://localhost:8000/register', {
          full_name: this.full_name,
          phone: this.phone,
          email: this.email,
          login: this.login,
          password: this.password
        });
        alert('Регистрация успешна!');
        this.$router.push('/login');
      } catch (error) {
        alert('Ошибка регистрации: ' + error.response.data.error);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
