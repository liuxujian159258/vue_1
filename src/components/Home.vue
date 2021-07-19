<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/login_1.jpg" alt="">
        <span>兰大信息院报名后台管理系统</span>
      </div>
      <el-button type="info" round @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF"
        unique-opened :collapse="isCollapse" :collapse-transition="false" router
        :default-active="activePath">
          <!-- 用户管理 -->
          <el-submenu :index="MyUsers">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item :index="'/MyUsers'" @click="saveNavState('/MyUsers')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 竞赛管理 -->
          <el-submenu :index="competition">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>竞赛管理</span>
            </template>
            <el-menu-item :index="'/browseCompetition'" @click="saveNavState('/browseCompetition')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>浏览竞赛</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/addCompetition'" @click="saveNavState('/addCompetition')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>竞赛添加</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 成绩管理 -->
          <el-submenu :index="addScore">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>成绩管理</span>
            </template>
            <el-menu-item :index="'/addScore'" @click="saveNavState('/addScore')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>成绩添加</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 邮件管理 -->
          <el-submenu :index="sendEmail">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>邮件通知</span>
            </template>
            <el-menu-item :index="'/sendEmail'" @click="saveNavState('/sendEmail')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>发送邮件</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu :index="Statistics">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item :index="'/Statistics'" @click="saveNavState('/Statistics')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 学生功能 -->
          <el-submenu :index="student">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>学生登陆报名界面</span>
            </template>
            <el-menu-item :index="'/StudentInformation'" @click="saveNavState('/StudentInformation')">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>完善信息</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/StudentSignUp'" @click="saveNavState('/StudentSignUp')">
              <template slot="title">
                <i class="el-icon-trophy-1"></i>
                <span>竞赛报名</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/StudentScore'" @click="saveNavState('/StudentScore')">
              <template slot="title">
                <i class="el-icon-medal"></i>
                <span>查看成绩</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/StudentIntroduction'" @click="saveNavState('/StudentIntroduction')">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>竞赛介绍</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/StudentTeam'" @click="saveNavState('/StudentTeam')">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>团队管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      // 左侧菜单数据
      menulist: [],
      iocnsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-lock',
        101: 'el-icon-trophy',
        102: 'el-icon-tickets',
        145: 'el-icon-data-analysis'
      },
      // 是否折叠
      isCollapse: false,
      // 激活的路径
      activePath: '',
      // 提交竞赛变量
      competition: 'addCompetition',
      // 学生功能
      student: 'student',
      // 发布成绩
      addScore: 'addScore',
      // 邮件发送
      sendEmail: 'sendEmail',
      // 用户管理
      MyUsers: 'MyUsers',
      Statistics: 'statistics'
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
  background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
      img {
        height: 90px;
        width: 100px;
      }
    }
}
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #EAEDF1;
  }
  .home-container {
    height: 100%;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
