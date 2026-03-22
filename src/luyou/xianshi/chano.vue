<template>
  <div class="container">
    <div>你搜索的{{ name }}不存在请重试</div>
    <button @click="fan">确定</button>
  </div>
</template>
<script setup>
import {useRouter,useRoute} from 'vue-router'
const useroute = useRoute()
  const name = useroute.query.name
  const yuan = useroute.query.yuan
  const userouter = useRouter()
  function fan(){
    if(useroute.query.id === null){
      userouter.push({
      path:yuan
  })
    }else{
      userouter.push({
        path:yuan,
        query:{
          studentId: useroute.query.id
        }
      })
    }
   
  }
</script>

<style setup>
/* 外层容器样式 */
.container {
  display: flex;
  flex-direction: column;  /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center;     /* 水平居中 */
  height: 100vh;           /* 占满整个视口高度 */
  background: #f0f4f8;     /* 柔和背景色 */
}
.container div {
  font-size: 18px;
  color: #2c3e50;          /* 深蓝色文字 */
  margin-bottom: 20px;     /* 与按钮间距 */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1); /* 文字阴影 */
}
button {
  padding: 12px 28px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, #3b8d99 0%, #6b6b83 50%, #aa4b6b 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>