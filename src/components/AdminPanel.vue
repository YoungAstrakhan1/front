<template>
  <div class="admin-orders-container">
    <h1>Заказы администратора</h1>
    <div v-if="orders.length">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <p>Номер заказа: {{ order.id }}</p>
        <p>Полное имя пользователя: {{ order.user_full_name }}</p>
        <p>Email пользователя: {{ order.user_email }}</p>
        <p>Адрес доставки: {{ order.delivery_address }}</p>
        <p>Статус: {{ order.status }}</p>
        <div v-if="order.items.length">
          <p><strong>Товары:</strong></p>
          <div v-for="item in order.items" :key="item.product_name">
            <p>{{ item.product_name }} - Количество: {{ item.quantity }}</p>
          </div>
        </div>
        <div>
          <label for="newStatus">Новый статус:</label>
          <input type="text" id="newStatus" v-model="newStatus">
          <button @click="updateOrderStatus(order.id, newStatus)">Изменить статус</button>
        </div>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>Нет заказов для отображения.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      newStatus: ''
    };
  },
  async created() {
    this.loadOrders();
  },
  methods: {
    async updateOrderStatus(orderId, newStatus) {
      try {
        const response = await axios.put(`http://localhost:8000/admin/orders/${orderId}`, {
          status: newStatus
        }, {
          withCredentials: true
        });
        console.log('Статус заказа обновлен:', response.data);
        this.loadOrders();
      } catch (error) {
        console.error('Ошибка обновления статуса заказа:', error);
      }
    },
    async loadOrders() {
      try {
        const response = await axios.get('http://localhost:8000/admin/orders', {
          withCredentials: true
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      }
    }
  }
};
</script>

<style scoped>
.admin-orders-container {
  max-width: 800px;
  margin: 0 auto;
}
.order-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
