<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">欢迎登录</h2>
      <div class="form-group">
        <label class="input-label">
          <input type="text" v-model="user" placeholder="请输入账号" class="form-input">
        </label>
      </div>
      <div class="form-group">
        <label class="input-label">
          <input type="password" v-model="password" placeholder="请输入密码" class="form-input">
        </label>
      </div>
      <!-- <div class="role-selector">
        <p class="selector-title">选择登录身份</p>
        <div class="radio-group">
          <label class="radio-item">
            <input type="radio" v-model="dan" name="k" value="学生" checked hidden>
            <span class="custom-radio"></span>
            <span class="radio-label">学生</span>
          </label>
          <label class="radio-item">
            <input type="radio" v-model="dan" name="k" value="老师" hidden>
            <span class="custom-radio"></span>
            <span class="radio-label">老师</span>
          </label>
          <label class="radio-item">
            <input type="radio" v-model="dan" name="k" value="管理员" hidden>
            <span class="custom-radio"></span>
            <span class="radio-label">管理员</span>
          </label>
        </div> -->
      <!-- </div> -->
      <button @click="den" class="login-btn">立即登录</button>
      <div class="extra-links">
        <a href="#forgot">忘记密码?</a>
        <a href="#register">注册账号</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from '@/utils/request';
  const user = ref('')
  const password = ref('')
  const router = useRouter()
  function den(){
    axios({
      method:'get',
      url:"/User/denLu",
      params:{
        user:user.value,
        password:password.value,
      }
    }).then(req =>{
      console.log(user.value,password.value)
      if(req.data.length === 0){
        router.push('/denno')
      }else{
        sessionStorage.setItem('lei', 
        req.data[0] === '管理员' ? 'admin' : (req.data[0] === '教师' ? 'teacher' : 'student')
      );
        sessionStorage.setItem('denLu', true)
        if(req.data[0] === "管理员"){
          router.push(
          {
            path:"/guanliyuanYe",
            query:{
              type:req.data[0],          //类型
              name:req.data[1],          //名字
              id:req.data[2]
            }
          }
        )
        }else if(req.data[0] === "教师"){
          router.push(
          {
            path:"/teacherYe",
            query:{
              type:req.data[0],          //类型
              name:req.data[1],          //名字
              id:req.data[2]
            }
          })
        }else{
          router.push(
          {
            path:"/studentYe",
            query:{
              type:req.data[0],          //类型
              name:req.data[1],          //名字
              studentId:req.data[2]
            }
          })
        }
      }
    })
  }
 
</script>
<style>
/* .yii{
  display: flex;
  flex-direction: column;
  background-image: url(../tupian/jujin.jpg);
  width: 400px;
  height: 200px;
  border: 3px solid red;
} */
/* .yi{
  width:100px;
  height: 100px; */
  /* border: 3px solid black; */
  /* background-image: url(../tupian/jujin.jpg);
  display: flex;
  flex-direction: column; */
/* } */

/* .er{
  flex:1
} */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(../tupian/jujin.jpg) no-repeat center/cover;
  position: relative;
}

.login-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(5px);
}

.login-card {
  width: 400px;
  padding: 40px;
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  z-index: 1;
  position: relative;
}

.login-title {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.form-group {
  margin-bottom: 25px;
}

.input-label {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  padding: 8px 0;
  transition: border-color 0.3s;
}

.input-label:hover {
  border-color: #409eff;
}

.form-input {
  flex: 1;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  background: transparent;
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #409eff, #337ecc);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 20px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64,158,255,0.3);
}

.extra-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.extra-links a {
  color: #666;
  transition: color 0.2s;
}

.extra-links a:hover {
  color: #409eff;
}
.selector-title {
  color: #606266;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}

.radio-group {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.radio-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-radio {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #dcdfe6;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  transition: all 0.3s ease;
}

.radio-label {
  color: #606266;
  font-size: 14px;
  transition: color 0.3s ease;
}

input:checked + .custom-radio {
  border-color: #409eff;
  background-color: #ecf5ff;
}

input:checked + .custom-radio::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 50%;
}

input:checked ~ .radio-label {
  color: #409eff;
  font-weight: 500;
}

.radio-item:hover .custom-radio {
  border-color: #a0cfff;
}

.radio-item:hover .radio-label {
  color: #409eff;
}
</style>