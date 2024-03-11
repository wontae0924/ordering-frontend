<template>
  <div class="container">
    <div class="page-header text-center mt-3">
      <h1>회원 wjdqh</h1>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <td>이름</td>
          <td>{{ memberInfo.name }}</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>{{ memberInfo.email }}</td>
        </tr>
        <tr>
          <td>도시</td>
          <td>{{ memberInfo.city }}</td>
        </tr>
        <tr>
          <td>상세주소</td>
          <td>{{ memberInfo.street }}</td>
        </tr>
        <tr>
          <td>우편번호</td>
          <td>{{ memberInfo.zipcode }}</td>
        </tr>
      </thead>
      <!-- <tbody>

        <tr v-for="member in memberList" :key="member.id">
          <th>{{ member.id }}</th>
          <th>{{ member.name }}</th>
          <th>{{ member.email }}</th>
          <th><a :href="`/member/${member.id}/orders`">{{ member.orderCount }}</a></th>
        </tr>
      </tbody> -->
    </table>
  </div>

  <OrderListComponent :isAdmin="false" apiUrl="/member/myorders" />
</template>

<script>
import axios from 'axios';
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
  data() {
    return {
      memberInfo: []
    }
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myInfo`, { headers });
      this.memberInfo = response.data;
    }catch(error){
      console("권한이 없습니다" +  error);
    }
    
  },
  components: {
    OrderListComponent
  }
};
</script>

<style lang="scss" scoped></style>