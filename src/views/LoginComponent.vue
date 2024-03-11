<template>
  <div>
    <div class="container">
      <div class="page-header">
        <h1>로그인</h1>
      </div>
    </div>
    <!-- submit은 기본적으로 폼 제출시 브라우저가 페이지를 새로고침하므로 해당동작을 막기 위해 prevent사용 -->
    <form @submit.prevent="doLogin">
      <div class="from-group">
        <label for="email">이메일: </label>
        <input type="text" v-model="email" class="form-control">
      </div>
      <div class="from-group">
        <label for="password">비밀번호: </label>
        <input type="password" v-model="password" class="form-control">
      </div>
      <div class="from-group">
        <button type="submit" class="btn btn-primary mt-3">로그인</button>
      </div>
      <div th:if="${errorMessage != null}">
        <input type="hidden" id="error" th:value="${errorMessage}">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
// jwt-decode에서 export시에 중괄호 넣어서 export하였으므로 import할떄에도 {} 넣어서 import
import {jwtDecode} from 'jwt-decode';

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async doLogin() {
      // 카ㅇ
      // 2가지 예외 가능성 : 
      // 1) 200번대 상태값이면서 token이 비어있는 경우
      // 2) 200번대 상태값이 아닌경우
      try {
        const loginData = { email: this.email, password: this.password };
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`, loginData);
        const token = response.data.result.token;
        if (token) {
          const decoded = jwtDecode(token);
          console.log(decoded);
          localStorage.setItem("token", token);
          localStorage.setItem("role",decoded.role);
          // created함수는 reload될때 1번만 실행되는 hook함수
          // 그런데, router.push를 통한 화면전환은 reload를 실행시키지 않으므로 created함수 호출이 되지 않음
          // this.$router.push("/");
          window.location.href = "/";
        } else {
          console.log("200 ok but not token");
          alert("Login Failed11")
        }
      } catch (error) {
        const error_message = error.response.data.error_message;
        if (error_message){
          console.log(error_message);
          alert(error_message);
        } else {
          console.log(error);
          alert("Login Failed")
        }
      }
    }
  },
};
</script>
