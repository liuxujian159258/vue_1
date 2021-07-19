<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布成绩</el-breadcrumb-item>
        <el-breadcrumb-item>添加成绩</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs type="border-card" v-model="activeName">
          <!-- 用户个人成绩 -->
          <el-tab-pane label="个人成绩" name="first">
            <el-card>
              <!-- 搜索学生或者学号 -->
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input placeholder="请输入学号或者姓名" clearable v-model="queryInfo.query">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <el-cascader placeholder="输入或者选择竞赛项目" :options="competitionlist" v-model="competitionselect"
                               filterable
                               :props="{ expandTrigger: 'hover', value: 'id', label: 'name', checkStrictly: true }"
                               @change="addHandleChange" clearable>
                  </el-cascader>
                </el-col>
                <el-col :span="5">
                  <el-cascader v-model="selectTime" placeholder="输入或者选择竞赛时间" :options="timelist" filterable
                               :props="{ expandTrigger: 'hover',value: 'id', label: 'name', checkStrictly: true }"
                               @change="addHandleChange" clearable>
                  </el-cascader>
                </el-col>
              </el-row>
              <!-- 学生竞赛详细信息 -->
              <el-table :data="scorelist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="学号" prop="snu"></el-table-column>
                <el-table-column label="姓名" prop="sname"></el-table-column>
                <el-table-column label="学院" prop="scollege"></el-table-column>
                <el-table-column label="班级" prop="sclass"></el-table-column>
                <el-table-column label="竞赛项目" prop="scompetition"></el-table-column>
                <el-table-column label="竞赛成绩" prop="sscore">
                  <template slot-scope="scope">
                    <el-input :placeholder="scope.row.sscore" v-model="scope.row.sscore">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" content="提交成绩" placement="top" :enterable="false">
                      <!-- 修改按钮 -->
                      <el-button type="primary" icon="el-icon-plus" size="mini"
                                 @click="addScore(scope.row.snu)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="修改成绩" placement="top" :enterable="false">
                      <!-- 删除按钮 -->
                      <el-button type="danger" icon="el-icon-edit" size="mini"
                                 @click="addScore(scope.row.snu)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="发送邮件" placement="top" :enterable="false">
                      <!-- 删除按钮 -->
                      <el-button type="warning" icon="el-icon-message" size="mini"
                                 @click="sendEmail(scope.row.snu)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="竞赛时间" prop="stime"></el-table-column>
              </el-table>
              <!-- 分页区域 -->
              <!-- 分页区域 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </el-card>
          </el-tab-pane>
          <!-- 团队成绩 -->
          <el-tab-pane label="团队成绩" name="second">
            <el-card>
              <!-- 搜索学生或者学号 -->
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-input placeholder="请输入团队编号或者名称" clearable v-model="queryInfo.query">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <el-cascader placeholder="输入或者选择竞赛项目" :options="competitionlist" v-model="competitionselect"
                               filterable
                               :props="{ expandTrigger: 'hover', value: 'id', label: 'name', checkStrictly: true }"
                               @change="addHandleChange" clearable>
                  </el-cascader>
                </el-col>
                <el-col :span="5">
                  <el-cascader v-model="selectTime" placeholder="输入或者选择竞赛时间" :options="timelist" filterable
                               :props="{ expandTrigger: 'hover',value: 'id', label: 'name', checkStrictly: true }"
                               @change="addHandleChange" clearable>
                  </el-cascader>
                </el-col>
              </el-row>
              <!-- 团队竞赛详细信息 -->
              <el-table :data="scorelist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="团队编号" prop="snu"></el-table-column>
                <el-table-column label="团队名称" prop="sname"></el-table-column>
                <el-table-column label="队长" prop="scollege"></el-table-column>
                <el-table-column label="注册学院" prop="sclass"></el-table-column>
                <el-table-column label="竞赛项目" prop="scompetition"></el-table-column>
                <el-table-column label="竞赛成绩" prop="sscore">
                  <template slot-scope="scope">
                    <el-input :placeholder="scope.row.sscore" v-model="scope.row.sscore">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                  <template slot-scope="scope">
                    <el-tooltip effect="dark" content="提交成绩" placement="top" :enterable="false">
                      <!-- 修改按钮 -->
                      <el-button type="primary" icon="el-icon-plus" size="mini"
                                 @click="addScore(scope.row.snu)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="修改成绩" placement="top" :enterable="false">
                      <!-- 删除按钮 -->
                      <el-button type="danger" icon="el-icon-edit" size="mini"
                                 @click="addScore(scope.row.snu)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="发送邮件" placement="top" :enterable="false">
                      <!-- 删除按钮 -->
                      <el-button type="warning" icon="el-icon-message" size="mini"
                                 @click="sendEmail(scope.row.snu)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="竞赛时间" prop="stime"></el-table-column>
              </el-table>
              <!-- 分页区域 -->
              <!-- 分页区域 -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'addScore',
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
      // 竞赛成绩列表
      scorelist: [
        { snu: '320170940841', sname: '刘绪俭1', scollege: '信息科学与工程学院', sclass: '2017电子商务1', scompetition: '无线电定向"猎狐竞赛"', sscore: 0, stime: 2017 },
        { snu: '320170940842', sname: '刘绪俭2', scollege: '信息科学与工程学院', sclass: '2017电子商务2', scompetition: '实践技能提升竞赛AI挑战赛', sscore: 1, stime: 2018 },
        { snu: '320170940843', sname: '刘绪俭3', scollege: '信息科学与工程学院', sclass: '2017电子商务3', scompetition: '群体时空数据的语义分析', sscore: 2, stime: 2017 },
        { snu: '320170940844', sname: '刘绪俭4', scollege: '信息科学与工程学院', sclass: '2017电子商务4', scompetition: '程序设计大赛', sscore: 3, stime: 2017 },
        { snu: '320170940845', sname: '刘绪俭5', scollege: '信息科学与工程学院', sclass: '2017电子商务5', scompetition: '智能制造场景中的物流机器人大赛', sscore: 4, stime: 2017 },
        { snu: '320170940846', sname: '刘绪俭6', scollege: '信息科学与工程学院', sclass: '2017电子商务6', scompetition: '全国大学生电子设计竞赛校赛', sscore: 34, stime: 2017 },
        { snu: '320170940847', sname: '刘绪俭7', scollege: '信息科学与工程学院', sclass: '2017电子商务7', scompetition: '中国大学生计算机设计大赛校内选拔赛', sscore: 34, stime: 2017 },
        { snu: '320170940848', sname: '刘绪俭8', scollege: '信息科学与工程学院', sclass: '2017电子商务8', scompetition: 'IET全球英语演讲竞赛兰州大学选拔赛', sscore: 23, stime: 2017 }
      ],
      // 查询参数
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前页面大小
        pagesize: 2
      },
      // 竞赛选择
      competitionselect: [],
      // 团队成绩
      teamList: [
        {
          teamName: '刘绪俭1队',
          teamCaptain: '刘绪俭1',
          teamCollege: '信息科学与工程学院',
          teamTime: 2018,
          competitions: [
            { id: 0, name: '无线电定向"猎狐竞赛"', score: 10 },
            { id: 1, name: '实践技能提升竞赛AI挑战赛', score: 35 },
            { id: 2, name: '群体时空数据的语义分析', score: 45 },
            { id: 3, name: '程序设计大赛', score: 89 }]
        },
        {
          teamName: '刘绪俭2队',
          teamCaptain: '刘绪俭2',
          teamCollege: '信息科学与工程学院',
          teamTime: 2019,
          competitions: [
            { id: 0, name: '无线电定向"猎狐竞赛"', score: 10 },
            { id: 1, name: '实践技能提升竞赛AI挑战赛', score: 35 },
            { id: 2, name: '群体时空数据的语义分析', score: 45 },
            { id: 3, name: '程序设计大赛', score: 89 }]
        }
      ],
      activeName: 'first',
      // 总页数
      total: 0,
      timelist: [
        { id: 2017, name: '第30届' },
        { id: 2018, name: '第31届' },
        { id: 2019, name: '第32届' },
        { id: 2020, name: '第33届' }
      ],
      // 时间选择
      selectTime: []
    }
  },
  created () {
  },
  methods: {
    // 项目选择发生变化
    addHandleChange () {
    },
    // 添加或者修改成绩
    addScore (snu) {
      this.$message.success(snu)
    },
    // 发送邮件
    sendEmail (sun) {
      this.$message.success(sun)
    },
    // 监听pagesize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页面值改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
  .ElRow {
    border-top: 1px solid #eeeeee;
  }
  .el-tag {
    margin: 7px;
  }
</style>
