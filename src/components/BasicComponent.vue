<template>
  <h1>
    hello world {{ myLang }}
  </h1>
  <input type="text" value="myvalue">
  <!-- :value는 v-bind:value= 의 축약어 -->
  <!-- v-bind는 input박스에서 많이 사용하는 단방향 데이터 바인딩 방식 -->
  <input type="text" :value="inputvalue1" />
  <!-- v-model 양방향 데이터 바인딩 모델이라는 차이점 -->
  <input type="text" v-model="inputvalue2" />
  <!-- onclick과 같은게 @click -->
  <button @click="showValue">변수변경사항확인</button>
  <div>
    <h2>{{ count }}</h2>
    <button @click="increment">increment</button>
    <h2>{{ doublecount }}</h2>
    <button @click="increment">doublecount</button>
  </div>
    

</template>
  
<script>
export default {
  data() {
    return {
      myLang: "python",
      inputvalue1: "python2",
      inputvalue2: "python3",
      count :0
    }
  },
  // vue생명주기에서 인스턴스가 생성되는 시점을 created라고 하고, 화면이 열리기전에 실행되는 함수. 
  created () {
    this.myLang = "java";
  },
  computed:{
    // computed는 종속된 반응형 데이터가 변경될때만 함수를 다시 실행하여 값을 계산하는 계산함수
    doublecount(){
      return this.count *2;
    }
  },
  methods: {
    showValue() {
      alert(this.inputvalue2);
    },
    increment() {
      this.count += Math.floor(Math.random() * 100);
    }
  },
}
</script>
  
<style></style>
  