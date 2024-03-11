<template>
  <div class="container">
    <div class="page-header text-center mt-3">
      <h1>회원 목록</h1>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>이메일</th>
          <th>주문수량</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="member in memberList" :key="member.id">
          <th>{{ member.id }}</th>
          <th>{{ member.name }}</th>
          <th>{{ member.email }}</th>
          <th><a :href="`/member/${member.id}/orders`">{{ member.orderCount }}</a></th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      memberList: []
    }
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/members`, { headers });
      this.memberList = response.data;
    }catch(error){
      console("권한이 없습니다" +  error);
    }
    
  },
};
</script>

