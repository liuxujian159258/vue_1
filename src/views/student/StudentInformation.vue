<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生用户界面</el-breadcrumb-item>
        <el-breadcrumb-item>信息完善</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card align="middle">
        <el-alert
                type="warning"
                :closable="false"
                center
                show-icon>
          <span style="font-size: 20px;">
            请完善相应的信息</span>
        </el-alert>
        <!-- 信息完善 -->
        <el-card style="border: none; width: 50%">
        <el-form
            :model="studentInformationForm"
            :rules="studentInformationFormRules"
            ref="studentInformationRef"
            label-width="100px">
          <el-form-item
              label="学号" prop="studentNumber">
            <el-input
                v-model="studentInformationForm.studentNumber" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="姓名" prop="studentName">
            <el-input
                v-model="studentInformationForm.studentName" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="性别" prop="studentSex">
            <el-input
                v-if="studentInformationForm.studentSex === 1"
                v-model="man"
                disabled></el-input>
            <el-input
                v-else disabled v-model="girl"></el-input>
          </el-form-item>
          <el-form-item
              label="学院" prop="studentCollege">
            <el-input
                v-model="studentInformationForm.studentCollege" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="年级" prop="studentGrade">
            <el-input
                v-model="studentInformationForm.studentGrade" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="班级" prop="studentClass">
            <el-input
                v-model="studentInformationForm.studentClass" clearable></el-input>
          </el-form-item>
          <el-form-item
              label="邮箱" prop="studentEmail">
            <el-input
                v-model="studentInformationForm.studentEmail" clearable></el-input>
          </el-form-item>
          <el-form-item
              label="手机" prop="studentPhone">
            <el-input
                v-model="studentInformationForm.studentPhone" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                @click="studentInformationFormClick">提交信息</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'StudentInformation',
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
    // 验证手机号规则
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 男
      man: '男',
      // 女
      girl: '女',
      // 学生信息表格
      studentInformationForm: {
        studentNumber: '',
        studentName: '',
        studentSex: null,
        studentCollege: '',
        studentClass: '',
        studentGrade: null,
        studentEmail: '',
        studentPhone: ''
      },
      // 学生信息表格验证规则
      studentInformationFormRules: {
        studentClass: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        studentEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        studentPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getStudentInformation()
  },
  methods: {
    // 获取用户基本信息
    async getStudentInformation () {
      const { data: res } = await this.$http.get('student/informations')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentInformationForm = res.data.student
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 提交基本信息
    studentInformationFormClick () {
      this.$refs.studentInformationRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户请求
        const { data: res } = await this.$http.put('student/informations', this.qs.stringify(this.studentInformationForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getStudentInformation()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    font-size: 15px;
  }
  .el-card {
    background-color: #ffffff;
  }
</style>
