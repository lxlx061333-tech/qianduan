import { createRouter, createWebHistory } from "vue-router";
import chengji from '../luyou/chengji.vue';
import kong from '../luyou/kong.vue';
import chaxun from '../luyou/chaxun.vue';
import denno from '../luyou/start/denno.vue';
import denlu from '../luyou/start/denlu.vue';
import chano from '../luyou/xianshi/chano.vue';

//                user 用户 
import guanliyuanYe from '../luyou/start/guanliyuanYe.vue';
import teacherYe from '../luyou/start/teacherYe.vue'
import studentYe from '../luyou/start/studentYe.vue'

//                admin
import adminJian from '../luyou/jianJie/adminJian.vue'
import adminJianYe from '../luyou/jianJieYe/adminJianYe.vue'
import adminshou from '../luyou/shou/adminshou.vue'

//                room   教室
import room from '../luyou/xianshi/room.vue'
import roomAdd from '../luyou/room/roomAdd.vue'
import roomUpdate from '../luyou/room/roomUpdate.vue'
import roomUpdateYe from '../luyou/roomYe/roomUpdateYe.vue'
import roomDelete from '../luyou/room/roomDelete.vue'

//                Department   院系
import department from '../luyou/xianshi/department.vue'
import departmentAdd from '../luyou/department/departmentAdd.vue'
import departmentUpdate from '../luyou/department/departmentUpdate.vue'
import departmentUpdateYe from '../luyou/departmentYe/departmentUpdateYe.vue'
import departmentDelete from '../luyou/department/departmentDelete.vue'

//                major
import major from '../luyou/xianshi/major.vue'
import majorAdd from '../luyou/major/majorAdd.vue'
import majorUpdate from '../luyou/major/majorUpdate.vue'
import majorUpdateYe from '../luyou/majorYe/majorUpdateYe.vue'
import majorDelete from '../luyou/major/majorDelete.vue'

//                 student
import student from '../luyou/xianshi/student.vue';
import studentAdd from '../luyou/student/studentAdd.vue'
import studentUpdate from '../luyou/student/studentUpdate.vue'
import studentUpdateYe from '../luyou/studentYe/studentUpdateYe.vue'
import studentDelete from '../luyou/student/studentDelete.vue'
import studentshou from '../luyou/shou/studentshou.vue'
import studentJian from '../luyou/jianJie/studentJian.vue'
import studentJianYe from '../luyou/jianJieYe/studentJianYe.vue'
//                 teacher student
import teacherstudent from '../luyou/teacherstudent/student.vue';

//                  teacher
import teacher from '../luyou/xianshi/teacher.vue';
import teacherAdd from '../luyou/teacher/teacherAdd.vue'
import teacherUpdate from '../luyou/teacher/teacherUpdate.vue'
import teacherUpdateYe from '../luyou/teacherYe/teacherUpdateYe.vue'
import teacherDelete from '../luyou/teacher/teacherDelete.vue'
import teachercourseSchedule from '../luyou/teachercourseSchedule/teachercourseSchedule.vue'
import teachershou from '../luyou/shou/teachershou.vue'
import teacherJian from '../luyou/jianJie/teacherJian.vue'
import teacherJianYe from '../luyou/jianJieYe/teacherJianYe.vue'
//                  score
import score from '../luyou/xianshi/score.vue'
import scoreUpdate from '../luyou/score/scoreUpdate.vue'
import scoreUpdateYe from '../luyou/scoreYe/scoreUpdateYe.vue'
//                  teacher score
import teacherscore from '../luyou/teacherscore/score.vue'
import teacherscoreUpdate from '../luyou/teacherscore/scoreUpdate.vue'
import teacherscoreUpdateYe from '../luyou/teacherscoreYe/scoreUpdateYe.vue'
//                  student score
import studentscore from '../luyou/studentScore/score.vue'



//                  courseSchedule
import CourseSchedule from '../luyou/xianshi/CourseSchedule.vue';
import courseScheduleAdd from '../luyou/courseSchedule/courseScheduleAdd.vue'
import courseScheduleUpdate from '../luyou/courseSchedule/courseScheduleUpdate.vue'
import courseScheduleUpdateYe from '../luyou/courseScheduleYe/courseScheduleUpdateYe.vue'
import courseScheduleDelete from '../luyou/courseSchedule/courseScheduleDelete.vue'

