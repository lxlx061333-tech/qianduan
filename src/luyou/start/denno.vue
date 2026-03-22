<template>
  密码或者账号错误
  <button @click="k">返回登录</button>
</template>
<script setup>
import {useRouter} from 'vue-router'
const userouter = useRouter();
function k(){
  userouter.push("/denlu")
}
</script>