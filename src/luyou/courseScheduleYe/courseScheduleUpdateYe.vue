<template>
  <div class="styi">
    <div class="form-container">
      <!-- 课程编号 -->
      <div class="form-item">
        <label>课程编号</label>
        <input type="text" v-model="input[0]" :class = "{ 'error': error[0] }">
      </div>

      <!-- 课程名称 -->
      <div class="form-item">
        <label>课程名称</label>
        <input type="text" v-model="input[1]" :class = "{ 'error': error[1] }">
      </div>

      <!-- 授课教师 -->
      <div class="form-item">
        <label>授课教师</label>
        <select v-model="input[2]" class="form-select" :class = "{ 'error': error[2] }">
          <option v-for="item in teacher" :key="item.teacherId" :value="item.teacherId">
            {{ item.name }}
          </option>
        </select>
      </div>

      <!-- 所属院系 -->
      <div class="form-item">
        <label>所属院系</label>
        <select v-model="input[3]" class="form-select" :class = "{ 'error': error[3] }">
          <option v-for="item in department" :key="item.departmentId" :value="item.departmentId">
            {{ item.departmentName }}
          </option>
        </select>
      </div>

      <!-- 教室 -->
      <div class="form-item">
        <label>教室</label>
        <select v-model="input[4]" class="form-select" :class = "{ 'error': error[4] }">
          <option v-for="item in room" :key="item.roomID" :value="item.roomName">
            {{ item.roomName }}
          </option>
        </select>
      </div>

      <!-- 星期 -->
      <div class="form-item">
        <label>星期</label>
        <select v-model="input[5]" class="form-select" :class = "{ 'error': error[5] }">
          <option value="周一">周一</option>
          <option value="周二">周二</option>
          <option value="周三">周三</option>
          <option value="周四">周四</option>
          <option value="周五">周五</option>
          <option value="周六">周六</option>
          <option value="周日">周日</option>
        </select>
      </div>

      <!-- 时间段 -->
      <div class="form-item">
        <label>时间段</label>
        <select v-model="input[6]" class="form-select" :class = "{ 'error': error[6] }">
          <option value="08:00-09:30">08:00-09:30</option>
          <option value="09:30-11:00">09:30-11:00</option>
          <option value="08:30-10:00">08:30-10:00</option>
          <option value="10:30-12:00">10:30-12:00</option>
          <option value="10:00-12:00">10:00-12:00</option>
          <option value="13:30-15:00">13:30-15:00</option>
          <option value="14:00-16:00">14:00-16:00</option>
          <option value="15:30-17:00">15:30-17:00</option>
        </select>
      </div>

      <!-- 学期 -->
      <div class="form-item">
        <label>年级</label>
        <input type="text" v-model="input[7]" placeholder="格式为年份加某季如2024春季" :class = "{ 'error': error[7] }">
      </div>

    </div>

    <div class="button-group">
      <button class="submit-btn" @click="submitForm">
        <span>修改信息</span>
      </button>

      <button class="reset-btn" @click="resetForm">
        <span>重置表单</span>
      </button>

      <button class="reset-btn" @click="fan">
        <span>返回列表</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from '@/utils/request';;
import qs from 'qs';
import { useRoute,useRouter } from 'vue-router'
const department = ref([])
const input = ref(new Array(8).fill(''))
const teacher = ref([])
const useroute = useRoute()
const userouter = useRouter()
const originalInput = ref([])
const error = ref(Array(8).fill(false))

const room = ref([])

axios({
  method: 'get',
  url: "/Room/queryAll"
}).then(req => {
  room.value = req.data
})

axios({
  method: 'get',
  url: "/Department/queryAll"
}).then(req => {
  department.value = req.data
})

axios({
  method: 'get',
  url: "/Teacher/queryAll"
}).then(req => {
  teacher.value = req.data
})

