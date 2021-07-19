<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>邮件通知</el-breadcrumb-item>
        <el-breadcrumb-item>邮件发送</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 普通邮件 -->
          <el-tab-pane label="普通邮件" name="first">
            <el-row>
              <el-button-group>
                <el-button
                    type="primary" @click="sendOneEmail">发送</el-button>
                <el-button
                    type="primary" @click="editEmail">修改发送邮箱</el-button>
              </el-button-group>
            </el-row>
            <el-row>
              <el-input placeholder="请输入内容" v-model="oneEmail.to">
              <template slot="prepend">填写收件人</template>
            </el-input>
            </el-row>
            <el-row>
            <el-input placeholder="请输入内容" v-model="oneEmail.subject">
              <template slot="prepend">请填写主题</template>
            </el-input>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                :autosize="{ minRows: 16}"
                placeholder="请输入邮件正文"
                v-model="oneEmail.text">
              </el-input>
            </el-row>
          </el-tab-pane>
          <!-- 群发邮件 -->
          <el-tab-pane label="群发邮件" name="second">
            <el-row>
              <el-button-group>
                <el-button
                    type="primary" @click="sendMassEmail">发送</el-button>
                <el-button
                    type="primary" @click="editEmail">修改发送邮箱</el-button>
              </el-button-group>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-cascader
                    v-model="competitionSelect"
                    placeholder="输入或者选择竞赛项目"
                    :options="competitionList" filterable
                    :props="{ expandTrigger: 'hover', value: 'competitionId', label: 'competitionName', emitPath: false, checkStrictly: true }"
                    @change="addCompetitionHandleChange" clearable>
                </el-cascader>
              </el-col>
              <el-col :span="4">
                <el-cascader v-model="timeSelect" placeholder="输入或者选择竞赛时间" :options="timeList" filterable
                             :props="{ expandTrigger: 'hover',value: 'timeId', label: 'competitionTime', emitPath: false, checkStrictly: true }"
                             @change="addTimeHandleChange" clearable>
                </el-cascader>
              </el-col>
          </el-row>
            <el-row>
              <el-input placeholder="请输入内容" v-model="massEmail.subject">
                <template slot="prepend">请填写主题</template>
              </el-input>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                :autosize="{ minRows: 16}"
                placeholder="请输入邮件正文"
                v-model="massEmail.text">
              </el-input>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 邮箱编辑框 -->
      <el-dialog
          title="修改邮箱"
          :visible.sync="editEmailDialogVisible"
          width="50%"
          @close="editEmailDialogClose">
        <el-form
            ref="editEmailFormRef"
            :model="editEmailForm"
            :rules="editEmailFormRules"
            label-width="70px">
          <el-form-item
              label="邮箱" prop="email">
            <el-input
                v-model="editEmailForm.email"></el-input>
          </el-form-item>
          <el-form-item
              label="授权码" prop="emailPassword">
            <el-input
                v-model="editEmailForm.emailPassword"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="editDialogVisible">
    <el-button
        @click="editEmailDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="editAdminEmail">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'sendEmail',
  data () {
    return {
      // 竞赛列表
      competitionList: [],
      // 时间列表
      timeList: [],
      // 选中的竞赛
      competitionSelect: null,
      // 选中的时间
      timeSelect: null,
      // 单人邮件对象
      oneEmail: {
        from: '',
        fromPassword: '',
        to: '',
        subject: '',
        text: ''
      },
      // 多人邮件对象
      massEmail: {
        from: '',
        fromPassword: '',
        competitionName: '',
        competitionTime: null,
        competitionType: null,
        subject: '',
        text: ''
      },
      activeName: 'first',
      // 修改邮件弹窗的显示与隐藏
      editEmailDialogVisible: false,
      // 修改邮件对象
      editEmailForm: {
        email: '',
        emailPassword: ''
      },
      // 邮件验证规则对象
      editEmailFormRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        emailPassword: [{ required: true, message: '请输入邮箱授权码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCompetitionAndTimeList()
  },
  methods: {
    // 获取竞赛和时间列表
    async getCompetitionAndTimeList () {
      const { data: res } = await this.$http.get('admin/emails/competitions/times')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.competitionList = res.data.competitionList
      this.timeList = res.data.timeList
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 处理竞赛级联选择器
    addCompetitionHandleChange () {
      console.log(this.competitionSelect)
      console.log(this.timeSelect)
    },
    // 处理竞赛时间级联选择器
    addTimeHandleChange () {
      console.log(this.timeSelect)
    },
    handleClick () {},
    // 单人邮件发送
    async sendOneEmail () {
      const { data: res } = await this.$http.post('admin/emails/one', this.qs.stringify(this.oneEmail))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      console.log(this.oneEmail)
    },
    // 多人邮件发送
    async sendMassEmail () {
      if (this.competitionSelect !== null && this.competitionSelect !== '') {
        const competitionName = this.competitionList.find(competition => competition.competitionId === this.competitionSelect)
        this.massEmail.competitionName = competitionName.competitionName
      }
      if (this.timeSelect !== null) {
        const competitionTime = this.timeList.find(time => time.timeId === this.timeSelect)
        this.massEmail.competitionTime = competitionTime.competitionTime
      }
      console.log(this.competitionSelect)
      console.log(this.timeSelect)
      console.log(this.massEmail)
      const { data: res } = await this.$http.post('admin/emails/mass', this.qs.stringify(this.massEmail))
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      console.log(this.massEmail)
    },
    // 关闭清空
    editEmailDialogClose () {
      this.$refs.editEmailFormRef.resetFields()
    },
    // 修改管理员邮箱
    editAdminEmail () {
      console.log(this.editEmailForm)
      this.$refs.editEmailFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('admin/emails', this.qs.stringify(this.editEmailForm))
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        console.log(res)
        this.editEmailDialogVisible = false
      })
    },
    // 邮件修改框的显示与隐藏
    editEmail () {
      this.editEmailDialogVisible = true
    }
  }
}
</script>

<style  lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
