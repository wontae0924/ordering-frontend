<template>
  <HeaderComponent />
  <div>
    <router-view />
  </div>
<FooterComponent />
</template>

<script>
// 상대경로
// import HomeComponent from './components/HomeComponent.vue';
// 절대경로 : @는 jsconfig의 경로 키워드로 선언
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';


export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
};

</script>

<style>

</style>
