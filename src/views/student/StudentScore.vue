<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
            :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生用户界面</el-breadcrumb-item>
        <el-breadcrumb-item>成绩查看</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick">
          <!-- 单人竞赛 -->
          <el-tab-pane label="单人竞赛" name="first">
          <el-table :data="studentScores" stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                    class="ElRow"
                    v-for="competition in scope.row.competitions"
                    :key="competition.id">
                  <el-col :span="6">
                    <el-tag effect="dark">
                      {{ competition.competitionId }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">
                      {{ competition.competitionName }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">
                      {{ competition.competitionScore }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="warning" effect="dark">操作</el-tag>
                    <el-button
                        size="small"
                        plain
                        type="warning"
                        v-if="scope.row.studentTime === new Date().getFullYear() && competition.competitionScore === 0"
                        @click="cancelCompetition(competition.competitionId, competition.competitionName,scope.row.studentTime)">
                      取消报名</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="学号" prop="studentNumber"></el-table-column>
            <el-table-column label="姓名" prop="studentName"></el-table-column>
            <el-table-column label="学院" prop="studentCollege"></el-table-column>
            <el-table-column label="班级" prop="studentClass"></el-table-column>
            <el-table-column label="参赛时间" prop="studentTime"></el-table-column>
          </el-table>
          </el-tab-pane>
          <!-- 团队竞赛 -->
          <el-tab-pane label="团队竞赛" name="second">
            <el-table :data="teamScores" stripe>
              <!-- 展开列 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-row
                      class="ElRow"
                      v-for="competition in scope.row.competitions"
                      :key="competition.id">
                    <el-col :span="6">
                      <el-tag effect="dark">
                        {{ competition.competitionId }}</el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="danger" effect="dark">
                        {{ competition.competitionName }}</el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="danger" effect="dark">
                        {{ competition.competitionScore }}</el-tag>
                    </el-col>
                    <el-col :span="6">
                      <el-tag type="warning" effect="dark">操作</el-tag>
                      <el-button
                          size="small"
                          plain type="warning"
                          v-if="scope.row.teamTime === new Date().getFullYear() && scope.row.isCaptain === 1 && competition.competitionScore === 0"
                          @click="cancelTeamCompetition(competition.competitionId, competition.competitionName, scope.row.teamTime, scope.row.teamId)">
                        取消报名</el-button>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column label="团队编号" prop="teamId"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"></el-table-column>
              <el-table-column label="团队角色" prop="isCaptain">
                <template slot-scope="scope">
                  <span v-if="scope.row.isCaptain === 0">队员</span>
                  <span v-else>队长</span>
                </template>
              </el-table-column>
              <el-table-column label="团队注册学院" prop="teamCollege"></el-table-column>
              <el-table-column label="竞赛时间" prop="teamTime"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'StudentScore',
  data () {
    return {
      // 单人竞赛成绩对象
      studentScores: [],
      // 团队竞赛成绩对象
      teamScores: [],
      // 标签激活标签
      activeName: 'first',
      // 单人取消竞赛报名对象
      studentCancelCompetition: {
        competitionId: null,
        competitionName: '',
        competitionType: 0,
        competitionTime: null,
        teamId: null
      },
      // 团队取消竞赛报名对象
      teamCancelCompetition: {
        competitionId: null,
        competitionName: '',
        competitionType: 1,
        competitionTime: null,
        teamId: null
      }
    }
  },
  created () {
    this.getStudentScore()
  },
  methods: {
    // 获取单人竞赛成绩
    async getStudentScore () {
      const { data: res } = await this.$http.get('student/scores/studentNumber')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentScores = res.data.students
      this.$message.success(res.meta.msg)
      this.nowYear = new Date().getFullYear()
      console.log(res)
    },
    // 获取团队竞赛成绩
    async getTeamScore () {
      const { data: res } = await this.$http.get('student/teams/scores/studentNumber')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.teamScores = res.data.teams
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 处理标签的切换
    handleClick () {
      switch (this.activeName) {
        case 'first':
          this.getStudentScore()
          break
        case 'second':
          this.getTeamScore()
          break
        default:
          this.getStudentScore()
          break
      }
    },
    // 取消单人竞赛报名
    async cancelCompetition (competitionId, competitionName, studentTime) {
      console.log(competitionId)
      console.log(competitionName)
      console.log(studentTime)
      this.studentCancelCompetition.competitionId = competitionId
      this.studentCancelCompetition.competitionName = competitionName
      this.studentCancelCompetition.competitionTime = studentTime
      const { data: res } = await this.$http.delete('student/competitions/cancel', { params: this.studentCancelCompetition })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getStudentScore()
      console.log(res)
    },
    // 取消多人竞赛报名
    async cancelTeamCompetition (competitionId, competitionName, teamTime, teamId) {
      console.log(competitionId)
      console.log(competitionName)
      console.log(teamTime)
      console.log(teamId)
      this.teamCancelCompetition.competitionId = competitionId
      this.teamCancelCompetition.competitionName = competitionName
      this.teamCancelCompetition.competitionTime = teamTime
      this.teamCancelCompetition.teamId = teamId
      const { data: res } = await this.$http.delete('student/competitions/cancel', { params: this.teamCancelCompetition })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getTeamScore()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
  .ElRow {
    border-top: 1px solid #eeeeee;
  }
  .el-tag {
    margin: 7px;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
