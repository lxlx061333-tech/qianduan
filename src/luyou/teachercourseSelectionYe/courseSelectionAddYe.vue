<template>
  <div class="styi">
    <div class="form-container">

      <div class=" form-item">
        <!-- <span class="info-label">课程名称</span> -->
        <label>课程名称</label>
        <span class="info-content">{{ useroute.query.name }}</span>
      </div>

      <!-- 开始时间 -->
      <div class="form-item">
        <label>开始时间</label>
        <input type="text" v-model="input[0]" placeholder="格式为yyyy-MM-dd HH:mm:ss" :class = "{ 'error': error[0] }">
      </div>

      <!-- 结束时间 -->
      <div class="form-item">
        <label>结束时间</label>
        <input type="text" v-model="input[1]" placeholder="格式为yyyy-MM-dd HH:mm:ss" :class = "{ 'error': error[1] }">
      </div>

      <!-- 状态 -->
      <div class="form-item">
        <label>状态</label>
        <select v-model="input[2]" class="form-select" :class = "{ 'error': error[2] }">
          <option value="开放">开放</option>
          <option valeu="不开放">不开放</option>
        </select>
      </div>

    </div>

    <div class="button-group">
      <button class="submit-btn" @click="submitForm">
        <span>添加信息</span>
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
import {useRoute,useRouter} from 'vue-router'
const useroute = useRoute()
const userouter = useRouter()
const input = ref(new Array(4).fill(''))
const error = ref(new Array(8).fill(false))

function resetForm() {
  input.value = new Array(4).fill('');
}

function submitForm() {
  error.value = Array(4).fill(false)
  let biao = true
  input.value[3] = useroute.query.id
  const zhi = ["开始时间", "结束时间", "状态"]
  for (let i = 0; i < input.value.length - 1; i++) {
    console.log(i)
    if (!input.value[i]?.toString().trim()) {
      biao = false
      error.value[i] = true
      alert(`${zhi[i]} 不能为空`)
      break;
    }
    if ((i === 0 || i ===1)   && !/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]) (?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(input.value[i])){
      biao = false
      error.value[i] = true
      alert(`${zhi[i]}格式错误格式为yyyy-MM-dd HH:mm:ss\n或者数据错误如月份超出`)
      break;
    }
  }

  const birthDate = new Date(input.value[0]);
  const enrollmentDate = new Date(input.value[1]);

  if (birthDate > enrollmentDate) {
    alert("结束时间不能晚于开始时间");
    biao = false;
    error.value[1] = true
    return;
  }

  if (biao) {
    axios({
      url: "/CourseSelection/updateAdd",
      params: {
        zhi: input.value
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
        alert("添加成功")
        userouter.push({
          path:'/teacherYe/teachercourseSelectionAdd'
        })
      } else {
        alert("添加失败")
      }
    })
  }
}

function fan(){
  userouter.push({
    path:"/teacherYe/teachercourseSelectionAdd"
  })
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