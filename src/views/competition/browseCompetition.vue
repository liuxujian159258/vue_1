<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛浏览</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="border: none">
          <!-- 竞赛详情区域 -->
          <el-tab-pane
              style="border: none"
              :label="competition.competitionName"
              :name="competition.competitionName"
              v-for="competition in competitions"
              :key="competition.competitionId">
            <el-card
                style="border: none">
              <el-alert
                  center
                  :closable="false"
                  effect="light"
                  type="success">
                <span
                    style="font-size: 30px;">
                  <font color="#5E88FF">
                    信息科技活动月赛事项目介绍
                  </font>
                </span>
              </el-alert>
              <el-card
                  align="center" style="border: none">
                <el-row
                    class="ElRow" :gutter="20">
                  <el-col
                      :span="6" :offset="9">
                    <span
                        v-text="competition.competitionDepartment"></span>
                  </el-col>
                </el-row>
                <el-row
                    class="ElRow" :gutter="20">
                  <el-col
                      :span="4" :offset="6">
                    <span
                        v-if="competition.competitionType === 1">
                      团队竞赛</span>
                    <span
                        v-else>单人竞赛</span>
                  </el-col>
                  <el-col
                      :span="4">
                    <span>
                      参赛人数:&nbsp;&nbsp;</span>
                    <span v-text="competition.competitionPeople"></span>
                  </el-col>
                  <el-col :span="4" >
                    <span>
                      是否暂停: </span>
                    <span
                        v-if="competition.isDelete === 0 ">
                      正常举行
                    </span>
                    <span v-else>已暂停</span>
                  </el-col>
                </el-row>
              </el-card>
              <el-card
                  align="middle"
                  style="border: none">
                <div
                    class="ql-editor" v-html="competition.competitionHtml">
                </div>
                <div>
                <el-tooltip
                    effect="dark"
                    content="修改竞赛"
                    placement="top"
                    :enterable="false">
                  <!-- 修改按钮 -->
                  <el-button
                      icon="el-icon-edit"
                      @click="editCompetition(competition.competitionId)">
                  </el-button>
                </el-tooltip>
                <el-tooltip
                    effect="dark"
                    content="暂停竞赛"
                    placement="top"
                    :enterable="false">
                  <!-- 暂停按钮 -->
                  <el-button
                      icon="el-icon-delete"
                      @click="deleteCompetition(competition.competitionId)">
                  </el-button>
                </el-tooltip>
                  <el-tooltip
                      effect="dark"
                      content="恢复竞赛"
                      placement="top"
                      :enterable="false">
                    <!-- 删除按钮 -->
                    <el-button
                        icon="el-icon-circle-check"
                        @click="recoverDeleteCompetition(competition.competitionId)">
                    </el-button>
                  </el-tooltip>
              </div>
              </el-card>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'browseCompetition',
  data () {
    return {
      // 竞赛列表数据
      competitions: [],
      // 激活的tab标签
      activeName: '',
      // 竞赛删除对象
      deleteCompetitionId: {
        competitionId: null
      }
    }
  },
  created () {
    // this.activeNameM()
    this.getCompetitions()
  },
  methods: {
    // 获取所有竞赛信息列表
    async getCompetitions () {
      const { data: res } = await this.$http.get('admin/competitions')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.competitions = res.data.competitions
      // 标签激活赋值
      this.activeName = this.competitions[0].competitionName
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 编辑竞赛
    editCompetition (competitionId) {
      this.$router.push({ path: '/addCompetition', query: { competitionId: competitionId } })
      console.log(competitionId)
    },
    // 暂停竞赛
    async deleteCompetition (competitionId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将暂停该竞赛, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消暂停!')
      }
      this.deleteCompetitionId.competitionId = competitionId
      const { data: res } = await this.$http.delete('admin/competitions', { params: this.deleteCompetitionId })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getCompetitions()
    },
    // 恢复竞赛
    async recoverDeleteCompetition (competitionId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将恢复该竞赛, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消恢复!')
      }
      this.deleteCompetitionId.competitionId = competitionId
      const { data: res } = await this.$http.delete('admin/competitions/recover', { params: this.deleteCompetitionId })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getCompetitions()
    },
    // 点击变化
    handleClick () {}
  }
}
</script>

<style lang="less" scoped>
  .ElRow {
    border-top: 10px solid white;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
