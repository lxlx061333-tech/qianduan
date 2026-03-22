<template>
  <div class="styi">
    <div class="search-container">
      <input type="text" v-model="sou" placeholder="输入课程名字或编号查询">
      <button @click="query">搜索</button>
    </div>
    <div v-for="(CourseSchedule,i) in data" :key="CourseSchedule.scheduleId">
      <div>
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
                <span class="info-label">时间段</span>
                <span class="info-content">{{ CourseSchedule.timeSlot }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">星期</span>
                <span class="info-content">{{ CourseSchedule.weekDay }}</span>
              </div>
            </div>

            <div class="info-row">
              <div class="info-item">
                <span class="info-label">教室</span>
                <span class="info-content">{{ CourseSchedule.classroom }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">授课老师</span>
                <span class="info-content">{{ CourseSchedule.teacher.name }}</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-label">学期 </span>
              <span class="info-content">{{ CourseSchedule.semester }}</span>
            </div>

            <div class="button-group">
              <button class="reset-btn" :disabled="isExpired[i]"
              @click="submitForm(CourseSchedule.courseId, CourseSchedule.courseName)">
                <span>{{ isExpired[i] ? "已经开课" : "删除选课" }}</span>
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
import axios from '@/utils/request';;
import { ref,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const data = ref([])
const userouter = useRouter()
const useroute = useRoute()
const xian = ref(false)
const sou = ref("");
const xianshike = ref(false);
const lk = ref(true);
const isExpired = ref([])
// axios({
//   method: 'get',
//   url: "/CourseSchedule/queryStudentId",
//   params:({
//     studentId : useroute.query.studentId
//   })
// }).then(req => {
//   data.value = req.data
//   if (data.value.length === 0) {
//     xianshike.value = true;
//     lk.value = false;
//   }
// })
onMounted(() => {
  loadData()
})

const loadData = async () => {
try {
    const [scheduleRes] = await Promise.all([
      axios.get("/CourseSchedule/queryStudentId", {
        params: { studentId: useroute.query.studentId }
      })
    ])
    data.value = Array.isArray(scheduleRes?.data) ? scheduleRes.data : [courseRes.data].filter(Boolean)
    console.log(data.value)
    xianshike.value = data.value.length === 0
    lk.value = data.value.length > 0

    isExpired.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return new Date(item.courseSelection.endTime) < new Date()
      }
    })
    console.log(isExpired.value)
  } catch (error) {
    console.error("数据加载失败:", error)
  }
}



function fan(){
  axios({
  method: 'get',
  url: "/CourseSchedule/queryStudentId",
  params:({
    studentId : useroute.query.studentId
  })
}).then(req => {
  data.value = req.data
  if (data.value.length === 0) {
    xianshike.value = true;
    lk.value = false;
  }
})
}

function query() {
  axios({
    method: 'get',
    url: '/CourseSchedule/queryStudentAndNameAndId',
    params: {
      studentId : useroute.query.studentId,
      zhi: sou.value,
    }
  }).then(req => {
    console.log(req.data)
    data.value = req.data
    if (req.data === '') {
      userouter.push({
        path: '/studentYe/chano',
        query: {
          name: sou.value,
          yuan: '/studentYe/studentcourseSelectionDelete',
          id:useroute.query.studentId
        }
      })
    } else {
      data.value = Array.isArray(req.data) ? req.data : [req.data].filter(Boolean)
      xian.value = true
    }
  })
}


function submitForm(courseId, name) {
  let zhen = confirm(`确定要取消${name}选课吗?`)
  if (zhen) {
    axios({
      url: '/StudentCourse/updateDelete',
      params: {
        studentId : useroute.query.studentId,
        courseId: courseId
      }
    }).then(req => {
      if (req.data === "yes") {
        alert("删除成功")
        fan()
      } else {
        alert("删除失败")
      }
    })
  } else {
    alert("已取消");
  }
}

</script>


<style scoped>
.styi {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.styi {
  width: 100%;
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
/* 增加 !important 强制覆盖 */
.reset-btn:disabled {
  background: #cccccc !important;
  opacity: 0.7;
  cursor: not-allowed;
}
.reset-btn {
  background: linear-gradient(135deg, #f5f6fa 0%, #dcdde1 100%);
  color: #2d3436;
  border: 1px solid #e0e3e7;
  transition: all 0.3s ease;
  /* 新增过渡 */
  position: relative;
  overflow: hidden;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%) !important;
  color: white;
  border-color: transparent;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
}

.reset-btn:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
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