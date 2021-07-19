<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
            :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生用户界面</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛报名</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card align="left">
        <!-- 选择竞赛类型和项目 -->
        <el-row :gutter="20">
          <el-col :span="4">
            <el-cascader
                placeholder="输入或者选择竞赛类型"
                :options="competitionTypeList"
                v-model="competitionTypeSelect" filterable
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false, checkStrictly: true }"
                @change="HandleChangeType" clearable></el-cascader>
          </el-col>
          <el-col :span="6">
            <el-cascader
                placeholder="输入或者选择竞赛项目"
                :options="competitionList"
                v-model="competitionSelect"
                filterable
                :props="{ expandTrigger: 'hover', value: 'competitionId', label: 'competitionName', emitPath: false, checkStrictly: true }"
                @change="HandleChange" clearable></el-cascader>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 竞赛简介 -->
          <el-col :span="8"
                  v-for="competition in competitions"
                  :key="competition.competitionId">
            <el-card
                :body-style="{ padding: '0px' }"
                align="center"
                style="background: #f2f2f2">
              <h4>
                {{ competition.competitionName }}</h4>
              <span
                  v-if="competition.competitionType === 0">
                竞赛类型：单人</span>
              <span v-else>竞赛类型：团队</span>
              <br>
              <span>
                人数限制：{{ competition.competitionPeople }}</span>
              <br>
              <span>
                举办学院：{{ competition.competitionDepartment }}</span>
              <br>
              <span>
                地点：请查看报名邮件</span>
              <br>
              <span>
                竞赛时间：请查看报名邮件</span>
              <br>
              <el-button
                  icon="el-icon-edit"
                  size="medium"
                  @click="CompetitionSignUp(competition.competitionId, competition.competitionName, competition.competitionType, competition.isDelete)">
                报名</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
      <!-- 竞赛报名弹窗 -->
      <el-dialog
          title="输入报名竞赛所需信息"
          :visible.sync="teamSignUpDialogVisible"
          width="50%"
          @close="teamSignUpDialogClose">
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
            <span v-if="competitionSignUp.competitionType === 1">团队竞赛</span>
            <span v-else>单人竞赛</span>
          </el-form-item>
          <el-form-item
              label="团队编号" prop="teamId" v-if="competitionSignUp.competitionType === 0" v-show="false">
            <el-input
                v-model="competitionSignUp.teamId"></el-input>
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
  name: 'StudentSignUp',
  data () {
    return {
      // 竞赛查询对象
      competitionQueryInfo: {
        competitionId: null,
        competitionType: null
      },
      // 竞赛对象
      competitions: [],
      // 竞赛选择列表
      competitionList: [],
      // 竞赛选择
      competitionSelect: null,
      // 竞赛类型列表
      competitionTypeList: [
        { id: 1, name: '单人' },
        { id: 2, name: '团体' }
      ],
      // 竞赛类型选择
      competitionTypeSelect: null,
      // 竞赛报名对象
      competitionSignUp: {
        competitionId: null,
        competitionName: '',
        competitionType: null,
        teamId: null
      },
      // 报名竞赛信息弹窗的显示与隐藏
      teamSignUpDialogVisible: false
    }
  },
  created () {
    this.getCompetitionList()
    this.getCompetitions()
  },
  methods: {
    // 获取竞赛类型
    async getCompetitionList () {
      const { data: res } = await this.$http.get('student/competitions/competitionList')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.competitionList = res.data.competitionList
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取所有满足条件的技术
    async getCompetitions () {
      const { data: res } = await this.$http.get('student/competitions', { params: this.competitionQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.competitions = res.data.competitions
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 竞赛类型选择
    HandleChangeType () {
      if (this.competitionTypeSelect === null) {
        this.competitionQueryInfo.competitionType = null
      } else {
        this.competitionQueryInfo.competitionType = this.competitionTypeSelect - 1
      }
      this.getCompetitions()
      console.log(this.competitionTypeSelect)
      console.log(this.competitionSelect)
      console.log(this.competitionQueryInfo)
    },
    // 竞赛选择
    HandleChange () {
      this.competitionQueryInfo.competitionId = this.competitionSelect
      this.getCompetitions()
      console.log(this.competitionSelect)
      console.log(this.competitionTypeSelect)
      console.log(this.competitionQueryInfo)
    },
    // 竞赛报名
    CompetitionSignUp (competitionId, competitionName, competitionType, isDelete) {
      if (isDelete === 1) {
        return this.$message.error('此竞赛已经被删除')
      }
      console.log(competitionId)
      console.log(competitionName)
      console.log(competitionType)
      this.competitionSignUp.competitionId = competitionId
      this.competitionSignUp.competitionName = competitionName
      this.competitionSignUp.competitionType = competitionType
      this.teamSignUpDialogVisible = true
    },
    // 报名竞赛对象的关闭
    teamSignUpDialogClose () {
      this.$refs.competitionSignUpRef.resetFields()
    },
    // 竞赛报名
    async addCompetitionSignUp () {
      console.log(this.competitionSignUp)
      const { data: res } = await this.$http.post('student/competitions/signUp', this.qs.stringify(this.competitionSignUp))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      console.log(res)
      this.teamSignUpDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-card {
    margin-bottom: 20px;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
