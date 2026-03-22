<template>
  <div class = "yio">
    <div class = "title">
      <div class = "headleft">
        <!-- <img src="../../tupian/jujin.jpg" class="yuan"> -->
        <p>欢迎进入教务系统</p>
      </div>
      <div class="headright">
        <img src="../../tupian/jujin.jpg" class="yuan">
        <p>{{ name }}({{ type }})</p>
      </div>

    </div>
    <div class = "dao">

      <div class = "daoyi">
        <RouterLink to="/guanliyuanYe/adminshou">首页</RouterLink>
      </div>

      <!-- 

              个人信息

       -->
      <div class = "daoyi">
        <RouterLink 
        :to="{
         path : '/guanliyuanYe/adminJian',
         query : ({
          id : adminId
         })
        }"> 个人信息管理</RouterLink>
      </div>

      <!-- 

        管理查询

       -->
      <!-- <div class="zuo">
      <div class="daoyi tan" :class="{ xian }" @click.stop="toggleDropdown">
          <span class="menu-title">管理查询</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian" class="dropdown-menu">
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/student">学生查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/teacher">老师查询</RouterLink>
            </div>
            <div class="daoyi">
              <RouterLink to="/guanliyuanYe/CourseSchedule">课程查询</RouterLink>
            </div>
            <div class="daoyi">
              <RouterLink to="/guanliyuanYe/courseSelection">排课查询</RouterLink>
            </div>
            <div class="daoyi">
              <RouterLink to="/guanliyuanYe/Score">成绩查询</RouterLink>
            </div>
            <div class="daoyi">
              <RouterLink to="/guanliyuanYe/major">专业查询</RouterLink>
            </div>
          </div>
        </transition>
      </div> -->
      <!-- 
                
        学生信息管理

       -->
      <div class="zuo">
      <div class="daoyi tan" :class="{ xian2 }" @click.stop="toggleDropdown2">
          <span class="menu-title">学生信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian2" class="dropdown-menu">
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/student">学生查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/studentAdd">添加学生</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/studentUpdate">修改信息</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/studentDelete">删除信息</RouterLink>
            </div>
          </div>
        </transition>
      </div>
<!-- 

      老师信息管理

 -->
      <div class="zuo">
      <div class="daoyi tan" :class="{ xian3 }" @click.stop="toggleDropdown3">
          <span class="menu-title">教师信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian3" class="dropdown-menu">
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/teacher">查询教师</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/teacherAdd">添加教师</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/teacherUpdate">修改教师</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="/guanliyuanYe/teacherDelete">删除教师</RouterLink>
            </div>
          </div>
        </transition>
      </div>

      <!-- 

      课程信息管理

 -->
    <div class="zuo">
      <div class="daoyi tan" :class="{ xian4 }" @click.stop="toggleDropdown4">
          <span class="menu-title">课程信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian4" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="CourseSchedule">课程查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseScheduleAdd">添加课程</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseScheduleUpdate">修改课程</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseScheduleDelete">删除课程</RouterLink>
            </div>
          </div>
        </transition>
      </div>
      <!-- 
        
        
        排课信息管理 
      
      
      -->
      <div class="zuo">
      <div class="daoyi tan" :class="{ xian5 }" @click.stop="toggleDropdown5">
          <span class="menu-title">排课信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian5" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="courseSelection">排课查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseSelectionAdd">添加排课</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseSelectionUpdate">修改排课</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="courseSelectionDelete">删除排课</RouterLink>
            </div>
          </div>
        </transition>
      </div>

      <!-- 

        成绩管理


       -->
       <div class="zuo">
      <div class="daoyi tan" :class="{ xian6 }" @click.stop="toggleDropdown6">
          <span class="menu-title">成绩信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian6" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="Score">成绩查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="scoreUpdate">修改成绩</RouterLink>
            </div>
          </div>
        </transition>
      </div>
