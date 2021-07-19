<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生登陆报名界面</el-breadcrumb-item>
        <el-breadcrumb-item>完善信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card align="middle">
        <el-alert title="请完善相应的信息" type="warning" center show-icon></el-alert>
        <el-card style="border: none; width: 50%">
        <el-form :model="StudentInformationForm" :rules="StudentInformationRules" ref="StudentInformationRef" label-width="100px">
          <el-form-item label="学号" prop="snu">
            <el-input v-model="StudentInformationForm.snu" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="sname">
            <el-input v-model="StudentInformationForm.sname" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="scollege">
            <el-input v-model="StudentInformationForm.scollege" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="sclass">
            <el-input v-model="StudentInformationForm.sclass" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="semail">
            <el-input v-model="StudentInformationForm.semail" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="sphone">
            <el-input v-model="StudentInformationForm.sphone" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="StudentInformationFormClick">提交信息</el-button>
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
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 学生信息表格
      StudentInformationForm: {
        snu: '320170940841',
        sname: '刘绪俭1',
        scollege: '信息科学与工程学院',
        sclass: '2017电子商务1',
        semail: '2925906232@qq.com',
        sphone: '17325013945'
      },
      // 学生信息表格验证规则
      StudentInformationRules: {
        semail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        sphone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    StudentInformationFormClick () {
      this.$message.success('信息已经提交成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
