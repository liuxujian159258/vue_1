<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生用户界面</el-breadcrumb-item>
      <el-breadcrumb-item>团队管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-tabs v-model="activeName">
        <!--  我的团队      -->
        <el-tab-pane label="我的团队" name="first">
          <el-card>
            <el-row>
              <el-alert type="success" center :closable="false">
                <span style="font-size: 30px;">我管理的团队</span>
              </el-alert>
            </el-row>
            <el-card v-for="team in myTeams" :key="team.teamId" style="border:none">
              <el-row>
                <el-alert type="success" center :closable="false">
                  <span style="font-size: 20px;"><font color="#5E88FF">
                  团队编号：{{ team.teamId }}   团队名称：{{ team.teamName }}
                  </font>
                  </span>
                </el-alert>
              </el-row>
              <el-row v-if="team.teamDismiss === 0">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    round
                    @click="showAddTeamStudentDialogVisible(team.teamId)">
                  添加队员</el-button>
                <el-button
                    type="warning"
                    icon="el-icon-edit"
                    round
                    @click="editTeam(team.teamId, team.teamName, team.teamCollege)">
                  编辑团队</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    round
                    @click="deleteTeam(team.teamId)">解散团队</el-button>
              </el-row>
                <el-table :data="team.teamsStudent" style="width: 100%" max-height="250" stripe>
                  <el-table-column fixed prop="studentNumber" label="学号" width="150"></el-table-column>
                  <el-table-column prop="studentName" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="studentCollege" label="学院" width="120"></el-table-column>
                  <el-table-column prop="studentClass" label="班级" width="120"></el-table-column>
                  <el-table-column prop="studentEmail" label="邮箱" width="300"></el-table-column>
                  <el-table-column prop="studentPhone" label="手机号码" width="120"></el-table-column>
                  <el-table-column v-if="team.teamDismiss === 0" fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button @click="removeStudentFromTeam(scope.row.studentNumber, team.teamId)"
                                 type="text" size="small">
                        移除</el-button>
                      <el-button @click="updateTeamCaptain(scope.row.studentNumber, team.teamId)"
                                 type="text" size="small">
                        提升为队长</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-card>
          </el-card>
          <el-card>
            <el-row>
              <el-alert type="success" center :closable="false">
                <span
                    style="font-size: 30px;">我加入的团队</span>
              </el-alert>
            </el-row>
            <el-table :data="myJionTeams"  stripe>
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="teamId" label="团队编号"></el-table-column>
              <el-table-column prop="teamName" label="团队名称"></el-table-column>
              <el-table-column prop="teamCaptain" label="队长"></el-table-column>
              <el-table-column prop="teamCollege" label="注册学院"></el-table-column>
              <el-table-column prop="teamDismiss" label="是否解散">
                <template slot-scope="scope">
                  <span v-if="scope.row.teamDismiss === 1">已解散</span>
                  <span v-else>未解散</span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
        <!--   注册团队     -->
        <el-tab-pane label="注册团队" name="second">
          <el-row>
            <el-alert type="success" center :closable="false">
              <span style="font-size: 30px;">请仔细检查注册团队所需信息</span>
            </el-alert>
          </el-row>
          <el-row>
            <el-button type="primary" icon="el-icon-plus" round @click="addTeam">注册团队</el-button>
          </el-row>
          <el-card>
            <el-form label-position="right"
                     label-width="100px"
                     :model="addTeamForm"
                     :rules="addTeamFormRules"
                     ref="addTeamFormRef"
                     style="width: 80%">
              <el-form-item label="团队名称" prop="teamName">
                <el-input v-model="addTeamForm.teamName">
                </el-input>
              </el-form-item>
              <el-form-item label="注册学院" prop="teamCollege">
                <el-input v-model="addTeamForm.teamCollege">
                </el-input>
              </el-form-item>
              <el-form-item label="团队成员" prop="teamStudent">
                <el-input v-model="addTeamForm.teamStudent">
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加队员显示框 -->
    <el-dialog title="添加队员"
               :visible.sync="addTeamStudentDialogVisible"
               @close="addTeamStudentDialogClose"
               width="50%">
      <span>输入学号和姓名如:320,刘绪俭</span>
      <el-row></el-row>
      <el-form :model="addTeamStudent"
               :rules="addTeamStudentRules"
               ref="addTeamStudentRef">
        <el-form-item prop="teamStudent">
          <el-input v-model="addTeamStudent.teamStudent">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button
        @click="addTeamStudentDialogVisible = false">
      取 消</el-button>
    <el-button
        type="primary" @click="addTeamStudentClick">
      确 定</el-button>
  </span>
    </el-dialog>
    <!-- 团队编辑弹窗 -->
    <el-dialog title="编辑团队"
               :visible.sync="editTeamStudentDialogVisible"
               @close="editTeamStudentDialogClose"
               width="50%">
      <el-row></el-row>
      <el-form :model="editTeamForm"
               :rules="editTeamFormRules"
               ref="editTeamStudentRef">
        <el-form-item prop="teamStudent" label="团队名称">
          <el-input v-model="editTeamForm.teamName">
          </el-input>
        </el-form-item>
        <el-form-item prop="teamCollege" label="学院名称">
          <el-input v-model="editTeamForm.teamCollege">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button
        @click="editTeamStudentDialogVisible = false">
      取 消</el-button>
    <el-button
        type="primary" @click="editTeamStudentClick">
      确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TeamManagement',
  data () {
    return {
      // 标签激活
      activeName: 'first',
      // 管理的团队列表即队长
      myTeams: [],
      // 加入的团队列表即队员
      myJionTeams: [],
      // 注册添加团队对象
      addTeamForm: {
        teamName: '',
        teamCollege: '',
        teamStudent: ''
      },
      // 添加团队对象验证规则
      addTeamFormRules: {
        teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        teamCollege: [{ required: true, message: '请输入团队注册学院', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        teamStudent: [{ required: true, message: '请输入团队成员', trigger: 'blur' }]
      },
      // 添加团队成员弹窗的显示与隐藏
      addTeamStudentDialogVisible: false,
      // 添加团队成员对象
      addTeamStudent: {
        teamId: null,
        teamStudent: ''
      },
      // 添加团队成员对象验证规则
      addTeamStudentRules: {
        teamStudent: [{ required: true, message: '请输入团队成员', trigger: 'blur' }]
      },
      // 编辑团队对象
      editTeamForm: {
        teamId: null,
        teamName: '',
        teamCollege: ''
      },
      // 编辑团队对象验证规则
      editTeamFormRules: {
        teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' }],
        teamCollege: [{ required: true, message: '请输入团队注册学院', trigger: 'blur' }]
      },
      // 编辑团队弹窗的隐藏与显示
      editTeamStudentDialogVisible: false,
      // 解散团队对象
      deleteTeamForm: {
        teamId: null
      },
      // 移除团队成员对象
      deleteTeamStudent: {
        teamId: null,
        studentNumber: ''
      },
      // 团队队长修改对象
      updateTeamStudentCaptain: {
        teamId: null,
        captainStudentNumber: null
      }
    }
  },
  created () {
    this.getStudentTeams()
  },
  methods: {
    // 获取团队信息
    async getStudentTeams () {
      const { data: res } = await this.$http.get('student/teams/students')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.myTeams = res.data.myTeam
      this.myJionTeams = res.data.myJionTeam
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 团队成员添加弹窗的关闭
    addTeamStudentDialogClose () {
      this.$refs.addTeamStudentRef.resetFields()
    },
    // 团队成员添加提交
    addTeamStudentClick: function () {
      // 判断是否符合规则
      this.$refs.addTeamStudentRef.validate(async valid => {
        if (!valid || this.addTeamStudent.teamStudent.split(',').length % 2 !== 0) {
          return this.$message.error('请检查相应的数据格式')
        }
        // 发起请求
        const { data: res } = await this.$http.post('student/teams/students', this.qs.stringify(this.addTeamStudent))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getStudentTeams()
        console.log(this.addTeamStudent)
        this.addTeamStudentDialogVisible = false
      })
    },
    // 添加、注册团队添加
    addTeam () {
      this.$refs.addTeamFormRef.validate(async valid => {
        // 判断是否满足相应的数据格式
        if (!valid || this.addTeamForm.teamStudent.split(',').length % 2 !== 0) {
          return this.$message.error('请检查相应的数据格式')
        }
        // 发起请求
        const { data: res } = await this.$http.post('student/teams', this.qs.stringify(this.addTeamForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getStudentTeams()
        console.log(res)
        console.log(this.addTeamForm)
      })
    },
    // 移除团队成员
    async removeStudentFromTeam (studentNumber, teamId) {
      console.log(studentNumber)
      console.log(teamId)
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将移除此团队成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消移除!')
      }
      this.deleteTeamStudent.teamId = teamId
      this.deleteTeamStudent.studentNumber = studentNumber
      console.log(this.deleteTeamStudent)
      const { data: res } = await this.$http.delete('student/teams/students', { params: this.deleteTeamStudent })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getStudentTeams()
      console.log(res)
    },
    // 更新团队队长
    async updateTeamCaptain (studentNumber, teamId) {
      console.log(studentNumber)
      console.log(teamId)
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将修改团队队长, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消修改!')
      }
      this.updateTeamStudentCaptain.captainStudentNumber = studentNumber
      this.updateTeamStudentCaptain.teamId = teamId
      console.log(this.updateTeamStudentCaptain)
      const { data: res } = await this.$http.put('student/teams/captain', this.qs.stringify(this.updateTeamStudentCaptain))
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getStudentTeams()
      console.log(res)
    },
    // 添加团队队员弹窗的显示
    showAddTeamStudentDialogVisible (teamId) {
      console.log(teamId)
      this.addTeamStudent.teamId = teamId
      this.addTeamStudentDialogVisible = true
    },
    // 解散团队
    async deleteTeam (teamId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将解散该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.deleteTeamForm.teamId = teamId
      const { data: res } = await this.$http.delete('student/teams', { params: this.deleteTeamForm })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getStudentTeams()
      console.log(res)
    },
    // 团队编辑按钮
    editTeam (teamId, teamName, teamCollege) {
      console.log(teamId)
      console.log(teamName)
      console.log(teamCollege)
      this.editTeamForm.teamId = teamId
      this.editTeamForm.teamName = teamName
      this.editTeamForm.teamCollege = teamCollege
      this.editTeamStudentDialogVisible = true
    },
    // 团队编辑弹窗的关闭
    editTeamStudentDialogClose () {
      this.$refs.editTeamStudentRef.resetFields()
    },
    // 团队编辑对象添加
    editTeamStudentClick () {
      this.$refs.editTeamStudentRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.put('student/teams', this.qs.stringify(this.editTeamForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getStudentTeams()
        console.log(res)
        console.log(this.editTeamForm)
        this.editTeamStudentDialogVisible = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
  el-table__row>td {
    border: none;
  }
  .el-table::before {
    height: 0px;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
  .el-tabs {
    font-size: 15px;
  }
</style>
