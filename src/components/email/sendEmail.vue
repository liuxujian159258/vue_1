<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>邮件通知</el-breadcrumb-item>
        <el-breadcrumb-item>发送邮件</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="普通邮件" name="first">
            <el-row>
              <el-button-group>
                <el-button type="primary" size="mini" @click="sendEmail()">发送</el-button>
                <el-button type="primary" size="mini" @click="editEmail">修改发送邮箱</el-button>
              </el-button-group>
            </el-row>
            <el-row>
              <el-input placeholder="请输入内容" v-model="input1">
              <template slot="prepend">填写收件人</template>
            </el-input>
            </el-row>
            <el-row>
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="prepend">请填写主题</template>
            </el-input>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                :autosize="{ minRows: 16}"
                placeholder="请输入邮件正文"
                v-model="textarea2">
              </el-input>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="群发邮件" name="second">
            <el-row>
              <el-button-group>
                <el-button type="primary" size="mini" @click="sendEmail">发送</el-button>
                <el-button type="primary" size="mini" @click="editEmail">修改发送邮箱</el-button>
              </el-button-group>
            </el-row>
            <el-row>
              <el-col :span="4">
                <el-cascader v-model="selectCompetition" placeholder="输入或者选择竞赛项目" :options="competitionlist" filterable
                             :props="{ expandTrigger: 'hover', value: 'id', label: 'name', checkStrictly: true }"
                             @change="addHandleChange" clearable>
                </el-cascader>
              </el-col>
              <el-col :span="4">
                <el-cascader v-model="selectTime" placeholder="输入或者选择竞赛时间" :options="timelist" filterable
                             :props="{ expandTrigger: 'hover',value: 'id', label: 'name', checkStrictly: true }"
                             @change="addHandleChange" clearable>
                </el-cascader>
              </el-col>
          </el-row>
            <el-row>
              <el-input placeholder="请输入内容" v-model="input1">
                <template slot="prepend">请填写主题</template>
              </el-input>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                :autosize="{ minRows: 16}"
                placeholder="请输入邮件正文"
                v-model="textarea2">
              </el-input>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 邮箱编辑框 -->
      <el-dialog title="修改邮箱" :visible.sync="editEmailDialogVisible"
                 width="50%" @close="editEmailDialogClose">
        <el-form ref="editEmailFormRef" :model="editEmailForm" :rules="editEmailFormRules" label-width="70px">
          <el-form-item label="邮箱" prop="semail">
            <el-input v-model="editEmailForm.semail"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="editDialogVisible">
    <el-button @click="editEmailDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserEmail">确 定</el-button>
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
      competitionlist: [
        { id: 0, name: '无线电定向"猎狐竞赛"' },
        { id: 1, name: '实践技能提升竞赛AI挑战赛' },
        { id: 2, name: '群体时空数据的语义分析' },
        { id: 3, name: '程序设计大赛' },
        { id: 4, name: '智能制造场景中的物流机器人大赛' },
        { id: 5, name: '全国大学生电子设计竞赛校赛' },
        { id: 6, name: '中国大学生计算机设计大赛校内选拔赛' },
        { id: 7, name: '全国大学生信息安全竞赛兰州大学选拔赛' },
        { id: 8, name: 'MODMA比赛' },
        { id: 9, name: 'IET全球英语演讲竞赛兰州大学选拔赛' }
      ],
      // 时间列表
      timelist: [
        { id: 2017, name: '第30届' },
        { id: 2018, name: '第31届' },
        { id: 2019, name: '第32届' },
        { id: 2020, name: '第33届' }
      ],
      // 选中的竞赛
      selectCompetition: [],
      // 选中的时间
      selectTime: [],
      // 邮件内容
      input1: '',
      input2: '',
      textarea2: '',
      activeName: 'first',
      // 修改邮件弹窗的显示与隐藏
      editEmailDialogVisible: false,
      // 邮件对象
      editEmailForm: {
      },
      // 邮件验证规则对象
      editEmailFormRules: {
        semail: [{ required: true, message: '请输入邮箱名称', trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    addHandleChange () {
      console.log(this.selectCompetition)
      console.log(this.selectTime)
    },
    handleClick () {},
    // 发送邮件
    sendEmail () {
      this.$message.success(this.Input1)
    },
    // 关闭清空
    editEmailDialogClose () {
      this.$refs.editEmailFormRef.resetFields()
    },
    editUserEmail () {
      this.$message.success('修改成功')
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

</style>
