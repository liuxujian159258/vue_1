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
                 :default-active="activePath" class="el-menu-vertical-demo">
          <!-- 完善信息 -->
          <el-menu-item :index="StudentInformation" @click="saveNavState('/StudentInformation')">
              <i class="el-icon-message"></i>
              <span slot="title">完善信息</span>
          </el-menu-item>
          <!-- 竞赛报名 -->
          <el-menu-item :index="StudentSignUp" @click="saveNavState('/StudentSignUp')">
              <i class="el-icon-trophy-1"></i>
              <span slot="title">竞赛报名</span>
          </el-menu-item>
          <!-- 查看成绩 -->
          <el-menu-item :index="StudentScore" @click="saveNavState('/StudentScore')">
              <i class="el-icon-medal"></i>
              <span slot="title">查看成绩</span>
          </el-menu-item>
          <!-- 竞赛介绍 -->
          <el-menu-item :index="StudentIntroduction" @click="saveNavState('/StudentIntroduction')">
              <i class="el-icon-reading"></i>
              <span slot="title">竞赛介绍</span>
          </el-menu-item>
          <!-- 团队管理 -->
          <el-menu-item :index="StudentTeam" @click="saveNavState('/StudentTeam')">
              <i class="el-icon-s-management"></i>
              <span slot="title">团队管理</span>
          </el-menu-item>
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
  name: 'StudentHome',
  data: function () {
    return {
      // 是否折叠
      isCollapse: false,
      // 激活的路径
      activePath: '',
      StudentInformation: 'StudentInformation',
      StudentSignUp: 'StudentSignUp',
      StudentScore: 'StudentScore',
      StudentIntroduction: 'StudentIntroduction',
      StudentTeam: 'StudentTeam'
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

<style scoped lang="less">
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
