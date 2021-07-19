<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>团队管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的团队</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="我的团队" name="first">
          <el-card style="border: none">
            <el-row>
              <el-alert title="我管理的团队" type="success" center :closable="false">
              </el-alert>
            </el-row>
            <el-card v-for="team in MyTeamList" :key="team.teamName">
              <el-row>
                <el-alert :title="team.teamName" type="success" center :closable="false">
                </el-alert>
              </el-row>
              <el-row>
                <el-button type="primary" icon="el-icon-plus" round @click="showAddTeamDialogVisible">添加队员
                </el-button>
                <el-button type="danger" icon="el-icon-delete" round @click="deleteTeam">解散团队
                </el-button>
              </el-row>
              <el-card>
                <el-table :data="team.MyUsers" style="width: 100%" max-height="250" border stripe>
                  <el-table-column fixed prop="snu" label="学号" width="150">
                  </el-table-column>
                  <el-table-column prop="sname" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="scollege" label="学号" width="120">
                  </el-table-column>
                  <el-table-column prop="sclass" label="班级" width="120">
                  </el-table-column>
                  <el-table-column prop="semail" label="邮箱" width="300">
                  </el-table-column>
                  <el-table-column prop="sphone" label="电话号码" width="120">
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="deleteRow(scope.$index, MyUsersList)"
                                 type="text" size="small">
                        移除
                      </el-button>
                      <el-button @click.native.prevent="deleteRow(scope.$index, MyUsersList)"
                                 type="text" size="small">
                        提升为队长
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-card>
          </el-card>
          <el-card style="border: none">
            <el-row>
              <el-alert title="我加入的团队" type="success" center :closable="false">
              </el-alert>
            </el-row>
            <el-table :data="teamList" border stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="teamName" label="团队名称"></el-table-column>
              <el-table-column prop="teamCaptain" label="队长"></el-table-column>
              <el-table-column prop="teamCollege" label="注册学院"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="注册团队" name="second">
          <el-row>
            <el-alert title="团队名称一旦提交将只能联系管理员修改" type="success" center>
            </el-alert>
          </el-row>
          <el-row>
            <el-button type="primary" icon="el-icon-plus" round @click="addTeam">注册团队</el-button>
          </el-row>
          <el-card>
            <el-form :label-position="right" label-width="80px" :model="TeamForm" style="width: 50%">
              <el-form-item label="团队名称">
                <el-input v-model="TeamForm.name"></el-input>
              </el-form-item>
              <el-form-item label="注册学院">
                <el-input v-model="TeamForm.college"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加队员显示框 -->
    <el-dialog title="添加队员" :visible.sync="addTeamDialogVisible" width="50%">
      <span>输入学号或者姓名</span>
      <el-row></el-row>
      <el-form :model="addTeamForm">
        <el-form-item>
          <el-input v-model="addTeamForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addTeamDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTeamClose">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TeamManagement',
  data () {
    return {
      activeName: 'first',
      MyTeamList: [
        {
          teamName: '刘绪俭1队',
          MyUsers: [
            {
              snu: '320170940841',
              sname: '刘绪俭1',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务1',
              stime: '2017',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940842',
              sname: '刘绪俭2',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务2',
              stime: '2016',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940843',
              sname: '刘绪俭3',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务3',
              stime: '2019',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940844',
              sname: '刘绪俭4',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务4',
              stime: '2018',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            }
          ]
        },
        {
          teamName: '刘绪俭2队',
          MyUsers: [
            {
              snu: '320170940841',
              sname: '刘绪俭1',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务1',
              stime: '2017',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940842',
              sname: '刘绪俭2',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务2',
              stime: '2016',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940843',
              sname: '刘绪俭3',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务3',
              stime: '2019',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            },
            {
              snu: '320170940844',
              sname: '刘绪俭4',
              scollege: '信息科学与工程学院',
              sclass: '2017电子商务4',
              stime: '2018',
              semail: '2925906232@qq.com',
              sphone: '17325013945'
            }
          ]
        }
      ],
      teamList: [
        {
          teamName: '刘绪俭1队',
          teamCaptain: '刘绪俭1',
          teamCollege: '信息科学与工程学院'
        },
        {
          teamName: '刘绪俭2队',
          teamCaptain: '刘绪俭2',
          teamCollege: '信息科学与工程学院'
        },
        {
          teamName: '刘绪俭3队',
          teamCaptain: '刘绪俭3',
          teamCollege: '信息科学与工程学院'
        }
      ],
      // 控制显示与隐藏
      addTeamDialogVisible: false,
      addTeamForm: {},
      // 团队对象
      TeamForm: {}
    }
  },
  created () {
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    showAddTeamDialogVisible () {
      this.addTeamDialogVisible = true
    },
    addTeamClose () {
      this.$message.success('添加成功')
      this.addTeamDialogVisible = false
    },
    addTeam () {
      this.$message.success('添加成功')
    },
    deleteTeam () {
      this.$message.success('删除成功')
    }
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>
