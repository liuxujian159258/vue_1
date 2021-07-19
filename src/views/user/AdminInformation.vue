<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>信息完善</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card align="middle">
        <el-alert
            type="warning"
            center
            :closable="false"
            show-icon>
          <span style="font-size: 20px;">
            请完善相应的信息</span>
        </el-alert>
        <!-- 信息完善 -->
        <el-card
            style="border: none; width: 50%">
          <el-form :model="adminInformationForm"
                   :rules="adminInformationRules"
                   ref="adminInformationRef"
                   label-width="100px">
            <el-form-item
                label="管理员名称"
                prop="username">
              <el-input
                  v-model="adminInformationForm.username" disabled>
              </el-input>
            </el-form-item>
            <el-form-item
                label="管理员密码" prop="password">
              <el-input
                  clearable v-model="adminInformationForm.password">
              </el-input>
            </el-form-item>
            <el-form-item
                label="管理员邮箱" prop="email">
              <el-input
                  clearable v-model="adminInformationForm.email">
              </el-input>
            </el-form-item>
            <el-form-item
                label="邮箱授权码" prop="emailPassword">
              <el-input
                  clearable v-model="adminInformationForm.emailPassword">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                  @click="adminInformationFormClick">
                提交信息</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'AdminInformation',
  data () {
    // 验证邮箱的规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
      if (regEmail.test(value)) {
        // 邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      // 管理员信息对象
      adminInformationForm: {
        username: '',
        password: '',
        email: '',
        emailPassword: ''
      },
      // 管理员信息表格验证对象
      adminInformationRules: {
        username: [{ required: true, message: '请输入管理员名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入管理员邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        emailPassword: [{ required: true, message: '请输入管理员邮箱授权码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getAdminInformation()
  },
  methods: {
    // 获取管理员信息
    async getAdminInformation () {
      const { data: res } = await this.$http.get('admin/admins')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.adminInformationForm = res.data.admin
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 提交修改管理员信息
    adminInformationFormClick () {
      console.log(this.adminInformationForm)
      this.$refs.adminInformationRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('admin/admins', this.qs.stringify(this.adminInformationForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getAdminInformation()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