//                  courseSelection
import courseSelection from '../luyou/xianshi/courseSelection.vue'
import courseSelectionAdd from '../luyou/courseSelection/courseSelectionAdd.vue'
import courseSelectionAddYe from '../luyou/courseSelectionYe/courseSelectionAddYe.vue'
import courseSelectionUpdate from '../luyou/courseSelection/courseSelectionUpdate.vue'
import courseSelectionUpdateYe from '../luyou/courseSelectionYe/courseSelectionUpdateYe.vue'
import courseSelectionDelete from '../luyou/courseSelection/courseSelectionDelete.vue'
//                teachercourseSelection
import teachercourseSelection from '../luyou/teachercourseSelection/courseSelection.vue'
import teachercourseSelectionAdd from '../luyou/teachercourseSelection/courseSelectionAdd.vue'
import teachercourseSelectionAddYe from '../luyou/teachercourseSelectionYe/courseSelectionAddYe.vue'
import teachercourseSelectionUpdate from '../luyou/teachercourseSelection/courseSelectionUpdate.vue'
import teachercourseSelectionUpdateYe from '../luyou/teachercourseSelectionYe/courseSelectionUpdateYe.vue'
import teachercourseSelectionDelete from '../luyou/teachercourseSelection/courseSelectionDelete.vue'
//                studentstudentcourseSelection
import studentcourseSelectionAdd from '../luyou/studentcourseSelection/studentcourseSelectionAdd.vue'
import studentcourseSelectionDelete from '../luyou/studentcourseSelection/studentcourseSelectionDelete.vue'
import { formContextKey } from "element-plus";

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path: '/guanliyuanYe',
      component: guanliyuanYe,
      children:[
        {
          name:'chengji',
          path:'chengji',
          component: chengji
        },
        {
          path:'chaxun',
          component: chaxun
        },
        {
          path:'student',
          component: student
        },
        {
          path:'teacher',
          component:teacher
        },
        {
          path:'CourseSchedule',
          component:CourseSchedule
        },
        {
          path:'chano',
          component:chano
        },
        {
          path:'studentAdd',
          component:studentAdd
        },
        {
          path:'teacherAdd',
          component:teacherAdd
        },
        {
          path:'courseScheduleAdd',
          component:courseScheduleAdd
        },
        {
          path:'score',
          component:score
        },
        {
          path:'courseSelection',
          component:courseSelection
        },
        {
          path:'courseSelectionAdd',
          component:courseSelectionAdd
        },
        {
          path:'courseSelectionAddYe',
          component:courseSelectionAddYe
        },
        {
          path:'courseSelectionUpdate',
          component:courseSelectionUpdate
        },
        {
          path:'courseSelectionUpdateYe',
          component:courseSelectionUpdateYe
        },
        {
          path:'courseSelectionDelete',
          component:courseSelectionDelete
        },
        {
          path:'courseScheduleUpdate',
          component:courseScheduleUpdate
        },
        {
          path:'courseScheduleUpdateYe',
          component:courseScheduleUpdateYe
        },
        {
          path:'courseScheduleDelete',
          component:courseScheduleDelete
        },
        {
          path:'scoreUpdate',
          component:scoreUpdate
        },
        {
          path:'scoreUpdateYe',
          component:scoreUpdateYe
        },
        {
          path:'teacherUpdate',
          component:teacherUpdate
        },
        {
          path:'teacherUpdateYe',
          component:teacherUpdateYe
        },
        {
          path:'kong',
          component:kong
        },
        {
          path:'teacherDelete',
          component:teacherDelete
        },
        {
          path:'studentUpdate',
          component:studentUpdate
        },
        {
          path:'studentUpdateYe',
          component:studentUpdateYe
        },
        {
          path:'studentDelete',
          component:studentDelete
        },
        {
          path:'major',
          component:major
        },
        {
          path:'majorAdd',
          component:majorAdd
        },
        {
          path:'majorUpdate',
          component:majorUpdate
        },
        {
          path:'majorUpdateYe',
          component:majorUpdateYe
        },
        {
          path:'majorDelete',
          component:majorDelete
        },
        {
          path:'department',
          component:department
        },
        {
          path:'departmentAdd',
          component:departmentAdd
        },
        {
          path:'departmentUpdate',
          component:departmentUpdate
        },
        {
          path:'departmentUpdateYe',
          component:departmentUpdateYe
        },
        {
          path:'departmentDelete',
          component:departmentDelete
        },
        {
          path:'room',
          component:room
        },
        {
          path:'roomAdd',
          component:roomAdd
        },
        {
          path:'roomUpdate',
          component:roomUpdate
        },
        {
          path:'roomUpdateYe',
          component:roomUpdateYe
        },
        {
          path:'roomDelete',
          component:roomDelete
        },
        {
          path:'adminJian',
          component:adminJian
        },
        {
          path:'adminJianYe',
          component:adminJianYe
        },
        {
          path:'adminshou',
          component:adminshou
        },
        {
          path:'',
          redirect:'guanliyuanYe/adminshou'
        }
      ]
    },
    {
      path: '/teacherYe',
      component: teacherYe,
      children:[
        {
          path:'teachercourseSchedule',
          component:teachercourseSchedule
        },
        {
          path:'teachershou',
          component:teachershou
        },
        {
          path:'teacherJian',
          component:teacherJian
        },
        {
          path:'courseSelection',
          component:courseSelection
        },
        // {
        //   path:'courseSelectionAdd',
        //   component:courseSelectionAdd
        // },
        // {
        //   path:'courseSelectionAddYe',
        //   component:courseSelectionAddYe
        // },
        // {
        //   path:'courseSelectionUpdate',
        //   component:courseSelectionUpdate
        // },
        // {
        //   path:'courseSelectionUpdateYe',
        //   component:courseSelectionUpdateYe
        // },
        // {
        //   path:'courseSelectionDelete',
        //   component:courseSelectionDelete
        // },
        {
          path:'kong',
          component:kong
        },
        {
          path:'scoreUpdate',
          component:scoreUpdate
        },
        {
          path:'scoreUpdateYe',
          component:scoreUpdateYe
        },
        {
          path:'chano',
          component:chano
        },
        {
          path:'teachercourseSelectionAdd',
          component:teachercourseSelectionAdd
        },
        {
          path:'teachercourseSelectionAddYe',
          component:teachercourseSelectionAddYe
        },
        {
          path:'teachercourseSelectionUpdate',
          component:teachercourseSelectionUpdate
        },
        {
          path:'teachercourseSelectionUpdateYe',
          component:teachercourseSelectionUpdateYe
        },
        {
          path:'teachercourseSelectionDelete',
          component:teachercourseSelectionDelete
        },
        {
          path:'teachercourseSelection',
          component:teachercourseSelection
        },
        {
          path:'teacherscore',
          component:teacherscore
        },
        {
          path:'teacherscoreUpdate',
          component:teacherscoreUpdate
        },
        {
          path:'teacherscoreUpdateYe',
          component:teacherscoreUpdateYe
        },
        {
          path:'teacherstudent',
          component:teacherstudent
        },
        {
          path:'teacherJianYe',
          component:teacherJianYe
        },
        {
          path:'',
          redirect:'/teacherYe/teachershou'
        }
      ]
    },
    {
      path:'/studentYe',
      component:studentYe,
      children:[
        {
          path:'studentcourseSelectionAdd',
          component:studentcourseSelectionAdd
        },
        {
          path:'kong',
          component:kong
        },
        {
          path:'chano',
          component:chano
        },
        {
          path:'studentcourseSelectionDelete',
          component:studentcourseSelectionDelete
        },
        {
          path:'studentscore',
          component:studentscore
        },
        {
          path:'studentshou',
          component:studentshou
        },
        {
          path:'',
          redirect:'/studentYe/studentshou'
        },
        {
          path:'studentJian',
          component:studentJian
        },
        {
          path:'studentJianYe',
          component:studentJianYe
        }
      ]
    },
    {
      path: '/denno',  
      component: denno
    },
    {
      path: '/denlu',
      component: denlu
    },
    {
      path: '/',
      redirect:'/denlu'
    }
  ]
})

