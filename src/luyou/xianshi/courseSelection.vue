<template>
  <div class="styi"> 
    <div class="search-container">
      <input type="text" v-model="sou" placeholder="输入课程名字或编号或选课状态查询">
      <button @click="query">搜索</button>
    </div>
      <div v-for="CourseSchedule in data" :key="CourseSchedule.scheduleId">
        <div v-if="CourseSchedule.courseSelection !== null">
          <div class="student-card">           
            <div class="student-info">

              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">课程名称</span>
                  <span class="info-content">{{ CourseSchedule.courseName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">课程编号</span>
                  <span class="info-content">{{ CourseSchedule.courseId }}</span>
                </div>
              </div>
              
              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">上课时间段</span>
                  <span class="info-content">{{ CourseSchedule.timeSlot }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">星期</span>
                  <span class="info-content">{{ CourseSchedule.weekDay }}</span>
                </div>
              </div>

              <div class="info-row" >
                <div class="info-item">
                  <span class="info-label">选课开始时间</span>
                  <span class="info-content">{{ formatDate(CourseSchedule.courseSelection.startTime) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">选课结束时间</span>
                  <span class="info-content">{{ formatDate(CourseSchedule.courseSelection.endTime) }}</span>
                </div>
              </div>

              <div class="info-row">
                <div class="info-item">
                  <span class="info-label">教室</span>
                  <span class="info-content">{{  CourseSchedule.classroom }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">授课老师</span>
                  <span class="info-content">{{ CourseSchedule.teacher.name }}</span>
                </div>
              </div>

              <div class="info-item">
                <span class="info-label">学期</span>
                <span class="info-content">{{ CourseSchedule.semester }}</span>
              </div>

              <div class="info-item">
                <span class="info-label">选课状态</span>
                <span class="info-content">{{ CourseSchedule.courseSelection.status }}</span>
              </div>

            </div>
            </div>

        </div>
      </div>
      <button v-show="xian" @click="dian" class="floating-btn">
        返回列表
    </button>
  </div>
</template>
<script setup>
import axios from '@/utils/request';;
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const data = ref([])
const userouter = useRouter()
const xian = ref(false)
const sou = ref("");
axios({
  method:'get',
  url:"/CourseSchedule/queryAll",
}).then(req =>{
  data.value = req.data
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  
  // 处理无效日期
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份补零
  const day = String(date.getDate()).padStart(2, '0')        // 日期补零
  const hours = String(date.getHours()).padStart(2, '0')     // 小时补零
  const minutes = String(date.getMinutes()).padStart(2, '0') // 分钟补零
  const seconds = String(date.getSeconds()).padStart(2, '0') // 秒补零

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}


function dian(){
  xian.value = false
  sou.value = ''
  axios({
  method:'get',
  url:"/CourseSchedule/queryAll",
}).then(req =>{
  data.value = req.data
})
}

function query(){

  axios({
    method:'get',
    url:'/CourseSchedule/queryIdAndCourseSelectionStatusMoHu',
    params:{
      zhi:sou.value,
    }
  }).then (req =>{
      data.value = req.data
      if(req.data === ''|| req.data.length === 0){
        console.log("我是空")
        userouter.push({
        path : '/guanliyuanYe/chano',
        query : {
          name : sou.value,
          yuan : '/guanliyuanYe/courseSelection'
      }
    })
    }else{
      data.value = Array.isArray(req.data) ? req.data : [req.data].filter(Boolean)
      xian.value = true
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
