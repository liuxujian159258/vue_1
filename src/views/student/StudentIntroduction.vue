<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生用户界面</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛介绍</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="border: none">
          <!-- 竞赛详情 -->
          <el-tab-pane
              style="border: none"
              :label="competition.competitionName"
              :name="competition.competitionName"
              v-for="competition in competitionList"
              :key="competition.competitionId">
            <el-card style="border: none">
              <el-alert
                  center :closable="false" effect="light" type="success">
                <span
                    style="font-size: 30px;">
                  <font color="#5E88FF">
                    信息科技活动月赛事项目介绍</font>
                </span>
              </el-alert>
              <el-card
                  align="center" style="border: none">
                <el-row class="ElRow" :gutter="20">
                  <el-col :span="6" :offset="6">
                    <span
                        v-text="competition.competitionDepartment">
                    </span>
                  </el-col>
                  <el-col
                      :span="4">
                    <span
                        v-if="competition.competitionType === 1">团队竞赛</span>
                    <span
                        v-else>单人竞赛</span>
                  </el-col>
                  <el-col :span="4">
                    <span>参赛人数:&nbsp;&nbsp;</span>
                    <span
                        v-text="competition.competitionPeople"></span>
                  </el-col>
                </el-row>
              </el-card>
              <el-card
                  align="middle" style="border: none">
                <div
                    class="ql-editor" v-html="competition.competitionHtml"></div>
              </el-card>
              <el-card
                  align="center" style="border: none">
                <el-button
                    icon="el-icon-edit"
                    v-if="competition.isDelete === 0"
                    @click="studentCompetitionSignUp(competition.competitionId, competition.competitionName, competition.competitionType)">
                  报名</el-button>
              </el-card>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 竞赛报名弹窗 -->
      <el-dialog
          title="输入报名竞赛所需信息"
          :visible.sync="competitionSignUpDialogVisible"
          width="50%"
          @close="competitionSignUpDialogClose">
        <el-form
            ref="competitionSignUpRef"
            :model="competitionSignUp"
            label-width="110px">
          <el-form-item
              label="竞赛编号" prop="competitionId">
            <el-input
                v-model="competitionSignUp.competitionId" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="竞赛名称" prop="competitionName">
            <el-input
                v-model="competitionSignUp.competitionName" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="竞赛类型" prop="competitionType">
            <el-input
                v-model="competitionSignUp.competitionType" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="团队编号"
              prop="teamId"
              v-if="competitionSignUp.competitionType === 0" v-show="false">
            <el-input v-model="competitionSignUp.teamId"></el-input>
          </el-form-item>
          <el-form-item
              label="团队编号" prop="teamId" v-else v-show="true">
            <el-input
                v-model="competitionSignUp.teamId"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button
        @click="teamSignUpDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="addCompetitionSignUp">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'StudentIntroduction',
  data () {
    return {
      // 竞赛列表
      competitionList: [],
      // 激活标签名
      activeName: '',
      // 竞赛报名对象
      competitionSignUp: {
        competitionId: null,
        competitionName: '',
        competitionType: null,
        teamId: null
      },
      // 竞赛报名弹窗的显示与隐藏
      competitionSignUpDialogVisible: false
    }
  },
  created () {
    this.getCompetitionList()
  },
  methods: {
    // 获取所有的竞赛信息
    async getCompetitionList () {
      const { data: res } = await this.$http.get('student/competitions/all')
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.competitionList = res.data.competitions
      // 标签激活赋值
      this.activeName = this.competitionList[0].competitionName
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 标签页的变化
    handleClick () {},
    // 点击报名竞赛,弹出弹窗
    studentCompetitionSignUp (competitionId, competitionName, competitionType) {
      console.log(competitionId)
      console.log(competitionName)
      console.log(competitionType)
      this.competitionSignUp.competitionId = competitionId
      this.competitionSignUp.competitionName = competitionName
      this.competitionSignUp.competitionType = competitionType
      this.competitionSignUpDialogVisible = true
    },
    // 报名弹窗的关闭
    competitionSignUpDialogClose () {
      this.$refs.competitionSignUpRef.resetFields()
    },
    // 点击报名竞赛
    async addCompetitionSignUp () {
      console.log(this.competitionSignUp)
      const { data: res } = await this.$http.post('student/competitions/signUp', this.qs.stringify(this.competitionSignUp))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      console.log(res)
      this.competitionSignUpDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
