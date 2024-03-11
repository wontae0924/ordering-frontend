<template>
  <div class="container">
    <div class="page-header">
      <h1>회원가입</h1>
    </div>
  </div>
  <form @submit.prevent="memberCreate">
    <div class="from-group">
      <label for="name">이름: </label>
      <input type="text" v-model="name" class="form-control">
    </div>
    <div class="from-group">
      <label for="email">이메일: </label>
      <input type="text" v-model="email" class="form-control">
    </div>
    <div class="from-group">
      <label for="password">비밀번호: </label>
      <input type="password" v-model="password" class="form-control">
    </div>
    <div class="row mt-2">
      <div class="from-group col">
        <label for="city">도시: </label>
        <input type="text" v-model="city" class="form-control">
      </div>
      <div class="from-group col">
        <label for="street">상세주소: </label>
        <input type="text" v-model="street" class="form-control">
      </div>
      <div class="from-group col">
        <label for="zipcode">우편번호: </label>
        <input type="text" v-model="zipcode" class="form-control">
      </div>
    </div>


    <div class="from-group">
      <button type="submit" class="btn btn-primary mt-3">가입완료</button>
    </div>
    <div th:if="${errorMessage != null}">
      <input type="hidden" id="error" th:value="${errorMessage}">
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      city: "",
      street: "",
      zipcode: "",
    }
  },
  methods: {
    async memberCreate() {
      try {
        const registerData = {
          name : this.name,
          email: this.email,
          password: this.password,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode
        };
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/create`, registerData);
        // window.location.href = "/login";
        this.$router.push({name : 'Login'});
      } catch (error) {
        const error_message = error.response.data.error_message;
        if (error_message) {
          console.log(error_message);
          alert(error_message);
        } else {
          console.log(error);
          alert("잘못된 입력값입니다.");
        }
      }
    }
  },
};
</script>
