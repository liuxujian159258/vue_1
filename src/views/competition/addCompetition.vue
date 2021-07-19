<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛添加</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <!-- 提示区域 -->
        <el-alert
            type="info"
            center
            show-icon
            :closable="false">
          <span style="font-size: 20px;">
                    请完善相应的信息
                </span>
        </el-alert>
        <!-- 步骤条区域 -->
        <el-steps
            :space="200"
            :active="+activeIndex"
            finish-status="success"
            align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="竞赛详情"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- tab栏区域 -->
        <el-form
            :model="addOrEditCompetitionForm"
            :rules="addCompetitionFormRules"
            ref="addCompetitionFormRef"
            label-width="100px"
            label-position="top">
          <el-tabs
              :tab-position="'left'"
              v-model="activeIndex"
              :before-leave="beforeTabLeave"
              @tab-click="tabClicked">
            <!-- 信息信息区域 -->
            <el-tab-pane
                label="基本信息" name="0">
              <el-form-item
                  label="竞赛名称" prop="competitionName">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionName"></el-input>
              </el-form-item>
              <el-form-item
                  label="举办院系" prop="competitionDepartment">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionDepartment"></el-input>
              </el-form-item>
              <el-form-item
                  label="竞赛类型:" prop="competitionType">
                <!-- options用来指定数据源 -->
                <!-- props用来指定配置对象 -->
                <el-cascader
                    v-model="addOrEditCompetitionForm.competitionType"
                    :options="peoplelist"
                    :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false, checkStrictly: true }"
                    @change="addHandleChange" clearable>
                </el-cascader>
              </el-form-item>
              <el-form-item
                  label="人数限制"
                  prop="competitionPeople" placeholder="单人竞赛默认为一人">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionPeople"
                    type="number"
                    :disabled="isDisable"></el-input>
              </el-form-item>
            </el-tab-pane>
            <!-- 竞赛html -->
            <el-tab-pane
                label="竞赛详情" name="1">
              <editor-bar
                  v-model="addOrEditCompetitionForm.competitionHtml"
                  :isClear="isClear"
                  @change="change"></editor-bar>
              <!-- 竞赛提交 -->
            </el-tab-pane>
            <el-tab-pane
                label="竞赛提交" name="2">
              <el-form-item label="竞赛名称">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionName" :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item label="举办院系">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionDepartment" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="竞赛类型:">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionType" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="人数限制" placeholder="单人竞赛默认为一人">
                <el-input
                    v-model="addOrEditCompetitionForm.competitionPeople" type="number" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="竞赛详情">
                <div
                    class="ql-editor" v-html="addOrEditCompetitionForm.competitionHtml"></div>
              </el-form-item>
              <p style="text-align:center">
                <el-button
                    type="primary" round @click="submitUpload">
                  提交数据
                </el-button>
              </p>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
      <!-- 图片预览 -->
      <el-dialog
          title="图片预览" :visible.sync="previewVisible" width="50%">
        <img :src="previewPath" alt="" class="previewImg"/>
      </el-dialog>
    </div>
</template>

