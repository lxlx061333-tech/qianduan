<template>
  <div class="dashboard-container">
    <!-- 顶部导航栏
    <header class="dashboard-header">
      <div class="header-brand">
        <img src="../../tupian/logo.png" class="system-logo">
        <h1>智慧教务管理系统</h1>
      </div>
      <div class="user-profile">
        <el-avatar :size="48" :src="userAvatar" />
        <div class="profile-info">
          <p class="username">{{ name }}</p>
          <p class="user-role">{{ type }}</p>
        </div>
      </div>
    </header> -->

    <!-- 功能展示区 -->
    <main class="function-grid">
      <!-- 学生管理 -->
      <div class="function-card student-card">
        <div class="card-header">
          <i class="el-icon-user-solid card-icon"></i>
          <h3>学生管理</h3>
        </div>
        <div class="card-body">
          <p class="func-desc">实现学生信息的查询操作</p>
          <div class="action-buttons">
            <el-button type="primary" @click="navigateTo('/teacherYe/teacherstudent')">信息查询</el-button>
          </div>
        </div>
      </div>

      <!-- 成绩管理 -->
      <div class="function-card score-card">
        <div class="card-header">
          <i class="el-icon-data-analysis card-icon"></i>
          <h3>成绩管理</h3>
        </div>
        <div class="card-body">
          <p class="func-desc">支持成绩查询、和成绩修正</p>
          <div class="action-buttons">
            <el-button type="primary" @click="navigateTo('/teacherYe/teacherscore')">成绩查询</el-button>
            <el-button type="danger" @click="navigateTo('/teacherYe/teacherscoreUpdate')">成绩修正</el-button>
          </div>
        </div>
      </div>


      <!-- 课程管理 -->
      <div class="function-card course-card">
        <div class="card-header">
          <i class="el-icon-notebook-2 card-icon"></i>
          <h3>课程管理</h3>
        </div>
        <div class="card-body">
          <p class="func-desc">查看我所授的课程</p>
          <div class="action-buttons">
            <el-button type="primary" @click="navigateTo('/teacherYe/teachercourseSchedule')">课程查询</el-button>
          </div>
        </div>
      </div>

      <!-- 排课管理 -->
      <div class="function-card schedule-card wai">
        <div class="card-header">
          <i class="el-icon-s-order card-icon"></i>
          <h3>排课管理</h3>
        </div>
        <div class="card-body">
          <p class="func-desc">智能排课与课表调整</p>
          <div class="action-buttons">
            <el-button type="primary" @click="navigateTo('/teacherYe/teachercourseSelection')">课表查询</el-button>
            <el-button type="success" @click="navigateTo('/teacherYe/teachercourseSelectionAdd')">新增排课</el-button>
            <el-button type="info" @click="navigateTo('/teacherYe/teachercourseSelectionUpdate')">调整排课</el-button>
            <el-button type="info" @click="navigateTo('/teacherYe/teachercourseSelectionDelete')">删除排课</el-button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.dashboard-container {
  widows: 100%;
  height: 100%;
  background: #f5f7fa;
  overflow: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 20px;
}

.system-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}

.dashboard-header h1 {
  color: white;
  margin: 0;
  font-size: 24px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-info {
  color: white;
}

.username {
  font-weight: 500;
  margin: 0;
}

.user-role {
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.function-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.function-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(59,130,246,0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.card-icon {
  font-size: 32px;
  padding: 10px;
  border-radius: 8px;
  color: white;
}

.student-card .card-icon { background: #3b82f6; }
.score-card .card-icon { background: #f59e0b; }
.teacher-card .card-icon { background: #10b981; }
.course-card .card-icon { background: #8b5cf6; }
.schedule-card .card-icon { background: #ef4444; }
.system-card .card-icon { background: #64748b; }

h3 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}

.func-desc {
  color: #64748b;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 15px 0;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
}

.wai{
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 15px;
  }
  
  .function-grid {
    padding: 15px;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>