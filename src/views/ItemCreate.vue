<template>
  <div class="container">
    <div class="page-header">
      <h1>상품등록</h1>
    </div>
  </div>
  <form @submit.prevent="itemCreate">
    <div class="from-group">
      <label>상품명</label>
      <input type="text" v-model="name" class="form-control">
    </div>
    <div class="from-group">
      <label>카테고리</label>
      <input type="text" v-model="category" class="form-control">
    </div>
    <div class="from-group">
      <label>가격 </label>
      <input type="number" v-model="price" class="form-control">
    </div>
    <div class="from-group">
      <label>재고수량 </label>
      <input type="number" v-model="stockQuantity" class="form-control">
    </div>
    <div class="from-group">
      <label>상품 이미지 </label>
      <!--@change 와 @click 비교 : 
          @changed은 요소가 클릭될때마다 함수 실행 
          @click는 해당 태그의 값이 변할때 함수 실행
      -->
      <div>
        <input type="file" accept="image/*"  @change="fileUpload">
      </div>
      
    </div>
    


    <div class="from-group">
      <button type="submit" class="btn btn-primary mt-3">등록</button>
    </div>
    <div th:if="${errorMessage != null}">
      <input type="hidden" id="error" th:value="${errorMessage}">
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default{
  data(){
    return{
      name:"",
      category:"",
      price:null,
      stockQuantity:null,
      itemImage:null,
    }
  },
  methods:{
    fileUpload(event){
      // event.target : 이벤트가 발생한 DOM요소를 카리키는 객체
      this.itemImage = event.target.files[0];
    },
    async itemCreate(){
      // multi-part formdata형식의 경우 new FormData를 통해 객체 생성
      const registerData = new FormData();
      registerData.append("name",this.name);
      registerData.append("category",this.category);
      registerData.append("price",this.price);
      registerData.append("stockQuantity",this.stockQuantity);
      registerData.append("itemImage",this.itemImage);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`, registerData ,{headers});
      this.$router.push("/items/manage");
    }
  }
}
</script>

<style lang="scss" scoped>

</style>