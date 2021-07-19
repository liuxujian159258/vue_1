<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>学生登陆报名界面</el-breadcrumb-item>
        <el-breadcrumb-item>成绩查看</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="单人竞赛" name="first">
          <el-table :data="MyUsersList" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row class="ElRow" v-for="competition in scope.row.competitions" :key="competition.id">
                  <el-col :span="12">
                    <el-tag effect="dark">{{ competition.name }}
                    </el-tag>
                  </el-col>
                  <el-col :span="12">
                    <el-tag type="danger" effect="dark">{{ competition.score }}
                    </el-tag>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="学号" prop="snu"></el-table-column>
            <el-table-column label="姓名" prop="sname"></el-table-column>
            <el-table-column label="学院" prop="scollege"></el-table-column>
            <el-table-column label="班级" prop="sclass"></el-table-column>
            <el-table-column label="参赛时间" prop="stime"></el-table-column>
          </el-table>
          </el-tab-pane>
          <el-tab-pane label="团队竞赛" name="second">
            <el-table :data="teamList" border stripe>
              <!-- 展开列 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-row class="ElRow" v-for="competition in scope.row.competitions" :key="competition.id">
                    <el-col :span="12">
                      <el-tag effect="dark">{{ competition.name }}
                      </el-tag>
                    </el-col>
                    <el-col :span="12">
                      <el-tag type="danger" effect="dark">{{ competition.score }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"></el-table-column>
              <el-table-column label="队长" prop="teamCaptain"></el-table-column>
              <el-table-column label="团队注册学院" prop="teamCollege"></el-table-column>
              <el-table-column label="竞赛时间" prop="teamTime"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'StudentScore',
  data () {
    return {
      // 用户列表
      MyUsersList: [
        {
          snu: '320170940841',
          sname: '刘绪俭1',
          scollege: '信息科学与工程学院',
          sclass: '2017电子商务1',
          stime: '2017',
          semail: '2925906232@qq.com',
          sphone: '17325013945',
          competitions: [
            { id: 0, name: '无线电定向"猎狐竞赛"', score: 10 },
            { id: 1, name: '实践技能提升竞赛AI挑战赛', score: 35 },
            { id: 2, name: '群体时空数据的语义分析', score: 45 },
            { id: 3, name: '程序设计大赛', score: 89 }]
        },
        {
          snu: '320170940842',
          sname: '刘绪俭2',
          scollege: '信息科学与工程学院',
          sclass: '2017电子商务2',
          stime: '2016',
          semail: '2925906232@qq.com',
          sphone: '17325013945',
          competitions: [
            { id: 0, name: '无线电定向"猎狐竞赛"', score: 90 },
            { id: 1, name: '实践技能提升竞赛AI挑战赛', score: 80 },
            { id: 2, name: '群体时空数据的语义分析', score: 68 }
          ]
        },
        {
          snu: '320170940843',
          sname: '刘绪俭3',
          scollege: '信息科学与工程学院',
          sclass: '2017电子商务3',
          stime: '2019',
          semail: '2925906232@qq.com',
          sphone: '17325013945',
          competitions: [
            { id: 7, name: '全国大学生信息安全竞赛兰州大学选拔赛', score: 77 },
            { id: 8, name: 'MODMA比赛', score: 55 },
            { id: 9, name: 'IET全球英语演讲竞赛兰州大学选拔赛', score: 45 }
          ]
        },
        {
          snu: '320170940844',
          sname: '刘绪俭4',
          scollege: '信息科学与工程学院',
          sclass: '2017电子商务4',
          stime: '2018',
          semail: '2925906232@qq.com',
          sphone: '17325013945',
          competitions: [
            { id: 3, name: '程序设计大赛', score: 44 },
            { id: 4, name: '智能制造场景中的物流机器人大赛', score: 66 },
            { id: 5, name: '全国大学生电子设计竞赛校赛', score: 65 },
            { id: 6, name: '中国大学生计算机设计大赛校内选拔赛', score: 77 }
          ]
        }
      ],
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
      activeName: 'first'
    }
  },
  created () {
  },
  methods: {}
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
