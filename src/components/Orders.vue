<template>
  <div class="orders-container">
    <h1>Мои заказы</h1>
    <div v-if="orders.length">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <p>Номер заказа: {{ order.id }}</p>
        <p>Адрес доставки: {{ order.delivery_address }}</p>
        <p>Статус: {{ order.status }}</p>
        <div v-if="order.items.length">
          <p><strong>Товары:</strong></p>
          <div v-for="item in order.items" :key="item.product_name">
            <p>{{ item.product_name }} - Количество: {{ item.quantity }}</p>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>У вас нет заказов.</p>
    </div>
    <router-link to="/new-order" class="btn">Создать новый заказ</router-link>
    <router-link to="/" class="btn">Вернуться в меню</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/orders', {
          withCredentials: true // Отправка cookies с запросом
        });
      this.orders = response.data;
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    }
  }
};
</script>

<style scoped>
.orders-container {
  max-width: 600px;
  margin: 0 auto;
}
.order-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
