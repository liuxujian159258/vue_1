<template>
  <div class="login_container">
     <div class="login_box">
       <!--头像区域-->
       <div class="avatar_box">
         <img src="../assets/timg.jpg" alt="" class="round_icon">
       </div>
       <!--登陆表单区域-->
       <el-form
           ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
         <!--用户名-->
         <el-form-item prop="username">
           <el-input
               v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
         </el-form-item>
         <!--密码-->
         <el-form-item prop="password">
           <el-input
               v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
         </el-form-item>
         <!-- 验证码 -->
         <el-form-item prop="code">
           <el-row :span="24">
             <el-col :span="12">
               <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" size="" @keyup.enter.native="submitForm('loginForm')"></el-input>
             </el-col>
             <el-col :span="12">
               <div class="login-code" @click="refreshCode">
                 <!--验证码组件-->
                 <s-identify :identifyCode="identifyCode"></s-identify>
               </div>
             </el-col>
           </el-row>
         </el-form-item>
         <!--按钮-->
         <el-form-item class="btns">
           <el-button type="primary" round @click="login">登陆</el-button>
           <el-button type="info" round @click="resetLoginForm">重置</el-button>
         </el-form-item>
       </el-form>
     </div>
  </div>
</template>

<script>
import SIdentify from '../components/SIdentify'
export default {
  name: 'Login',
  components: { SIdentify },
  data () {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
    //  验证码
      identifyCodes: '1234567890',
      identifyCode: '',
      /* 登陆表单绑定对象 */
      loginForm: {
        username: 'xjliu17',
        password: '199809',
        code: ''
      },
      /* 表单验证规则对象 */
      loginFormRules: {
        /* 验证用户名是否合法 */
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ]
      }

    }
  },
  watch: {
    isDebugLogin (v) {
      if (v) {
        this.loginForm.password = '123'
        this.refreshCode()
      }
    },
    identifyCode (v) {
      this.isDebugLogin && (this.loginForm.code = v)
    }
  },
  created () {
    this.refreshCode()
  },
  methods: {
    /* 重置登陆表单 */
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 验证码函数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    /* 表单预验证 */
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        if (this.loginForm.username === 'admin') {
          const { data: res } = await this.$http.post('admin/login', this.qs.stringify(this.loginForm))
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('登陆失败！')
          this.$message.success('登陆成功')
          console.log(res)
          // 将登陆成功之后的taken，保存到客户端的sessionStorage中
          // 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
          // taken 只应在当前网站打开期间生效，所有将taken保存在sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
          // 通过编程式导航跳转到后台主页，路由地址是 /
          this.$router.push('/home')
        } else {
          const { data: res } = await this.$http.post('student/login', this.qs.stringify(this.loginForm))
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('登陆失败！')
          this.$message.success('登陆成功')
          console.log(res)
          // 将登陆成功之后的taken，保存到客户端的sessionStorage中
          // 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
          // taken 只应在当前网站打开期间生效，所有将taken保存在sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
          // 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push('/StudentHome')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 330px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: center;
  }
</style>
