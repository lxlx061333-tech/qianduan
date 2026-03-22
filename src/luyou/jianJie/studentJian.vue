<template>
  <div class="profile-container">
    <div class="profile-card">
      <h2 class="profile-title">个人信息</h2>
      
      <!-- 滚动内容区域 -->
      <div class="scroll-content">
        <div class="info-item">
          <label class="info-label">学号</label>
          <div class="info-content">{{ input[0] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">姓名</label>
          <div class="info-content">{{ input[1] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">性别</label>
          <div class="info-content">{{ input[2] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">出生日期</label>
          <div class="info-content">{{ input[3] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">手机号</label>
          <div class="info-content">{{ input[4] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">邮箱</label>
          <div class="info-content">{{ input[5] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">班级</label>
          <div class="info-content">{{ input[6] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">专业</label>
          <div class="info-content">{{ input[7] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">入学年份</label>
          <div class="info-content">{{ input[8] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">年级</label>
          <div class="info-content">{{ input[9] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">所属院系</label>
          <div class="info-content">{{ input[10] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">账号</label>
          <div class="info-content">{{ input[11] }}</div>
        </div>

        <div class="info-item">
          <label class="info-label">密码</label>
          <div class="info-content password-mask">{{ maskPassword(input[12]) }}</div>
        </div>
      </div>

      <button class="submit-btn wai" @click="submitForm">
        <span>修改信息</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from '@/utils/request';;
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
const input = ref(new Array(9).fill(""))
const useroute = useRoute()
const userouter = useRouter()

console.log("sss",useroute.query.id)
axios({
  method: 'get',
  url: "/Student/queryStudentId",
  params:({
    studentId:useroute.query.studentId
  })
}).then(req => {
  input.value[0] = req.data.studentId,
    input.value[1] = req.data.name,
    input.value[2] = req.data.gender,
    input.value[3] = req.data.birthDate,
    input.value[4] = req.data.phone,
    input.value[5] = req.data.email,
    input.value[6] = req.data.classId,
    input.value[7] = req.data.majorId,
    input.value[8] = req.data.enrollmentDate,
    input.value[9] = req.data.grade,
    input.value[10] = req.data.departmentId,
    input.value[11] = req.data.user.username,
    input.value[12] = req.data.user.password
})


const maskPassword = (pwd) => {
  return pwd ? '*'.repeat(pwd.length) : ''
}

function submitForm(){
  userouter.push({
    path:'/studentYe/studentJianYe',
    query:{
      studentId:useroute.query.studentId,
    }
  })
}

</script>

<style scoped>
.wai{
  margin-bottom: 50px;
}
.profile-container {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fa;
  box-sizing: border-box;
}

.profile-card {
  background: white;
  height: auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.scroll-content {
  flex: 1;
  overflow: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
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
  margin-top: auto;
  position: sticky;
  bottom: 0;
  z-index: 1;
}

.submit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 滚动条美化 */
.scroll-content::-webkit-scrollbar {
  width: 8px;
}

.scroll-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.scroll-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>