// 路由守卫逻辑
router.beforeEach((to, from, next) => {
  // 获取登录状态和用户类型
  const isLoggedIn = sessionStorage.getItem('denLu');
  const userRole = sessionStorage.getItem('lei'); // 假设存储值为 'student', 'teacher', 'admin'

  console.log("sadfasdf",isLoggedIn,"sdsfad",userRole)
  if(isLoggedIn == null && userRole == null){
    next()
  }

  // 定义路径权限规则
  const rolePermissions = {
    '/studentYe': ['student'],
    '/teacherYe': ['teacher'],
    '/guanliyuanYe': ['admin']
  };

  // 判断是否需要权限验证
  const requiresAuth = Object.keys(rolePermissions).some(path => 
    to.path.startsWith(path)
  );

  console.log("是否登录",isLoggedIn)
  console.log("是否需要权限",requiresAuth)

  // 已登录时禁止访问登录页
  if (to.path === '/denlu' && isLoggedIn) {
    console.log("nnnnnn",from.path)
    next({ path: from.path, query: { redirect: to.fullPath } });
    return;
  }

  // 访问受保护路径时的处理
  if (requiresAuth) {
    if (!isLoggedIn) {
      next({ path: '/denlu' });
    } else {
      console.log("我劲来了")
      // 获取当前路径对应的允许角色
      const allowedRoles = Object.entries(rolePermissions).find(([path]) => 
        to.path.startsWith(path)
      )?.[1] || [];
      console.log("撒发射点发生",allowedRoles)
      console.log("user",userRole)
      console.log("asdkds",!allowedRoles.includes(userRole))
      console.log("asdfasdfsadf",from.path)
      // 角色校验失败处理
      if (!allowedRoles.includes(userRole)) {
        next(from.path || '/'); // 跳转到无权限页面
        return;
      }else{
        next();
      }
    }
  }

})
export default router