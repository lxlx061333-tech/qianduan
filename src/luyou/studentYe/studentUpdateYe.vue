<template>
  <div class="styi">
    <div class="form-container">
      <!-- 学号 -->
      <div class="form-item">
        <label>学号</label>
        <input type="text" v-model="input[0]" :class = "{ 'error': error[0] }">
      </div>

      <!-- 姓名 -->
      <div class="form-item">
        <label>姓名</label>
        <input type="text" v-model="input[1]" :class = "{ 'error': error[1] }">
      </div>

      <!-- 性别 -->
      <div class="form-item">
        <label>性别</label>
        <select v-model="input[2]" class="form-select" :class = "{ 'error': error[2] }">
          <option value="男" selected>男</option>
          <option value="女">女</option>
        </select>
      </div>

      <!-- 出生日期 -->
      <div class="form-item">
        <label>出生日期</label>
        <input type="date" v-model="input[3]" class="form-datepicker" placeholder=" " :class = "{ 'error': error[3] }">
      </div>

      <!-- 手机号 -->
      <div class="form-item">
        <label>手机号</label>
        <input type="tel" v-model="input[4]" pattern="[0-9]{11}" :class = "{ 'error': error[4] }">
      </div>

      <!-- 邮箱 -->
      <div class="form-item">
        <label>邮箱</label>
        <input type="email" v-model="input[5]" :class = "{ 'error': error[5] }">
      </div>

      <!-- 班级 -->
      <div class="form-item">
        <label>班级</label>
        <select v-model="input[6]" class="form-select" :class = "{ 'error': error[6] }">
          <option v-for="item in classSchedule" :key="item.classId" :value="item.classId">
            {{ item.className }}
          </option>
        </select>
      </div>

      <!-- 专业 -->
      <div class="form-item">
        <label>专业</label>
        <select v-model="input[7]" class="form-select" :class = "{ 'error': error[7] }">
          <option v-for="item in major" :key="item.majorId" :value="item.majorId">
            {{ item.majorName }}
          </option>
        </select>
      </div>

      <!-- 入学年份 -->
      <div class="form-item">
        <label>入学年份</label>
        <input type="date" v-model="input[8]" class="form-number" :class = "{ 'error': error[8] }">
      </div>

      <!-- 年级 -->
      <div class="form-item">
        <label>年级</label>
        <select v-model="input[9]" class="form-select" :class = "{ 'error': error[9] }">
          <option value="大一">大一</option>
          <option value="大二">大二</option>
          <option value="大三">大三</option>
          <option value="大四">大四</option>
        </select>
      </div>

      <!-- 所属院系 -->
      <div class="form-item">
        <label>所属院系</label>
        <select v-model="input[10]" class="form-select" :class = "{ 'error': error[10] }"> 
          <option v-for="item in department" :key="item.departmentId" :value="item.departmentId">
            {{ item.departmentName }}
          </option>
        </select>
      </div>

      <!-- 账号 -->
      <div class="form-item">
        <label>账号</label>
        <input type="text" v-model="input[11]" :class = "{ 'error': error[11] }">
      </div>

      <!-- 密码 -->
      <div class="form-item">
        <label>密码</label>
        <input type="password" v-model="input[12]" :class = "{ 'error': error[12] }">
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
import { useRouter, useRoute } from 'vue-router';
const userouter = useRouter()
const useroute = useRoute()
const classSchedule = ref([])
const major = ref([])
const department = ref([])
const input = ref(new Array(13).fill(''))
const originalInput = ref([])
const error = ref(Array(13).fill(false))
let phone = ''
let xuehao = ''
let zhanghao = ''

axios({
  method: 'get',
  url: "/ClassSchedule/queryAll"
}).then(req => {
  classSchedule.value = req.data
})

axios({
  method: 'get',
  url: "/Major/queryAll"
}).then(req => {
  major.value = req.data
})

axios({
  method: 'get',
  url: "/Department/queryAll"
}).then(req => {
  department.value = req.data
})

