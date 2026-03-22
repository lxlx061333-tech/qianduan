<template>
  <div class = "yi">
    <div class = "title">
      <h2>欢迎你溪溪</h2>
    </div>
    <div class = "dao">
      <div class = "daoyi">
        <RouterLink to="/chengji">学生成绩</RouterLink>
      </div>
      <div class = "daoyi">
        <RouterLink to="xuanke">学生选课</RouterLink>
      </div>
      <div class = "daoyi">
        <RouterLink to="chaxun">学生查询</RouterLink>
      </div>
    </div>
    <div class = "nei">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script setup>
  import {RouterView, RouterLink} from 'vue-router'
</script>
<style>
  .yi{
    position:relative;
    width:600px;
    height: 600px;
    border:3px solid red;
    /* overflow: hidden; */
  }
  .title{
    position: relative;
    flex:2;
    width:600px;
    height: 60px;
    border : 3px solid salmon;
  }
  h2{
    position : absolute;
    left: 0px;
    right: 0px;
    top:0px;
    bottom:0px;
    margin:auto;
    width:150px;
    height: 30px;
    border: 3px solid khaki;
  }
  .dao{
    border:3px solid yellow;
    height:531px;
    width:80px;
    display: flex;
    flex-direction: column;
  }
  .daoyi{
    border:3px solid blue;
    flex:1;
  }
  .nei{
    position:absolute;
    left:80px;
    top:60px;
    width:517px;
    height: 537px;
    border : 3px solid sienna;
  }
</style>