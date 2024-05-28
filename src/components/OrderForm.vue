<template>
  <div class="order-form-container">
    <h2>Форма заказа</h2>
    <form @submit.prevent="submitOrder">
      <div v-for="product in products" :key="product.id">
        <label>{{ product.name }}</label>
        <input type="number" v-model="quantities[product.id]" min="0" required>
      </div>
      <div>
        <label for="delivery-address">Адрес доставки</label>
        <input type="text" id="delivery-address" v-model="deliveryAddress" required>
      </div>
      <button type="submit">Отправить заказ</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      quantities: {}, // Объект для хранения количества каждого товара
      deliveryAddress: '' // Адрес доставки
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/products', {
        withCredentials: true // Отправка cookies с запросом
      });
      this.products = response.data;
      // Инициализируем количество каждого товара нулем
      this.products.forEach(product => {
        this.quantities[product.id] = 0;
      });
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    }
  },
  methods: {
    async submitOrder() {
      // Создаем заказ на основе выбранных товаров, их количества и адреса доставки
      const order = {
        items: [],
        delivery_address: this.deliveryAddress
      };
      for (const productId in this.quantities) {
        const quantity = this.quantities[productId];
        if (quantity > 0) {
          order.items.push({ product_id: productId, quantity });
        }
      }
      // Отправляем заказ на сервер
      try {
        await axios.post('http://localhost:8000/orders', order, {
          withCredentials: true // Отправка cookies с запросом
        });
        alert('Заказ успешно отправлен!');
        // Очищаем количество каждого товара и адрес доставки после отправки заказа
        for (const productId in this.quantities) {
          this.quantities[productId] = 0;
        }
        this.deliveryAddress = '';
      } catch (error) {
        console.error('Ошибка отправки заказа:', error);
      }
    }
  }
};
</script>

<style scoped>
.order-form-container {
  max-width: 400px;
  margin: 0 auto;
}
.order-form-container label {
  display: block;
  margin-bottom: 5px;
}
.order-form-container input[type="number"], 
.order-form-container input[type="text"] {
  width: 100%;
  margin-bottom: 10px;
}
.order-form-container button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.order-form-container button:hover {
  background-color: #0056b3;
}
</style>
