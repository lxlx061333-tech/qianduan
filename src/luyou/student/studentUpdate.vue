<template>
  <div class="styi">
    <div class="search-container">
      <input type="text" v-model="sou" placeholder="输入学生姓名或学号查询">
      <button @click="query">搜索</button>
    </div>
    <div v-for="student in data" :key="student.studentId">
      <div>
        <div class="student-card">
          <div class="student-info">

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">姓名</span>
                <span class="info-content">{{ student.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">性别</span>
                <span class="info-content">{{ student.gender }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">出生日期</span>
                <span class="info-content">{{ formatDate(student.birthDate) }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">入学日期</span>
                <span class="info-content">{{ formatDate(student.enrollmentDate) }}</span>
              </div>
            </div>

            <div class="info-item full-width">
              <span class="info-label">学号</span>
              <span class="info-content">{{ student.studentId }}</span>
            </div>

            <div class="info-item full-width">
              <span class="info-label">联系电话</span>
              <span class="info-content">{{ student.phone }}</span>
            </div>

            <div class="info-item full-width">
              <span class="info-label">电子邮箱</span>
              <span class="info-content">{{ student.email }}</span>
            </div>

            <div class="info-item qubian">
              <span class="info-label">当前年级</span>
              <span class="info-content">{{ student.grade }}</span>
            </div>

            <div class="info-item">
                <span class="info-label">用户名</span>
                <span class="info-content">{{ student.user.username}}</span>
              </div>

              <div class="info-item qubian">
                <span class="info-label">密码</span>
                <span class="info-content"> {{ maskPassword(student.user.password) }}</span>
              </div>

            <div class="button-group">
              <button class="submit-btn" @click="submitForm(student.studentId)">
                <span>修改信息</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <button v-show="xian" @click="fan" class="floating-btn">
      返回列表
    </button>
  </div>
</template>
<script setup>
import axios from '@/utils/request';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const data = ref([])
const sou = ref("")
const xian = ref(false)
const userouter = useRouter()

axios({
  method: 'get',
  url: "/Student/queryAll",
}).then(req => {
  data.value = req.data
  console.log(data.value[0].studentId)
})

const maskPassword = (pwd) => {
  return pwd ? '*'.repeat(pwd.length) : ''
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

function fan() {
  xian.value = false
  sou.value = ''
  axios({
    method: 'get',
    url: "/Student/queryAll",
  }).then(req => {
    data.value = req.data
  })
}



function query() {
  console.log("我是sou" + sou.value)
  axios({
    method: 'get',
    url: '/Student/queryNameAndId',
    params: {
      zhi: sou.value,
    }
  }).then(req => {
    data.value = req.data
    if (req.data === '' || req.data.length === 0) {
      console.log("我是空")
      userouter.push({
        path: '/guanliyuanYe/chano',
        query: {
          name: sou.value,
          yuan: '/guanliyuanYe/student'
        }
      })
    } else {
      data.value = Array.isArray(req.data) ? req.data : [req.data].filter(Boolean)
      xian.value = true
    }
  })
}

function submitForm(studentId){
  userouter.push({
    path:"/guanliyuanYe/studentUpdateYe",
    query:{
      studentId:studentId,
    }
  })
}

</script>
<style scoped>

.styi{
  width:100%;
  height: 100%;
  overflow: auto;
}

.styi{
  width:100%;
  height: 100%;
  overflow: auto;
}
.student-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 600px;
  margin: 20px auto;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.student-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-item.full-width {
  grid-column: span 2;
}

.info-label {
  color: #666;
  font-weight: 500;
  min-width: 100px;
  margin-right: 24px;
  font-size: 14px;
}

.info-content {
  color: #333;
  font-weight: 600;
  font-size: 15px;
  flex-grow: 1;
}

/* 最后一个信息项去掉下划线 */
.qubian {
  border-bottom: none;
  padding-bottom: 0;
}

/* 新增搜索容器样式 */
.search-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 0 24px;
  display: flex;
  gap: 12px;
}

/* 输入框样式 */
input[type="text"] {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #6b6b83;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

input[type="text"]:focus {
  outline: none;
  border-color: #3b8d99;
  box-shadow: 0 4px 8px rgba(59, 141, 153, 0.2);
}

/* 按钮通用样式 */
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

/* 按钮样式 */

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 2rem;
}

.submit-btn,
.reset-btn {
  flex: 1;
  max-width: 240px;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, #3b8d99 0%, #4a9cad 100%);
  color: white;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #327a85 0%, #3b8d99 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 141, 153, 0.3);
}

.reset-btn {
  background: linear-gradient(135deg, #f5f6fa 0%, #dcdde1 100%);
  color: #2d3436;
  border: 1px solid #e0e3e7;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f5f6fa 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(206, 212, 218, 0.3);
}
/* 按钮样式结束 */

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 141, 153, 0.3);
}

/* 返回按钮特殊样式 */
button[v-show] {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(170, 75, 107, 0.9);
  backdrop-filter: blur(5px);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .info-row {
    grid-template-columns: 1fr;
  }
  
  .info-item.full-width {
    grid-column: span 1;
  }
  
  .info-label {
    min-width: 80px;
    margin-right: 16px;
  }
}
</style>
