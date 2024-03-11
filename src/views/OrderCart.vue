<template>
  <div class="container">
    <div class="page-header text-center mt-3">
      <h1>주문 목록</h1>
    </div>
    <div class="items-right">
        <button class="btn btn-secondary mr-3" @click="clearCrat">장바구니 비우기</button>
        <button class="btn btn-success" @click="placeOrder">주문하기</button>
      </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th>제품ID</th>
          <th>제품명</th>
          <th>주문수량</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="item in getCartItems" :key="item.itemId">
          <th>{{ item.itemId }}</th>
          <th>{{ item.name }}</th>
          <th>{{ item.count }}</th>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters , mapActions} from "vuex";
export default {
  computed:{
    ...mapGetters(['getCartItems','getTotalQuantity'])
  },
  methods:{
    ...mapActions(['clearCart']),
    clearCrat(){
      if(this.getTotalQuantity < 1){
          alert("장바구니에 물건이 없습니다.");
          return;
        }
      this.$store.dispatch('clearCrat');
    },
    async placeOrder() {
      const orderItems = this.getCartItems.map(item => {
        return {itemId:item.itemId , count : item.count};}
        )
        if(this.getTotalQuantity < 1){
          alert("장바구니에 물건이 없습니다.");
          return;
        }
        if((!confirm(`${this.getTotalQuantity} 개의 상품을 주문하시겠습니까?`))){
          console.log("주문이 취소 되었습니다")
          return;
        }
        
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderItems, { headers })
        console.log(orderItems);
        alert("주문완료되었습니다.");
        this.$store.commit('clearCrat')
  
      } catch (error) {
        console.log(error);
        alert("주문이 실패되었습니다.");
      }
    },
    
  }
}  
</script>