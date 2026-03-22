<template>

  <div class="styi">
    <div class="form-container">
      <!-- 用户名 -->
      <div class="form-item">
        <label>用户名</label>
        <input type="text" v-model="input[0]" :class = "{ 'error': error[0] }">
      </div>

      <!-- 账号 -->
      <div class="form-item">
        <label>账号</label>
        <input type="text" v-model="input[1]" :class = "{ 'error': error[1] }">
      </div>

      <!-- 密码 -->
      <div class="form-item">
        <label>密码</label>
        <input type="password" v-model="input[2]" :class = "{ 'error': error[2] }">
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
        <span>返回个人信息</span>
      </button>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from '@/utils/request';;
import qs from 'qs';
import { useRoute,useRouter } from 'vue-router'
const input = ref(new Array(3).fill(''))
const error = ref(new Array(3).fill(false))
const useroute = useRoute()
const userouter = useRouter()
const originalInput = ref([])
console.log(useroute.query.adminId)

input.value[0] = useroute.query.adminName
input.value[1] = useroute.query.username
input.value[2] = useroute.query.password
originalInput.value = [...input.value]

console.log(input.value[0],useroute.query.adminName)


function resetForm() {
  input.value = new Array(3).fill('');
}

function submitForm() {
  error.value = Array(2).fill(false)
  let biao = true
  const zhi = ["用户名", "账号","密码"]
  for (let i = 0; i < input.value.length; i++) {
    console.log(i)
    if (!input.value[i]?.toString().trim()) {
      biao = false
      alert(`${zhi[i]} 不能为空`)
      error.value[i] = true
      break
    }
  }
  const changes = []
  const fieldNames = ["用户名", "账号","密码"]
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
      url: "/Admin/updateUpdate",
      params: {
        zhi: input.value,
        adminId : useroute.query.adminId
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
        fan()
      } else {
          alert("修改失败\n原因如下账号已存在")
          error.value[0] = true
      }
    })
  }
}

function fan(){
  userouter.push({
    path:'/guanliyuanYe/adminJian',
    query:{
     id : useroute.query.adminId
    }
  })
}

function formatDisplayValue(value, index) {
  // 处理空值
  if (value === null || value === undefined) return '空值';

      return value;
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
</style>