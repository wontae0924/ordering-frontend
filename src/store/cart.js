import { createStore } from 'vuex';
// initState,updateLocalStorage와 같은 함수는 스토어 정의 바깥에 위치
// 책임과 권한을 분리하는 개념적인 의도도 있지만, 다른 스토어나 다른상황에서 재사용성을 높이기 위한 아키텍처
function initState() {
  return {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalQuantity: localStorage.getItem('totalQuantity') || 0
  }
}
function updateLocalStorage(cartItems, totalQuantity) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('totalQuantity', totalQuantity);

}
export default createStore({
  // state : 상태를 의미하는 객체로서 initState를 통해 상태초기화
  state: initState,
  // mutations는 상태를 변경하는 함수들의 집합
  // vuex에서 커밋이라는 용어는 상태변경을 위해 mutation을 호출하는 과정을 의미
  mutations: {
    // addToCart 함수는 외부 컴포넌트(또는 action)에서 호출될 예정
    addToCart(state, item) {
      const existItem = state.cartItems.find(i => i.itemId === item.itemId);
      if (existItem) {
        existItem.count += item.count;
      } else {
        state.cartItems.push(item);
      }
      // totalCount
      state.totalQuantity = parseInt(state.totalQuantity) + item.count;

      updateLocalStorage(state.cartItems, state.totalQuantity);
    },
    clearCrat(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      updateLocalStorage(state.cartItems, state.totalQuantity);
    }
  },
  // actions를 통해 여러 뮤테이션을 연속적으로 커밋하거나, 비동기작업을 진행.
  // 일반적을 component에서 actions의 메서드를 호출하고 , actions에서 mutation메서드 호출.
  actions: {
    // context 매개변수가 주입. context매개변수 안에 state, commit등이 존재.
    addToCart(context,item) {
      context.commit('addToCart',item);
    },
    clearCrat(context) {
      context.commit('clearCrat');
    }
  },
  // 상태를 반환하는 함수들의 집합
  getters: {
    getCartItems: state => state.cartItems,
    getTotalQuantity: state => state.totalQuantity
  }
});