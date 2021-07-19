<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛发布</el-breadcrumb-item>
        <el-breadcrumb-item>竞赛添加</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <!-- 提示区域 -->
        <el-alert title="请完善相应的信息" type="info" center show-icon :closable="false"></el-alert>
        <!-- 步骤条区域 -->
        <el-steps :space="200" :active="+activeIndex" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="竞赛背景"></el-step>
          <el-step title="参赛要求"></el-step>
          <el-step title="赛事图片"></el-step>
          <el-step title="评审规则"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- tab栏区域 -->
        <el-form :model="addCompetitionForm" :rules="addCompetitionFormRules" ref="addCompetitionFormRef" label-width="100px" label-position="top">
          <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="竞赛名称" prop="competition_name">
                <el-input v-model="addCompetitionForm.competition_name"></el-input>
              </el-form-item>
              <el-form-item label="举办院系" prop="competition_department">
                <el-input v-model="addCompetitionForm.competition_department"></el-input>
              </el-form-item>
              <el-form-item label="竞赛分类" prop="competition_type">
                <el-input v-model="addCompetitionForm.competition_type"></el-input>
              </el-form-item>
              <el-form-item label="竞赛类型:" prop="competition_people">
                <!-- options用来指定数据源 -->
                <!-- props用来指定配置对象 -->
                <el-cascader v-model="addCompetitionForm.competition_people" :options="peopleist"
                             :props="{ expandTrigger: 'hover', value: 'id', label: 'name', checkStrictly: true }"
                             @change="addHandleChange" clearable>
                </el-cascader>
              </el-form-item>
              <el-form-item label="人数限制" prop="competition_people_number" placeholder="单人竞赛默认为一人">
                <el-input v-model="addCompetitionForm.competition_people_number" type="number" :disabled="isDisable"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="竞赛背景" name="1">
              <quill-editor v-model="addCompetitionForm.competition_background"></quill-editor>
            </el-tab-pane>
            <el-tab-pane label="参赛要求" name="2">
              <quill-editor v-model="addCompetitionForm.competition_requirement"></quill-editor>
            </el-tab-pane>
            <el-tab-pane label="赛事图片" name="3">
              <el-upload :action="uploadURL" :on-preview="handlePreview"
                         :on-remove="handleRemove" list-type="picture" :on-success="handleSuccess"
                         :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="评审规则" name="4">
              <!-- 富文本编辑器 -->
              <quill-editor v-model="addCompetitionForm.competition_reviewRules">
              </quill-editor>
              <!-- 添加商品的按钮 -->
              <el-button type="primary" class="btnAdd" @click="addCompetition">添加赛事</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </el-card>
      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
        <img :src="previewPath" alt="" class="previewImg"/>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'addCompetition',
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
      addCompetitionForm: {
        competition_name: '',
        competition_department: '信息科学与工程学院',
        competition_type: '',
        competition_people: [],
        competition_people_number: 1,
        // 竞赛背景
        competition_background: '213',
        // 参赛要求
        competition_requirement: '',
        // 赛事评审规则
        competition_reviewRules: ''
      },
      // 上传网址
      uploadURL: 'https://jsonplaceholder.typicode.com/posts/',
      // 临时图片
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      // 竞赛表单验证对象
      addCompetitionFormRules: {
        competition_name: [{ required: true, message: '请输入竞赛名称', trigger: 'blur' }],
        competition_department: [{ required: true, message: '请输入举办院系', trigger: 'blur' }],
        competition_type: [{ required: true, message: '请输入竞赛分类', trigger: 'blur' }],
        competition_people: [{ required: true, message: '请选择竞赛类型', trigger: 'blur' }],
        competition_people_number: [{ required: true, message: '请输入竞赛人数', trigger: 'blur' }]
      },
      // 竞赛类型
      peopleist: [
        { id: 1, name: '个人' },
        { id: 2, name: '团队' }
      ],
      // 竞赛列表
      competitionlist: [
        {
          id: 0,
          name: '无线电定向"猎狐竞赛"',
          competition_background: '无线电测向仪被广泛地应用于军事侦察、天文气象、救援监护和航空定位等领域。本活动是利用手中的测向机运用测向技术接收摩尔斯电码信号寻找自动发射电台的运动，在这个过程中看谁找到的电台多，用的时间少，谁就取得胜利。主要考察参赛者测向技术，耐力与速度，路径决策力与意志品质',
          competition_requirement: '1.比赛项目<br>\n' +
            '                       3.5MHz接力赛<br>\n' +
            '                    2.参赛要求<br>\n' +
            '                    （1）每只比赛队伍应由3名运动员组成，各参赛队可增报一名替补队员，但不可与被替补的队员同时报到并参加竞赛。<br>\n' +
            '                    （2）运动员必须具备短距离无线电测向竞赛的能力 (包括身体、技术和对天气等的适应能力),参赛队及个人对自己的安全负全部责任。以下疾病患者不宜报名参赛：先天性心脏病和风湿性心脏病患者,高血压和脑血管疾病患者，心肌炎和其它心脏病患者，冠状动脉病患者和严重心率不齐者，糖尿病患者，其他不适合运动的疾病患者。<br>\n' +
            '                    （3）参赛队员在比赛之前要先进行无线电测向知识培训，掌握一定的参赛技巧才适合参加比赛。<br>\n' +
            '                    （4）全校范围，在规定时间内，每队利用测向机接收信号，依据信号强弱变化以及信号具体代表电台，在校园内奔跑寻找电台，确定电台方向并到达具体位置，利用打卡器打卡作为找到电台的凭证，尽可能快与多地找到电台。<br>\n' +
            '                    （5）活动过程中，由主办方提供PJ-80测向仪、信号源及打卡器等，参赛队员应爱护提供的仪器。',
          competition_reviewRules: ' 1.本着公开、公平、公正的原则评判比赛结果。<br><br>\n' +
            '\n' +
            '                    2.裁判将根据现场每支队伍打卡所代表寻找的台数与找台时间进行排名，最终成绩将在比赛后予以公布。'
        },
        { id: 1, name: '实践技能提升竞赛AI挑战赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 2, name: '群体时空数据的语义分析', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        {
          id: 3,
          name: '程序设计大赛',
          competition_background: '全国大学生电子设计竞赛有助于高等学校实施素质教育，培养大学生的实践创新意识与基本能力、团队协作的人文精神和理论联系实际的学风；有助于学生工程实践素质的培养、提高学生针对实际问题进行电子设计制作的能力；有助于吸引、鼓励广大青年学生踊跃参加课外科技活动，为优秀人才的脱颖而出创造条件。',
          competition_requirement: '竞赛题目包括“理论设计”和“实际制作”两部分，以电子电路（含模拟和数字电路）设计应用为基础，可以涉及模-数混合电路、单片机、嵌入式系统、DSP、可编程器件、EDA软件、互联网+、大数据、人工智能、超高频及光学红外器件等的应用。除题目特殊要求以外，参赛队的个人计算机、移动式存储介质、开发装置或仿真器等不得带入测试现场（实际制作实物中凡需软件编程的芯片必须事先下载脱机工作）。<br>\n' +
            '\n' +
            '竞赛题目应具有实际意义和应用背景，并考虑到目前教学的基本内容和新技术的应用趋势，对教学内容和课程体系改革和学生今后工作起到一定的引导作用。<br></br>竞赛题目着重考核参赛学生综合运用基础知识进行理论设计的能力、实践创新和独立工作的基本能力、实验综合技能（制作与调试），并鼓励参赛学生发扬团队协作的人文精神。<br>\n' +
            '\n' +
            '竞赛题目在难易程度上，既要考虑使参赛学生能在规定时间内完成基本要求，又能使优秀学生有充分发挥与创新的余地。',
          competition_reviewRules: '本次兰州大学全国大学生电子设计竞赛校赛题目，改编自2019年“TI杯”全国大学生电子设计竞赛F题，要求是设计并且制作纸张计数显示装置，装置可以测量并且显示置于A、B极板之间的纸张数量。主要考核学生的问题分析能力、电路设计能力、单片机应用能力，具有比较高的实践意义。'
        },
        { id: 4, name: '智能制造场景中的物流机器人大赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 5, name: '全国大学生电子设计竞赛校赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 6, name: '中国大学生计算机设计大赛校内选拔赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 7, name: '全国大学生信息安全竞赛兰州大学选拔赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 8, name: 'MODMA比赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' },
        { id: 9, name: 'IET全球英语演讲竞赛兰州大学选拔赛', competition_background: '', competition_requirement: '', competition_reviewRules: '' }
      ]
    }
  },
  created () {
    this.getCid()
  },
  methods: {
    // 传递竞赛id
    getCid () {
      // console.log(this.$route.query.cid)
      const competition = this.competitionlist.find(com => com.id === +this.$route.query.cid)
      console.log(competition)
      this.addCompetitionForm.competition_name = competition.name
      this.addCompetitionForm.competition_background = competition.competition_background
      this.addCompetitionForm.competition_requirement = competition.competition_requirement
      this.addCompetitionForm.competition_reviewRules = competition.competition_reviewRules
    },
    // 控制标签页的切换
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addCompetitionForm.competition_people.length !== 1) {
        this.$message.error('请选择竞赛分类')
        return false
      }
    },
    // 级联选择器选中项变化，会触发这个函数
    addHandleChange () {
      if (this.addCompetitionForm.competition_people[0] === 2) {
        this.isDisable = false
      } else {
        this.isDisable = true
      }
      console.log(this.addCompetitionForm.competition_people)
    },
    // 点击相应的标签页加载相应的数据
    tabClicked () {},
    // 图片预览
    handlePreview (file) {
      console.log(file)
      console.log(file.url + '你好')
      this.previewPath = file.url
      this.previewVisible = true
    },
    // 图片移除
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 图片上传成功
    handleSuccess (response) {
      console.log(response)
      this.$message.success('图片上传成功')
    },
    // 发起请求添加赛事
    addCompetition () {
      console.log(this.addCompetitionForm)
      this.$message.success('已经提交赛事')
    }
  }
}
</script>

<style scoped>
  .previewImg {
    width: 100%;
  }
  .btnAdd {
    margin-top: 15px;
  }
</style>
