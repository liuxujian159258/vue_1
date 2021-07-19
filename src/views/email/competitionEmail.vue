<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>邮件通知</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛报名邮件模板</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="border: none">
          <!-- 模板详情 -->
          <el-tab-pane
              style="border: none"
              :label="competition.competitionName"
              :name="competition.competitionName"
              v-for="competition in competitionEmails"
              :key="competition.competitionId">
            <el-card style="border: none">
              <el-row>
                <el-button-group>
                  <el-button
                      type="primary" @click="addCompetitionEmailClick">添加模板</el-button>
                    <el-button
                        type="primary"
                        @click="editCompetitionEmailClick(competition.competitionId, competition.competitionName, competition.subject, competition.text)">
                      修改模板</el-button>
                </el-button-group>
              </el-row>
              <el-row>
                <el-input
                    placeholder="请输入内容" v-model="competition.subject">
                  <template slot="prepend">请填写主题</template>
                </el-input>
              </el-row>
              <el-row>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 16}"
                  placeholder="请输入邮件正文"
                  v-model="competition.text">
                </el-input>
              </el-row>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 添加竞赛报名邮件模板 -->
      <el-dialog
          title="输入注册团队所需信息"
          :visible.sync="addCompetitionEmailDialogVisible"
          width="80%"
          @close="addCompetitionEmailDialogClose">
        <el-form
            ref="addCompetitionEmailFormRef"
            :model="addCompetitionEmailForm"
            :rules="addCompetitionEmailFormRules"
            label-width="100px">
          <el-form-item
              label="竞赛编号" prop="competitionId">
            <el-input
                v-model="addCompetitionEmailForm.competitionId"></el-input>
          </el-form-item>
          <el-form-item
              label="竞赛名称" prop="competitionName">
            <el-input
                v-model="addCompetitionEmailForm.competitionName"></el-input>
          </el-form-item>
          <el-form-item
              label="邮件主题" prop="subject">
            <el-input
              v-model="addCompetitionEmailForm.subject">
            </el-input>
          </el-form-item>
          <el-form-item
              label="邮件详情" prop="text">
            <el-input
              type="textarea"
              :autosize="{ minRows: 10}"
              v-model="addCompetitionEmailForm.text">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button
        @click="addCompetitionEmailDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="addCompetitionEmail">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'competitionEmail',
  data () {
    return {
      // 激活标签
      activeName: '',
      // 竞赛邮件模板
      competitionEmails: [],
      // 控制竞赛报名添加框的显示与隐藏
      addCompetitionEmailDialogVisible: false,
      // 竞赛报名邮件添加模板对象
      addCompetitionEmailForm: {
        competitionId: null,
        competitionName: '',
        subject: '',
        text: ''
      },
      // 竞赛报名邮件添加模板对象验证规则
      addCompetitionEmailFormRules: {
        competitionId: [{ required: true, message: '请输入竞赛编号', trigger: 'blur' }],
        competitionName: [{ required: true, message: '请输入竞赛名称', trigger: 'blur' }],
        subject: [{ required: true, message: '请输入邮件主题', trigger: 'blur' }],
        text: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }]
      },
      // 竞赛报名邮件模板修改对象
      editCompetitionEmail: {
        competitionId: null,
        competitionName: '',
        subject: '',
        text: ''
      }
    }
  },
  created () {
    this.getCompetitionEmail()
  },
  methods: {
    // 处理标签页的切换
    handleClick () {
    },
    // 获取所有邮件模板
    async getCompetitionEmail () {
      const { data: res } = await this.$http.get('admin/emails/competitionEmails')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.competitionEmails = res.data.competitionEmails
      // 激活标签赋值
      this.activeName = this.competitionEmails[0].competitionName
      this.$message.success(res.meta.msg)
    },
    // 添加邮件模板的显示
    addCompetitionEmailClick () {
      this.addCompetitionEmailDialogVisible = true
    },
    // 添加邮件模板的关闭
    addCompetitionEmailDialogClose () {
      this.$refs.addCompetitionEmailFormRef.resetFields()
    },
    // 添加邮件模板的添加
    addCompetitionEmail () {
      console.log(this.addCompetitionEmailForm)
      this.$refs.addCompetitionEmailFormRef.validate(async valid => {
        if (!valid) return
        // 发起添加邮件模板请求
        const { data: res } = await this.$http.post('admin/emails/competitionEmails', this.qs.stringify(this.addCompetitionEmailForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getCompetitionEmail()
        this.addCompetitionEmailDialogVisible = false
      })
    },
    // 添加邮件模板修改的提交
    async editCompetitionEmailClick (competitionId, competitionName, subject, text) {
      this.editCompetitionEmail.competitionId = competitionId
      this.editCompetitionEmail.competitionName = competitionName
      this.editCompetitionEmail.subject = subject
      this.editCompetitionEmail.text = text
      console.log(this.editCompetitionEmail)
      const { data: res } = await this.$http.put('admin/emails/competitionEmails', this.qs.stringify(this.editCompetitionEmail))
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getCompetitionEmail()
    }
  }
}
</script>

<style scoped lang="less">
  .el-row {
    margin-bottom: 20px;
  }
  .el-breadcrumb {
     font-size: 15px;
   }
</style>
