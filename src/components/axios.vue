<template>
  <div>
    <span>账号</span><input type="text" v-model="user">
    <span>密码</span><input type="text" v-model="password">
  </div>
  <button @click="k">点击发送</button>
</template>
<script setup>
import axios from '@/utils/request';
import {ref} from 'vue'
import 
const user = ref('')
const password = ref('')
function k(){
  axios({
    method:'get',
    url:"/chaxun",
    params:{
      user:user.value,
      password:password.value
    }
  }).then(req=>{
    if(req.data === "yes"){

    }
  })
}
  
</script>