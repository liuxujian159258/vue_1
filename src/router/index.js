import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login'
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../views/Login')
// import Home from '../components/Home'
const Home = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../views/Home')
// import Welcome from '../components/Welcome'
const Welcome = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../views/Welcome')

// import StudentInformation from '../components/student/StudentInformation'
const StudentInformation = () => import(/* webpackChunkName: "Student_StudentInformation" */ '../views/student/StudentInformation')
// import StudentSignUp from '../components/student/StudentSignUp'
const StudentSignUp = () => import(/* webpackChunkName: "Student_StudentSignUp" */ '../views/student/StudentSignUp')
// import StudentScore from '../components/student/StudentScore'
const StudentScore = () => import(/* webpackChunkName: "Student_StudentScore" */ '../views/student/StudentScore')
// import StudentIntroduction from '../components/student/StudentIntroduction'
const StudentIntroduction = () => import(/* webpackChunkName: "Student_StudentIntroduction" */ '../views/student/StudentIntroduction')
// import StudentHome from '../components/StudentHome'
const StudentHome = () => import(/* webpackChunkName: "Student_StudentHome" */ '../views/StudentHome')
// import StudentWelcome from '../components/StudentWelcome'
const StudentWelcome = () => import(/* webpackChunkName: "Student_StudentWelcome" */ '../views/StudentWelcome')

// import addCompetition from '../components/competition/addCompetition'
const addCompetition = () => import(/* webpackChunkName: "competition" */ '../views/competition/addCompetition')
// import browseCompetition from '../components/competition/browseCompetition'
const browseCompetition = () => import(/* webpackChunkName: "competition" */ '../views/competition/browseCompetition')

// import addScore from '../components/score/addScore'
const addScore = () => import(/* webpackChunkName: "score" */ '../views/score/addScore')

// import sendEmail from '../components/email/sendEmail'
const sendEmail = () => import(/* webpackChunkName: "email" */ '../views/email/sendEmail')
// import competitionEmail from '../components/email/competitionEmail'
const competitionEmail = () => import(/* webpackChunkName: "email" */ '../views/email/competitionEmail')

// import MyUsers from '../components/user/MyUsers'
const MyUsers = () => import(/* webpackChunkName: "MyUsers" */ '../views/user/MyUsers')
// import AdminInformation from '../components/user/AdminInformation'
const AdminInformation = () => import(/* webpackChunkName: "MyUsers" */ '../views/user/AdminInformation')

// import TeamManagement from '../components/team/TeamManagement'
const TeamManagement = () => import(/* webpackChunkName: "TeamManagement" */ '../views/team/StudentTeam')

// import Statistics from '../components/statistics/Statistics'
const Statistics = () => import(/* webpackChunkName: "Statistics" */ '../views/statistics/Statistics')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/MyUsers', component: MyUsers },
      { path: '/AdminInformation', component: AdminInformation },
      { path: '/addCompetition', component: addCompetition },
      { path: '/browseCompetition', component: browseCompetition },
      { path: '/addScore', component: addScore },
      { path: '/sendEmail', component: sendEmail },
      { path: '/competitionEmail', component: competitionEmail },
      { path: '/Statistics', component: Statistics }
    ]
  },
  {
    path: '/StudentHome',
    redirect: '/student/welcome',
    component: StudentHome,
    children: [
      { path: '/student/welcome', component: StudentWelcome },
      { path: '/student/StudentInformation', component: StudentInformation },
      { path: '/student/StudentSignUp', component: StudentSignUp },
      { path: '/student/StudentScore', component: StudentScore },
      { path: '/student/StudentIntroduction', component: StudentIntroduction },
      { path: '/student/StudentTeam', component: TeamManagement },
      { path: '/student/MyUsers', component: MyUsers },
      { path: '/student/addCompetition', component: addCompetition },
      { path: '/student/browseCompetition', component: browseCompetition },
      { path: '/student/addScore', component: addScore },
      { path: '/student/sendEmail', component: sendEmail }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从那个路径跳转而来
  // next 函数 表示放行
  // next（）放行 next（‘/login’）强制跳转
  if (to.path === '/login' || to.path === '/StudentHome') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