<!-- 


            专业信息管理


 -->
      <div class="zuo">
      <div class="daoyi tan" :class="{ xian7 }" @click.stop="toggleDropdown7">
          <span class="menu-title">专业信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian7" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="major">专业查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="majorAdd">添加专业</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="majorUpdate">修改专业</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="majorDelete">删除专业</RouterLink>
            </div>
          </div>
        </transition>
      </div>
      <!-- 


            院系信息管理


 -->
 <div class="zuo">
      <div class="daoyi tan" :class="{ xian8 }" @click.stop="toggleDropdown8">
          <span class="menu-title">院系信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian8" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="department">院系查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="departmentAdd">添加院系</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="departmentUpdate">修改院系</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="departmentDelete">删除院系</RouterLink>
            </div>
          </div>
        </transition>
      </div>

      <div class="zuo">
      <div class="daoyi tan" :class="{ xian9 }" @click.stop="toggleDropdown9">
          <span class="menu-title">教室信息管理</span>
      </div>
        <transition name="slide-fade">
          <div v-show="xian9" class="dropdown-menu">
            <div class="daoyi">
              <RouterLink to="room">教室查询</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="roomAdd">添加教室</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="roomUpdate">修改教室</RouterLink>
            </div>
            <div class = "daoyi">
              <RouterLink to="roomDelete">删除教室</RouterLink>
            </div>
          </div>
        </transition>
      </div>

    </div>
    <div class = "nei">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
  import {RouterView, RouterLink, useRoute} from 'vue-router'
  import {ref} from 'vue'
  const useroute = useRoute();
  const name = ref(useroute.query.name);
  const type = ref(useroute.query.type);
  const adminId = useroute.query.id
  const xian = ref(false)
  const xian2 = ref(false)
  const xian3 = ref(false)
  const xian4 = ref(false)
  const xian5 = ref(false)
  const xian6 = ref(false)
  const xian7 = ref(false)
  const xian8 = ref(false)
  const xian9 = ref(false)

const toggleDropdown = () => {
  xian.value = !xian.value
}

const toggleDropdown2 = () => {
  xian2.value = !xian2.value
}

const toggleDropdown3 = () => {
  xian3.value = !xian3.value
}

const toggleDropdown4 = () => {
  xian4.value = !xian4.value
}

const toggleDropdown5 = () => {
  xian5.value = !xian5.value
}

const toggleDropdown6 = () => {
  xian6.value = !xian6.value
}

const toggleDropdown7 = () => {
  xian7.value = !xian7.value
}

const toggleDropdown8 = () => {
  xian8.value = !xian8.value
}
const toggleDropdown9 = () => {
  xian9.value = !xian9.value
}

</script>
<style scoped>
.left{
  float: left;
}
.you{
  float: right;
}
  body{
  padding: auto;
  display: flex;
  align-items: center;
  justify-content: center;
 }
  .yio{
    position: relative;
    /* width:1200px; */
    height: 700px;
    /* border:3px solid red; */
    /* overflow: hidden; */
  overflow: hidden;

  }
  
  .headleft{
    width: 300px;
    height: 80px;
    float: left;
  }
  .headright{
    width: 300px;
    height: 80px;
    float: right;
  }
  .title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  height: 80px;
  padding: 0 30px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.yuan {
  width: 50px;
  height: 50px;
  border: 2px solid #fde68a;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  object-fit: cover;
}

.yuan:hover {
  transform: scale(1.05);
}

.title p {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 10px;
  transition: opacity 0.3s ease;
}

.headleft, .headright {
  display: flex;
  align-items: center;
  gap: 20px;
}

.headleft {
  flex-direction: row-reverse;
}

.headright {
  flex-direction: row;
}
  /* .dao{
    border:3px solid yellow;
    height:531px;
    width:80px;
    display: flex;
    flex-direction: column;
  }
  .daoyi{
    border:3px solid blue;
    flex:1;
  }*/
  .nei{
    float:left;
    width:1017px;
    height: 630px;
    /* border:3px solid sienna; */
  } 
  /* .da{
    border: 3px solid green;
    width: 100%;
    height: 100%;
    padding:auto;
  } */
