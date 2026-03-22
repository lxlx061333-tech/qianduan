<template>
  <div class="styi">
    <div class="form-container">
      <!-- 工号 -->
      <div class="form-item">
        <label>工号</label>
        <input type="text" v-model="input[0]" :class = "{ 'error': error[0] }">
      </div>

      <!-- 职称 -->
      <div class="form-item">
        <label>职称</label>
        <input type="text" v-model="input[1]" :class = "{ 'error': error[1] }">
      </div>

      <!-- 名字 -->
      <div class="form-item">
        <label>名字</label>
        <input type="text" v-model="input[2]" :class = "{ 'error': error[2] }">
      </div>

      <!-- 性别 -->
      <div class="form-item">
        <label>性别</label>
        <select v-model="input[6]" class="form-select" :class = "{ 'error': error[6] }">
          <option value="男" selected>男</option>
          <option value="女">女</option>
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

       <!-- 账号 -->
       <div class="form-item">
        <label>账号</label>
        <input type="text" v-model="input[7]" :class = "{ 'error': error[7] }">
      </div>

      <!-- 密码 -->
      <div class="form-item">
        <label>密码</label>
        <input type="password" v-model="input[8]" :class = "{ 'error': error[8] }">
      </div>

    </div>
    <div class="button-group">
  <button class="submit-btn" @click="submitForm">
    <span>提交信息</span>
  </button>
  <button class="reset-btn" @click="resetForm">
    <span>重置表单</span>
  </button>
</div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from '@/utils/request';
import qs from 'qs';
const department = ref([])
const input = ref(new Array(9).fill(''))
const error = ref(Array(9).fill(false))

axios({
  method: 'get',
  url: "/Department/queryAll"
}).then(req => {
  department.value = req.data
})

function resetForm(){
  input.value = new Array(9).fill(''); 
}

function submitForm(){
  error.value = Array(9).fill(false)
  let biao = true
  const zhi =["工号","职称","名字","所属院系","手机号","邮箱","性别","账号","密码"]
  for(let i = 0; i < input.value.length ;i++){
    console.log(i)
    if (!input.value[i]?.toString().trim()) {
      biao = false
      error.value[i] = true
      alert(`${zhi[i]} 不能为空`)
      break
    }

    if (i === 4 && !/^1[3-9]\d{9}$/.test(input.value[i])) {
      biao = false
      error.value[i] = true
      alert("手机号格式不正确")
      break
    }

    // 邮箱格式验证（索引5）
    if (i === 5 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value[i])) {
      biao = false
      error.value[i] = true
      alert("邮箱格式不正确")
      break
    }
  }

  if(biao){
    axios({
      url:"/Teacher/updateAdd",
      params:{
        zhi:input.value
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
    }).then(req =>{
      if(req.data === "yes"){
        alert("添加成功")
        resetForm()
      }else{
        let gong = 0
        let zhang = 0
        try {
         axios({
          method: 'get',
          url: '/Teacher/queryTeacherId',
          params: {
            teacherId: input.value[0],
          }
        }).then(req => {
          if (req.data === '') {
           gong = 1
          }
          if(gong === 0){
            error.value[0] = true
            alert("添加失败,原因如下\n工号已存在重新输入")
            return 
          }
        })
        axios({
          method: 'get',
          url: '/User/queryUsername',
          params: {
            username: input.value[7],
          }
        }).then(req => {
          if (req.data === 1) {
            zhang = 1
          }
          if (zhang === 0) {
            error.value[7] = true
          alert("添加失败,原因如下\n手机号已经存在请重新输入")
        } else {
          error.value[4] = true
          alert("添加失败,原因如下\n账号已经存在请重新输入")
        }
        })
      }catch(error){
      alert("失败")
    }
      }
    })
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

.submit-btn, .reset-btn {
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