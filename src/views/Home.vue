<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/login_1.jpg" alt="" class="round_icon">
        <span>兰州大学科技月竞赛报名管理系统</span>
      </div>
      <el-button type="primary" round @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened :collapse="isCollapse"
            :collapse-transition="false"
            router
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
            <!-- 管理员信息维护 -->
            <el-menu-item :index="'/AdminInformation'" @click="saveNavState('/AdminInformation')">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>管理员信息维护</span>
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
                <span>竞赛浏览</span>
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
                <span>邮件发送</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="'/competitionEmail'" @click="saveNavState('/competitionEmail')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>竞赛报名邮件模板</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 数据统计 -->
          <el-submenu :index="Statistics">
            <template slot="title">
              <i class="el-icon-data-analysis"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item :index="'/Statistics'" @click="saveNavState('/Statistics')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
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
    background-color: #1E90FF;
    display: flex;
    justify-content: space-between;
    padding-left: 66.66px;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 66px;
      }
      img {
        height: 60px;
        width: 66.66px;
      }
    }
  }
  .el-aside {
    background-color: #344058 !important;
    height: 100%;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #f2f2f2;
    color: #666;
    height: 100vh;
    overflow: scroll;
  }
  .home-container {
    height: 100%;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #344058 !important;
    font-size: 10px;
    line-height: 24px;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .round_icon{
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
