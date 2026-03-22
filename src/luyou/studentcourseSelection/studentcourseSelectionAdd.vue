<template v-if="data.length > 0">
  <div class="styi">
    <div v-show="xianshike">
      <span class="info-content"> 当前课程都已经添加至选课表,请去添加课程 </span>
    </div>
    <div class="search-container" v-show="lk">
      <input type="text" v-model="sou" placeholder="输入课程名字或编号查询">
      <button @click="query">搜索</button>
    </div>
    <div v-for="(CourseSchedule, i) in data" :key="CourseSchedule.scheduleId">
      <div v-if="CourseSchedule.courseSelection !== null">
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

            <div class="info-item">
              <span class="info-label">学期 </span>
              <span class="info-content">{{ CourseSchedule.semester }}</span>
            </div>

            <div class="button-group">
              <button class="submit-btn" :disabled="isXian[i] || isExpired[i] || isStart[i] || isStatus[i]"
                @click="submitForm(CourseSchedule.courseId,CourseSchedule.scheduleId,CourseSchedule.courseName)">
                <span>{{  isStatus[i] ? '未开放' :
                  isStart[i] ? '未开始' :
                  isExpired[i] ? '已过期' :
                  isXian[i] ? '已添加' : '添加' }}</span>
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
  </div>
</template>



<script setup>
import axios from '@/utils/request';;
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const data = ref([])
const userouter = useRouter()
const useroute = useRoute()
const xian = ref(false)
const sou = ref("");
const xianshike = ref(false);
const lk = ref(true);
const cun = ref([])
const isXian = ref([])
const isExpired = ref([])
const isStart = ref([])
const isStatus = ref([])
console.log(useroute.query.studentId)
const loadData = async () => {
  try {
    const [scheduleRes, courseRes] = await Promise.all([
      axios.get("/CourseSchedule/queryAll"),
      axios.get("/StudentCourse/queryStudentId", {
        params: { studentId: useroute.query.studentId }
        // params: { studentId: "20230001" }
      })
    ])

    data.value = Array.isArray(scheduleRes?.data) ? scheduleRes.data : []
    cun.value = Array.isArray(courseRes.data) ? courseRes.data : [courseRes.data].filter(Boolean)

    const selectedSet = new Set(cun.value.map(c => c.scheduleId))
    isXian.value = data.value.map(item => selectedSet.has(item.scheduleId))

    xianshike.value = data.value.length === 0
    lk.value = data.value.length > 0

    isExpired.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return new Date(item.courseSelection.endTime) < new Date()
      }
    })

    isStart.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return new Date(item.courseSelection.startTime) > new Date()
      }
    })

    isStatus.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return item.courseSelection.status === '不开放'
      }
    })
    console.log(isXian)

  } catch (error) {
    console.error("数据加载失败:", error)
  }
}

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

// 在组件挂载时调用
onMounted(() => {
  loadData()
})


function fan() {
  loadData()
  xian.value = false
}

const loadData2 = async () => {
  try {
    const [scheduleRes, courseRes] = await Promise.all([
      axios.get("/CourseSchedule/queryNameAndId", {
        params: {
      zhi: sou.value,
    }
  }),
      axios.get("/StudentCourse/queryStudentId", {
        // params: { studentId: useroute.query.studentId }
        params: { studentId: "20230001" }
      })
    ])
    console.log(scheduleRes.data)
    console.log(courseRes.data)
    if (scheduleRes.data.length === 0) {
      userouter.push({
        path: '/studentYe/chano',
        query: {
          name: sou.value,
          yuan: '/studentYe/studentcourseSelectionAdd'
        }
      })
      return
    }
    data.value = Array.isArray(scheduleRes?.data) ? scheduleRes.data : []
    cun.value = Array.isArray(courseRes.data) ? courseRes.data : [courseRes.data].filter(Boolean)

    const selectedSet = new Set(cun.value.map(c => c.scheduleId))
    isXian.value = data.value.map(item => selectedSet.has(item.scheduleId))

    xianshike.value = data.value.length === 0
    lk.value = data.value.length > 0

    isExpired.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return new Date(item.courseSelection.endTime) < new Date()
      }
    })

    isStart.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return new Date(item.courseSelection.startTime) > new Date()
      }
    })

    isStatus.value = data.value.map(item => {
      if(item.courseSelection !== null){
      return item.courseSelection.status === '不开放'
      }
    })
    console.log(isXian)

  } catch (error) {
    console.error("数据加载失败:", error)
    // 可添加错误提示组件
  }
}
function query() {
  loadData2()
  xian.value = true
}

function submitForm(courseId,scheduleId,name) {
  let zhen = confirm(`确定要添加${name}课程吗?`)
  if(zhen){
    axios({
    method:'get',
    url:"/StudentCourse/updateAdd",
    params:({
      studentId:useroute.query.studentId,
      courseId:courseId,
      scheduleId:scheduleId
    })
  }).then(req=>{
    if (req.data === "yes") {
        alert("添加成功")
        loadData()
      } else {
        alert("添加失败")
      }
    })
  }
  }



</script>

<style scoped>
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

/* 新增过期状态样式 */
.submit-btn:disabled[disabled="true"] {
  background: #cccccc !important;
  color: #666;
  cursor: not-allowed;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #e0e0e0 !important;
  box-shadow: none;
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
