<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2 class="profile-title">个人信息</h2>
      
      <div class="info-item">
        <label class="info-label">用户名</label>
        <div class="info-content">{{ input[0] }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">账号</label>
        <div class="info-content">{{ input[1] }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">密码</label>
        <div class="info-content password-mask">{{ maskPassword(input[2]) }}</div>
      </div>

      <button class="submit-btn" @click="submitForm">
        <span>修改信息</span>
      </button>
    </div>
  </div>
</template>


<script setup>
import axios from '@/utils/request';;
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
const input = ref(new Array(3).fill(""))
const orgin = new Array(3).fill("")
const useroute = useRoute()
const userouter = useRouter()

console.log("sss",useroute.query.id)
axios({
  method: 'get',
  url: "/Admin/queryAdminId",
  params:({
    adminId:useroute.query.id
  })
}).then(req => {
  orgin[0] = req.data.name
  input.value[0] = orgin[0]
})

axios({
  method: 'get',
  url: "/User/queryReferenceId",
  params:({
    referenceId : useroute.query.id
  })
}).then(req => {
  input.value[1] = req.data.username
  input.value[2] = req.data.password
})

const maskPassword = (pwd) => {
  return pwd ? '*'.repeat(pwd.length) : ''
}

function submitForm(){
  userouter.push({
    path:'/guanliyuanYe/adminJianYe',
    query:{
      adminName:input.value[0],
      adminId:useroute.query.id,
      username:input.value[1],
      password:input.value[2]
    }
  })
}

</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fa;
  min-height: 100vh;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.profile-title {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  margin: 1.5rem 0;
}

.info-label {
  display: block;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.info-content {
  font-size: 1.1rem;
  padding: 0.8rem;
  border: 1px solid #ecf0f1;
  border-radius: 6px;
  background: #f8f9fa;
}

.password-mask {
  letter-spacing: 2px;
  color: #e74c3c;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>