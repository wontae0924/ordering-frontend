import {createRouter,createWebHistory} from 'vue-router';
// import HomeComponent from '@/components/HomeComponent.vue';
import ItemList from '@/views/ItemList.vue'
import Login from '@/views/LoginComponent.vue'
import BasicComponet from '@/components/BasicComponent.vue'
// export default인경우에는 {}가 필요없고 , 여러개 요소가 있을경우에는 {}필요
import { memberRouters } from './memberRouter.js';
import { ordersRouters } from './orderRouter.js';
import { itemsRouters } from './itemRouter.js';

const routes = [
  {path:'/' , name: 'HOME' , component: ItemList},
  {path:'/login' , name: 'Login' , component: Login},
  {path:'/basic' , name: 'basic' , component: BasicComponet},

  //  ...은 스프레드 연산자로 불리고, 주로 배열요소를 다른 배열요소에 합할때 사용
  ...memberRouters,
  ...ordersRouters,
  ...itemsRouters
]
const router = createRouter({
  // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
  // 1) createWebHistory,createWebHashHistory
  history: createWebHistory(),
  routes
}
);
export default router;