axios({
  method: 'get',
  url: "/Student/queryStudentId",
  params: ({
    studentId: useroute.query.studentId
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
    input.value[12] = req.data.user.password,
    xuehao = req.data.studentId,
    zhanghao = req.data.user.username,
    phone = req.data.phone
  originalInput.value = [...input.value]
})

function fan() {
  userouter.push({
    path: "/guanliyuanYe/studentUpdate"
  })
}

function resetForm() {
  input.value = new Array(11).fill('');
}

console.log(originalInput.value)

 async function submitForm() {
  error.value = Array(13).fill(false)
  let biao = true
  const zhi = ["学号", "姓名", "性别", "出生日期", "手机号", "邮箱", "班级", "专业", "入学日期", "年级", "所属院系","账号","密码"]
  for (let i = 0; i < input.value.length; i++) {
    console.log(originalInput.value[i])
    if (!input.value[i]?.toString().trim()) {
      biao = false
      alert(`${zhi[i]} 不能为空`)
      error.value[i] = true
      return
    }

    if (i === 4 && !/^1[3-9]\d{9}$/.test(input.value[i])) {
      biao = false
      alert("手机号格式不正确")
      error.value[i] = true
      return
    }

    // 邮箱格式验证（索引5）    
    if (i === 5 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value[i])) {
      biao = false
      alert("邮箱格式不正确")
      error.value[i] = true
      return
    }

  }

  const birthDate = new Date(input.value[3]);
  const enrollmentDate = new Date(input.value[8]);

  if (birthDate > enrollmentDate) {
    alert("出生日期不能晚于入学日期");
    biao = false;
    error.value[3] = true
    return;
  }

  const minEnrollmentDate = new Date(birthDate);
  minEnrollmentDate.setFullYear(birthDate.getFullYear() + 5);

  if (enrollmentDate < minEnrollmentDate) {
    alert("入学日期必须比出生日期至少晚5年");
    biao = false;
    error.value[3] = true
    return;
  }

  const changes = []
  const fieldNames = ["学号", "姓名", "性别", "出生日期", "手机号", "邮箱",
    "班级", "专业", "入学年份", "年级", "所属院系","账号","密码"]

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

  if (!confirm(`确定修改以下信息？\n\n${changeText}`)) {
    return
  }

  if (biao) {

    axios({
      url: "/Student/updateUpdate",
      params: {
        zhi: input.value,
        studentId: useroute.query.studentId
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
          path: '/studentUpdate'
        })
      } else {
        if(xuehao !== input.value[0]){
          yanXueHao()
          error.value[0] = true
          return
        }
        if(zhanghao !== input.value[11]){
          yanUsername()
          error.value[11] = true
          return
        }else if(phone !== input.value[4]){
          error.value[4] = true
          alert("修改失败,原因如下\n手机号已经存在请重新输入")
        }
      }
    })
  }
}

async function yanUsername(){
  let zhang = 0
  await axios({
          method: 'get',
          url: '/User/queryUsername',
          params: {
            username: input.value[11],
          }
        }).then(req => {
          if (req.data === 1) {
            zhang = 1
          }
          if (zhang === 1) {
          alert("修改失败,原因如下\n账号已经存在请重新输入")
        }
        })
}

async function yanXueHao(){
  let xue = 0
  await axios({
          method: 'get',
          url: '/Student/queryId',
          params: {
            studentId: input.value[0],
          }
        }).then(req => {
          if (req.data === 1) {
            xue = 1
          }
          if (xue === 1) {
          alert("修改失败,原因如下\n学号已经存在请重新输入")
          return;
        }
        })
}


function formatDisplayValue(value, index) {
  // 处理空值
  if (value === null || value === undefined) return '空值';

  // 特殊字段处理逻辑
  switch (index) {
    case 6: // 班级ID转名称
      return classSchedule.value.find(c => c.classId == value)?.className || value;

    case 7: // 专业ID转名称
      return major.value.find(m => m.majorId == value)?.majorName || value;

    case 10: // 院系ID转名称
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
  margin-bottom: 2rem;
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
</style>