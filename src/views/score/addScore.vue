<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        <el-breadcrumb-item>成绩添加</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs v-model="activeName">

          <!-- 用户个人成绩 -->
          <el-tab-pane label="个人成绩" name="first">
            <!-- 搜索学生或者学号 -->
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                    placeholder="请输入学号或者姓名"
                    clearable
                    v-model="studentScoresQueryInfo.studentNumberOrName"
                    @clear="getStudentScores">
                  <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getStudentScores"></el-button>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-cascader
                    placeholder="输入或者选择竞赛项目"
                    :options="studentCompetitionList"
                    v-model="studentCompetitionSelect"
                    filterable
                    :props="{ expandTrigger: 'hover', value: 'competitionId', label: 'competitionName', emitPath: false, checkStrictly: true }"
                    @change="studentCompetitionHandleChange"
                    clearable>
                </el-cascader>
              </el-col>
              <el-col :span="5">
                <el-cascader
                    placeholder="输入或者选择竞赛时间"
                    :options="studentTimeList"
                    v-model="studentTimeSelect"
                    filterable
                    :props="{ expandTrigger: 'hover',value: 'timeId', label: 'competitionTime', emitPath: false, checkStrictly: true }"
                    @change="studentTimeHandleChange"
                    clearable>
                </el-cascader>
              </el-col>
            </el-row>
            <!-- 学生竞赛详细信息 -->
            <el-table :data="studentScores" stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="学号" prop="studentNumber"></el-table-column>
              <el-table-column label="姓名" prop="studentName"></el-table-column>
              <el-table-column label="性别" prop="studentSex">
                <template slot-scope="scope">
                  <span v-if="scope.row.studentSex == 0">女</span>
                  <span v-else>男</span>
                </template>
              </el-table-column>
              <el-table-column label="学院" prop="studentCollege"></el-table-column>
              <el-table-column label="年级" prop="studentGrade"></el-table-column>
              <el-table-column label="班级" prop="studentClass"></el-table-column>
              <el-table-column label="邮箱" prop="studentEmail"></el-table-column>
              <el-table-column label="竞赛编号" prop="competitionId"></el-table-column>
              <el-table-column label="竞赛名称" prop="competitionName"></el-table-column>
              <el-table-column label="竞赛时间" prop="studentTime"></el-table-column>
              <el-table-column label="竞赛成绩" prop="studentScore">
                <template slot-scope="scope">
                  <el-input
                      :placeholder="scope.row.studentScore"
                      v-model="scope.row.studentScore">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-tooltip
                      effect="dark" content="提交成绩" placement="top" :enterable="false">
                    <!-- 修改按钮 -->
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="addStudentScore(scope.row.studentNumber, scope.row.studentScore, scope.row.competitionId, scope.row.studentTime)"></el-button>
                  </el-tooltip>
                  <el-tooltip
                      effect="dark" content="修改成绩" placement="top" :enterable="false">
                    <!-- 删除按钮 -->
                    <el-button
                        type="danger"
                        icon="el-icon-edit"
                        size="mini"
                        @click="addStudentScore(scope.row.studentNumber, scope.row.studentScore, scope.row.competitionId, scope.row.studentTime)"></el-button>
                  </el-tooltip>
                  <el-tooltip
                      effect="dark" content="发送邮件" placement="top" :enterable="false">
                    <!-- 删除按钮 -->
                    <el-button
                        type="warning"
                        icon="el-icon-message"
                        size="mini"
                        @click="sendStudentEmail(scope.row.studentNumber, scope.row.studentName, scope.row.competitionId, scope.row.competitionName, scope.row.studentTime, scope.row.studentScore, scope.row.studentEmail)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
              @size-change="studentHandleSizeChange"
              @current-change="studentHandleCurrentChange"
              :current-page="studentScoresQueryInfo.pageNum"
              :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
              :page-size="studentScoresQueryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="studentScoresTotal">
            </el-pagination>
          </el-tab-pane>

          <!-- 团队成绩 -->
          <el-tab-pane label="团队成绩" name="second">
            <!-- 搜索学生或者学号 -->
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input placeholder="请输入团队编号或者名称" clearable v-model="teamScoresQueryInfo.teamIdOrName" @clear="getTeamScores">
                  <el-button slot="append" icon="el-icon-search" @click="getTeamScores"></el-button>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-cascader placeholder="输入或者选择竞赛项目" :options="teamCompetitionList" v-model="teamCompetitionSelect"
                             filterable
                             :props="{ expandTrigger: 'hover', value: 'competitionId', label: 'competitionName', emitPath: false, checkStrictly: true }"
                             @change="teamCompetitionHandleChange" clearable>
                </el-cascader>
              </el-col>
              <el-col :span="5">
                <el-cascader placeholder="输入或者选择竞赛时间" :options="teamTimeList" v-model="teamTimeSelect"
                             filterable
                             :props="{ expandTrigger: 'hover',value: 'timeId', label: 'competitionTime', emitPath: false, checkStrictly: true }"
                             @change="teamTimeHandleChange" clearable>
                </el-cascader>
              </el-col>
            </el-row>
            <!-- 团队竞赛详细信息 -->
            <el-table :data="teamScores" stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="团队编号" prop="teamId"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"></el-table-column>
              <el-table-column label="队长学号" prop="teamCaptainNumber"></el-table-column>
              <el-table-column label="队长姓名" prop="teamCaptain"></el-table-column>
              <el-table-column label="注册学院" prop="teamCollege"></el-table-column>
              <el-table-column label="竞赛编号" prop="competitionId"></el-table-column>
              <el-table-column label="竞赛名称" prop="competitionName"></el-table-column>
              <el-table-column label="竞赛时间" prop="teamTime"></el-table-column>
              <el-table-column label="竞赛成绩">
                <template slot-scope="scope">
                  <el-input :placeholder="scope.row.teamScore" v-model="scope.row.teamScore">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="dark"
                    content="提交成绩"
                    placement="top"
                    :enterable="false">
                    <!-- 修改按钮 -->
                    <el-button
                      type="primary"
                      icon="el-icon-plus"
                      size="mini"
                      @click="addTeamScore(scope.row.teamId, scope.row.teamScore, scope.row.competitionId, scope.row.teamTime)">
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    effect="dark"
                    content="修改成绩"
                    placement="top"
                    :enterable="false">
                    <!-- 邮件发送 -->
                    <el-button
                      type="danger"
                      icon="el-icon-edit"
                      size="mini"
                      @click="addTeamScore(scope.row.teamId, scope.row.teamScore, scope.row.competitionId, scope.row.teamTime)">
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    effect="dark"
                    content="发送邮件"
                    placement="top"
                    :enterable="false">
                    <!-- 邮件发送 -->
                    <el-button
                      type="warning"
                      icon="el-icon-message"
                      size="mini"
                      @click="sendTeamEmail(scope.row.teamId, scope.row.teamName, scope.row.competitionId, scope.row.competitionName, scope.row.teamScore, scope.row.teamTime)">
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <!-- 分页区域 -->
            <el-pagination
              @size-change="teamHandleSizeChange"
              @current-change="teamHandleCurrentChange"
              :current-page="teamScoresQueryInfo.pageNum"
              :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
              :page-size="teamScoresQueryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="teamScoresTotal">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'addScore',
  data () {
    return {
      // 学生用户成绩查询对象
      studentScoresQueryInfo: {
        studentNumberOrName: '',
        studentTime: -1,
        competitionId: null,
        pageNum: 1,
        pageSize: 2
      },
      // 学生成绩对象列表
      studentScores: [],
      // 学生用户成绩总数
      studentScoresTotal: 0,
      // 学生竞赛列表
      studentCompetitionList: [],
      // 学生竞赛选择
      studentCompetitionSelect: null,
      // 学生竞赛时间表
      studentTimeList: [],
      // 学生竞赛时间选择
      studentTimeSelect: null,
      // 添加、修改用户成绩对象
      studentScoresEdit: {
        studentNumber: '',
        studentScore: null,
        competitionId: null,
        studentTime: null
      },
      // 用户邮件发送对象
      studentScoreEmail: {
        studentNumber: '',
        studentName: '',
        competitionId: null,
        competitionName: '',
        studentTime: null,
        studentScore: null,
        studentEmail: ''
      },
      // 团队成绩对象列表
      teamScores: [],
      // 团队成绩总数
      teamScoresTotal: 0,
      // 团队成绩查询对象
      teamScoresQueryInfo: {
        teamIdOrName: '',
        teamTime: -1,
        competitionTime: null,
        pageNum: 1,
        pageSize: 2
      },
      // 团队竞赛列表
      teamCompetitionList: [],
      // 团队竞赛选择列表
      teamCompetitionSelect: null,
      // 团队竞赛时间列表
      teamTimeList: [],
      // 团队竞赛时间选择
      teamTimeSelect: null,
      // 添加、修改团队成绩对象
      teamScoresEdit: {
        teamId: null,
        teamScore: null,
        competitionId: null,
        teamTime: null
      },
      // 团队邮件发送对象
      teamScoresEmail: {
        teamId: null,
        teamName: '',
        competitionId: null,
        competitionName: '',
        teamScore: null,
        teamTime: null
      },
      // 激活标签页
      activeName: 'first'
    }
  },
  created () {
    this.getStudentScores()
    this.getTeamScores()
    this.getStudentCompetitionAndTimeList()
    this.getTeamCompetitionAndTimeList()
  },
  methods: {
    // 获取学生用户成绩
    async getStudentScores () {
      const { data: res } = await this.$http.get('admin/students/scores', { params: this.studentScoresQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentScores = res.data.students
      this.studentScoresTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取单人用户竞赛列表和时间列表
    async getStudentCompetitionAndTimeList () {
      const { data: res } = await this.$http.get('admin/students/scores/competitions/times')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentCompetitionList = res.data.competitionList
      this.studentTimeList = res.data.timeList
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取团队竞赛成绩
    async getTeamScores () {
      const { data: res } = await this.$http.get('admin/teams/scores', { params: this.teamScoresQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.teamScores = res.data.teams
      this.teamScoresTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取团队竞赛户竞赛列表和时间列表
    async getTeamCompetitionAndTimeList () {
      const { data: res } = await this.$http.get('admin/teams/scores/competitions/times')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.teamCompetitionList = res.data.competitionList
      this.teamTimeList = res.data.timeList
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 学生竞赛项目选择发生变化
    studentCompetitionHandleChange () {
      console.log(this.studentCompetitionSelect)
      this.studentScoresQueryInfo.competitionId = this.studentCompetitionSelect
      this.getStudentScores()
    },
    // 学生竞赛时间选择发生变化
    studentTimeHandleChange () {
      console.log(this.studentTimeSelect)
      const studentTime = this.studentTimeList.find(stu => stu.timeId === this.studentTimeSelect)
      this.studentScoresQueryInfo.studentTime = studentTime.competitionTime
      this.getStudentScores()
      console.log(studentTime.competitionTime)
    },
    // 团队竞赛项目选择发生变化
    teamCompetitionHandleChange () {
      console.log(this.teamCompetitionSelect)
      this.teamScoresQueryInfo.competitionId = this.teamCompetitionSelect
      this.getTeamScores()
    },
    // 团队竞赛时间选择发生变化
    teamTimeHandleChange () {
      console.log(this.teamTimeSelect)
      const teamTime = this.teamTimeList.find(team => team.timeId === this.teamTimeSelect)
      this.teamScoresQueryInfo.teamTime = teamTime.competitionTime
      this.getTeamScores()
      console.log(teamTime.competitionTime)
    },
    // 学生添加或者修改成绩
    async addStudentScore (studentNumber, studentScore, competitionId, studentTime) {
      this.studentScoresEdit.studentNumber = studentNumber
      this.studentScoresEdit.studentScore = studentScore
      this.studentScoresEdit.competitionId = competitionId
      this.studentScoresEdit.studentTime = studentTime
      console.log(this.studentScoresEdit)
      const { data: res } = await this.$http.put('admin/students/scores', this.qs.stringify(this.studentScoresEdit))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getStudentScores()
    },
    // 团队添加或者修改成绩
    async addTeamScore (teamId, teamScore, competitionId, teamTime) {
      this.teamScoresEdit.teamId = teamId
      this.teamScoresEdit.teamScore = teamScore
      this.teamScoresEdit.competitionId = competitionId
      this.teamScoresEdit.teamTime = teamTime
      console.log(this.teamScoresEdit)
      const { data: res } = await this.$http.put('admin/teams/scores', this.qs.stringify(this.teamScoresEdit))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getTeamScores()
    },
    // 发送学生单人竞赛成绩邮件
    async sendStudentEmail (studentNumber, studentName, competitionId, competitionName, studentTime, studentScore, studentEmail) {
      this.studentScoreEmail.studentNumber = studentNumber
      this.studentScoreEmail.studentName = studentName
      this.studentScoreEmail.competitionId = competitionId
      this.studentScoreEmail.competitionName = competitionName
      this.studentScoreEmail.studentTime = studentTime
      this.studentScoreEmail.studentScore = studentScore
      this.studentScoreEmail.studentEmail = studentEmail
      const { data: res } = await this.$http.post('admin/students/scores/email', this.qs.stringify(this.studentScoreEmail))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    // 发送团队竞赛成绩邮件
    async sendTeamEmail (teamId, teamName, competitionId, competitionName, teamScore, teamTime) {
      this.teamScoresEmail.teamId = teamId
      this.teamScoresEmail.teamName = teamName
      this.teamScoresEmail.competitionId = competitionId
      this.teamScoresEmail.competitionName = competitionName
      this.teamScoresEmail.teamScore = teamScore
      this.teamScoresEmail.teamTime = teamTime
      const { data: res } = await this.$http.post('admin/teams/scores/emails', this.qs.stringify(this.teamScoresEmail))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    // 监听pagesize 改变的事件
    studentHandleSizeChange (newSize) {
      // console.log(newSize)
      this.studentScoresQueryInfo.pageSize = newSize
      this.getStudentScores()
    },
    // 监听页面值改变的事件
    studentHandleCurrentChange (newPage) {
      // console.log(newPage)
      this.studentScoresQueryInfo.pageNum = newPage
      this.getStudentScores()
    },
    // 监听pagesize 改变的事件
    teamHandleSizeChange (newSize) {
      // console.log(newSize)
      this.teamScoresQueryInfo.pageSize = newSize
      this.getTeamScores()
    },
    // 监听页面值改变的事件
    teamHandleCurrentChange (newPage) {
      // console.log(newPage)
      this.teamScoresQueryInfo.pageNum = newPage
      this.getTeamScores()
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