<script>
import EditorBar from '../wangEnduit/editoritem'
export default {
  name: 'addCompetition',
  components: { EditorBar },
  data () {
    return {
      // 步骤条与tab栏绑定
      activeIndex: '0',
      // 图片预览弹窗
      previewVisible: false,
      // 预览图片地址
      previewPath: '',
      // 竞赛人数是否可以输入
      isDisable: true,
      // 竞赛表单对象
      addOrEditCompetitionForm: {
        competitionId: null,
        competitionName: '',
        competitionDepartment: '信息科学与工程学院',
        competitionType: 1,
        competitionPeople: 1,
        competitionHtml: '',
        // 删除标志位
        isDelete: 0
      },
      // 上传网址
      uploadURL: 'http://localhost:8090/admin/test',
      // 文件列表
      fileList: [],
      // 竞赛表单验证对象
      addCompetitionFormRules: {
        competitionName: [{ required: true, message: '请输入竞赛名称', trigger: 'blur' }],
        competitionDepartment: [{ required: true, message: '请输入举办院系', trigger: 'blur' }],
        competitionType: [{ required: true, message: '请选择竞赛类型', trigger: 'blur' }],
        competitionPeople: [{ required: true, message: '请输入竞赛人数', trigger: 'blur' }]
      },
      // 竞赛类型
      peoplelist: [
        { id: 1, name: '个人' },
        { id: 2, name: '团队' }
      ],
      // 竞赛编号对象
      competitionId: {
        competitionId: null
      },
      // 获取竞赛对象中间对象
      addOrEditCompetitionFormL: {},
      isClear: false,
      detail: '变化'
    }
  },
  created () {
    this.getCompetitionById()
  },
  methods: {
    // 传递竞赛id并且从后台获取详细竞赛数据
    async getCompetitionById () {
      // console.log(this.$route.query.cid)
      if (this.$route.query.competitionId === null || typeof this.$route.query.competitionId === 'undefined') return
      this.competitionId.competitionId = this.$route.query.competitionId
      const { data: res } = await this.$http.get('admin/competitions/competitionId', { params: this.competitionId })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.addOrEditCompetitionFormL = res.data.competitions
      this.addOrEditCompetitionForm.competitionId = this.addOrEditCompetitionFormL.competitionId
      this.addOrEditCompetitionForm.competitionName = this.addOrEditCompetitionFormL.competitionName
      this.addOrEditCompetitionForm.competitionDepartment = this.addOrEditCompetitionFormL.competitionDepartment
      this.addOrEditCompetitionForm.competitionType = this.addOrEditCompetitionFormL.competitionType + 1
      this.addOrEditCompetitionForm.competitionPeople = this.addOrEditCompetitionFormL.competitionPeople
      this.addOrEditCompetitionForm.competitionHtml = this.addOrEditCompetitionFormL.competitionHtml
      if (this.addOrEditCompetitionForm.competitionType === 2) {
        this.isDisable = false
      }
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 控制标签页的切换
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addOrEditCompetitionForm.competitionType === null) {
        this.$message.error('请选择竞赛分类')
        return false
      }
    },
    // 级联选择器选中项变化，会触发这个函数
    addHandleChange () {
      // 竞赛类型为团队
      if (this.addOrEditCompetitionForm.competitionType === 2) {
        this.isDisable = false
      } else {
        // 竞赛类型为个人，禁止修改且竞赛人数改为1
        this.isDisable = true
        this.addOrEditCompetitionForm.competitionPeople = 1
      }
      console.log(this.addOrEditCompetitionForm)
    },
    // 点击相应的标签页加载相应的数据
    tabClicked () {},
    // 图片移除
    handleRemove (file, fileList) {
      this.fileList = fileList
      console.log(file, fileList)
    },
    // 文件状态关闭函数
    handleChange (file, fileList) {
      this.fileList = fileList
    },
    // 上传到服务器
    submitUpload () {
      if (this.addOrEditCompetitionForm.competitionId === null || this.addOrEditCompetitionForm === '') {
        this.$refs.addCompetitionFormRef.validate(async valid => {
          if (!valid) return
          this.addOrEditCompetitionForm.competitionType = this.addOrEditCompetitionForm.competitionType - 1
          console.log(this.addOrEditCompetitionForm)
          const { data: res } = await this.$http.post('admin/competitions', this.qs.stringify(this.addOrEditCompetitionForm))
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
        })
      } else {
        this.$refs.addCompetitionFormRef.validate(async valid => {
          if (!valid) return
          this.addOrEditCompetitionForm.competitionType = this.addOrEditCompetitionForm.competitionType - 1
          console.log(this.addOrEditCompetitionForm)
          const { data: res } = await this.$http.put('admin/competitions', this.qs.stringify(this.addOrEditCompetitionForm))
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
        })
      }
      this.$router.push('browseCompetition')
    },
    // 发起请求添加赛事
    addCompetition () {
      console.log(this.addOrEditCompetitionForm)
      this.$message.success('已经提交赛事')
    },
    change (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
  .previewImg {
    width: 100%;
  }
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