.dao {
  display: flex;
  flex-direction: column;
  float:left;
  height:590px;
  /* width:130px; */
  /* justify-content: center; 水平居中 */
  gap: 2rem; /* 项间距 */
  padding: 1.5rem;
  background: #f8f9fa; /* 浅灰背景 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 柔和阴影 */
  margin: 0px auto;
  max-width: 1200px; /* 限制最大宽度 */
  align-items: flex-start;
  justify-content: flex-start;
  overflow: auto;
}
.jian{
  gap: 1rem;
 }

.daoyi {
  position: relative;
  /* padding: 0.8rem 1.2rem; */
  transition: transform 0.3s ease;
}
.daoyi:hover {
  transform: translateY(-2px); /* 悬停上浮效果 */
}

.daoyi a {
  color: #2d3436; /* 深灰色文字 */
  text-decoration: none;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.3rem 0; 
  position: relative;
  transition: color 0.3s ease;
  /* background-color: #3b82f6; */
  text-align: left; /* 文本强制左对齐 */
  margin-left: 20px; /* 增加左侧留白 */
  width: 100%; /* 撑满容器宽度 */
}

.daoyi span {
  color: #2d3436; /* 深灰色文字 */
  text-decoration: none;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease;
  text-align: left; /* 文本强制左对齐 */
  width: 100%; 
}
.dao >.zuo > .daoyi span {
  margin-left: 0 ;
  padding-left: 0 ;
  display: block;
  width: 100%;
}
.zuo{
  margin-left: 20px;
}
.xuanfu{
  transform: translateY(-2px); 
}

/* 下划线动画 */
.daoyi a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background: #6c5ce7; /* 紫色 */
  transition: all 0.3s ease;
}
.daoyi span::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background: #6c5ce7; /* 紫色 */
  transition: all 0.3s ease;
}

.daoyi a:hover::after {
  width: 100%;
  left: 0;
}

.daoyi a:hover {
  color: #6c5ce7; /* 悬停紫色 */
}

.daoyi span:hover::after {
  width: 100%;
  left: 0;
}

.daoyi span:hover {
  color: #6c5ce7; /* 悬停紫色 */
}


/* 当前激活菜单样式 */
.daoyi a.router-link-active {
  color: #6c5ce7;
  font-weight: 600;
}

.daoyi a.router-link-active::after {
  width: 100%;
  left: 0;
}

.dropdown-trigger {
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bei{
  background-color: seagreen;
}

.trigger-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.1);
}

.menu-icon {
  font-size: 1.1em;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(90deg);
  opacity: 0.7;
}

.arrow.rotate {
  transform: rotate(270deg);
}

.dropdown-menu {
  margin-top: 20px;
  /* padding-left: 20px; */
  display: flex;
  flex-direction: column;
  gap: 2rem; /* 项间距 */
  max-width: 1200px; /* 限制最大宽度 */
  align-items: flex-start;
  /* background-color: salmon; */
  justify-content: flex-start;
}
.sub-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  color: #4a5568;
  font-size: 0.95em;
  text-decoration: none;
  transition: all 0.25s ease;
}

.sub-link:hover {
  background: #f8fafc;
  transform: translateX(4px);
  color: #3b82f6;
}

.link-icon {
  font-size: 1.2em;
  opacity: 0.8;
}

/* 优化过渡动画 */
.slide-fade-enter-active {
  transition: 
    opacity 0.2s ease-out,
    transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.2);
}

.slide-fade-leave-active {
  transition: 
    opacity 0.15s ease-in,
    transform 0.15s cubic-bezier(0.6, -0.3, 0.735, 0.045);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.menu-title {
  padding-right: 24px; /* 给箭头留出空间 */
  background-image: url('../../tupian/jiantou.png');
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 16px;
  transition: background-image 0.3s ease;
}

.xian .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}
.xian2 .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}

.xian3 .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}
.xian4 .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}
.xian5 .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}

.xian6 .menu-title {
  background-image: url('../../tupian/jiantou-up.png');
}
</style>