axios({
  method: 'get',
  url: "/CourseSchedule/queryScheduleId",
  params: ({
    scheduleId: useroute.query.id
  })
}).then(rep => {
  input.value[0] = rep.data.courseId
  input.value[1] = rep.data.courseName
  input.value[2] = rep.data.teacher.teacherId
  input.value[3] = rep.data.department.departmentId
  input.value[4] = rep.data.classroom
  input.value[5] = rep.data.weekDay
  input.value[6] = rep.data.timeSlot
  input.value[7] = rep.data.semester
  originalInput.value = [...input.value]
})

function fan(){
  userouter.push({
    path:'/guanliyuanYe/courseScheduleUpdate'
  })
}

function resetForm() {
  input.value = new Array(8).fill('');
}

function submitForm() {
  error.value = Array(8).fill(false)
  let biao = true
  const zhi = ["课程编号", "课程名称", "授课教师", "所属院系", "教室", "星期", "时间段", "学期"]
  for (let i = 0; i < input.value.length; i++) {
    console.log(i)
    if (!input.value[i]?.toString().trim()) {
      biao = false
      alert(`${zhi[i]} 不能为空`)
      error.value[i] = true
      break
    }
    if (!/^\d{4}(春季|夏季|秋季|冬季)$/.test(input.value[7])) {
      alert("学期格式应为4位年份+季节,如2024春季");
      error.value[i] = true
      return;
    }
  }

  const changes = []
  const fieldNames = ["课程编号", "课程名称", "授课教师", "所属院系", "教室", "星期", "时间段", "学期"]

  input.value.forEach((currentVal, index) => {
    const originalVal = originalInput.value[index]
    if (String(currentVal).trim() !== String(originalVal).trim()) {
      changes.push({
        field: fieldNames[index],
        before: formatDisplayValue(originalVal, index),
        after: formatDisplayValue(currentVal, index)
      })
    }
  })

  if (changes.length === 0) {
    alert("未检测到任何修改")
    return
  }

  const changeText = changes.map(c => 
    `${c.field}:\n  原值 → ${c.before}\n  新值 → ${c.after}`
  ).join('\n\n')
  
  if (!confirm(`确定修改以下信息？\n\n${changeText}`)){
    return 
  }

  if (biao) {
    axios({
      url: "/CourseSchedule/updateUpdate",
      params: {
        zhi: input.value,
        scheduleId:useroute.query.id
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: 'repeat',  // 生成 zhi=value1&zhi=value2 格式
          encode: true,          // 自动编码特殊字符
          encoder: (str) =>
            encodeURIComponent(str)
              .replace(/%5B/g, '%5B')  // 可选：显式保留已编码的方括号
              .replace(/%5D/g, '%5D')
        });
      }
    }).then(req => {
      if (req.data === "yes") {
        alert("修改成功")
        userouter.push({
          path:'/guanliyuanYe/courseScheduleUpdate'
        })
      } else {
        error.value[0] = true
        alert("修改失败,原因如下\n课程编号已经存在")
      }
    })
  }
}

function formatDisplayValue(value, index) {
  // 处理空值
  if (value === null || value === undefined) return '空值';

  // 特殊字段处理逻辑
  switch(index) {
    case 3: // 班级ID转名称
      return teacher.value.find(c => c.teacherId == value)?.className || value;
    
    case 4: // 院系ID转名称
      return department.value.find(d => d.departmentId == value)?.departmentName || value;
    
    default:
      return value;
  }
}
</script>

<style scoped>
 .error {
  border-color: #ff4444 !important;
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

.styi {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-item {
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 1.5rem;
}

label {
  font-weight: 600;
  color: #2d3436;
  font-size: 0.95rem;
}

input,
select {
  padding: 0.8rem 1.2rem;
  border: 2px solid #e0e3e7;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.2);
  background: white;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2rem;
}

.form-datepicker::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}

.form-datepicker::placeholder {
  color: transparent;
}


.info-item {
  display: flex;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.info-content {
  color: #333;
  font-weight: 600;
  font-size: 15px;
}
</style>