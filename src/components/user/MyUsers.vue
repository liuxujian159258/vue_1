<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-card>
            <!-- 搜索学生或者学号 -->
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input placeholder="请输入学号或者姓名" clearable v-model="queryInfo.query">
                  <el-button slot="append" icon="el-icon-search">
                  </el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-download" @click="downloadClick">下载报名表
                </el-button>
              </el-col>
            </el-row>
            <!-- 学生登陆管理 -->
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
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.snu)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.snu)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
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

        <el-tab-pane label="团队管理" name="second">
          <el-card>
            <!-- 搜索团队编号或者名称 -->
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input placeholder="请输入团队编号或者名称" clearable v-model="queryInfo.query">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-download" @click="downloadTeamClick">下载报名表</el-button>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-plus" @click="addTeamClick">添加团队</el-button>
              </el-col>
            </el-row>
            <!-- 团队管理 -->
            <el-table :data="TeamList" border stripe>
              <!-- 展开列 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-row class="ElRow" v-for="teamUser in scope.row.teamUsers" :key="teamUser.snu">
                    <el-col :span="8">
                      <el-tag effect="dark">{{ teamUser.sname }}
                      </el-tag>
                    </el-col>
                    <el-col :span="8">
                      <el-tag type="danger" effect="dark" v-if="teamUser.role === 1">队长
                      </el-tag>
                      <el-tag type="danger" effect="dark" v-else>队员
                      </el-tag>
                    </el-col>
                    <el-col :span="8">
                      <el-tag type="warning" effect="dark">操作</el-tag>
                      <el-button size="small" plain type="warning"  v-if="teamUser.role === 0" @click="teamer">提升为队长</el-button>
                      <el-button size="small" plain type="warning" v-if="teamUser.role === 0" @click="teamer">移出团队</el-button>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index"></el-table-column>
              <el-table-column label="团队名称" prop="teamName"></el-table-column>
              <el-table-column label="参与竞赛" prop="teamCompetition"></el-table-column>
              <el-table-column label="竞赛成绩" prop="teamScore"></el-table-column>
              <el-table-column label="参赛时间" prop="teamTime"></el-table-column>
              <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                  <el-tooltip effect="dark" content="修改团队" placement="top" :enterable="false">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditTeamDialog(scope.row.teamId)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="删除记录" placement="top" :enterable="false">
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeTeamById(scope.row.teamId,scope.row.teamTime)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
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
      <!-- 编辑用户框 -->
      <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible"
        width="50%" @close="editUserDialogClose">
        <el-form ref="editUserFormRef" :model="editUserForm" :rules="editUserFormRules" label-width="70px">
              <el-form-item label="用户名" prop="sname">
            <el-input v-model="editUserForm.sname" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="semail">
            <el-input v-model="editUserForm.semail"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="sphone">
            <el-input v-model="editUserForm.sphone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="editDialogVisible">
    <el-button @click="editUserDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 下载参数框 -->
      <el-dialog title="输入下载参数" :visible.sync="downloadDialogVisible" width="50%"
      @close="downloadDialogClose">
        <el-form ref="downloadFormRef" :model="downloadForm" label-width="70px">
          <el-form-item label="竞赛名称" prop="cname">
            <el-input v-model="downloadForm.cname"></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间" prop="ctime">
            <el-input v-model="downloadForm.ctime" type="number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="downloadDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editdownload">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 编辑团队框 -->
      <el-dialog title="编辑团队" :visible.sync="editTeamDialogVisible"
                 width="50%" @close="editTeamDialogClose">
        <el-form ref="editTeamFormRef" :model="editTeamForm" :rules="editTeamFormRules" label-width="70px">
          <el-form-item label="用户名" prop="teamName">
            <el-input v-model="editTeamForm.teamName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="editDialogVisible">
    <el-button @click="editTeamDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editTeamInfo">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 团队数据下载参数框 -->
      <el-dialog title="输入团队数据下载参数" :visible.sync="downloadTeamDialogVisible" width="50%"
      @close="downloadTeamDialogClose">
        <el-form ref="downloadTeamFormRef" :model="downloadTeamForm" label-width="70px">
          <el-form-item label="竞赛名称" prop="cname">
            <el-input v-model="downloadTeamForm.cname"></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间" prop="ctime">
            <el-input v-model="downloadTeamForm.ctime" type="number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="downloadTeamDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editdownloadTeam">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 添加团队弹窗 -->
      <el-dialog title="输入注册团队所需信息" :visible.sync="addTeamDialogVisible" width="50%"
      @close="addTeamDialogClose">
        <el-form ref="addTeamFormRef" :model="addTeamForm" label-width="70px">
          <el-form-item label="团队名称" prop="teamName">
            <el-input v-model="addTeamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item label="团队成员" prop="teamUsers">
            <el-input v-model="addTeamForm.teamUsers"></el-input>
          </el-form-item>
          <el-form-item label="注册学院" prop="teamCollege">
            <el-input v-model="addTeamForm.teamCollege"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addTeamDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTeam">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'MyUsers',
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
      // 查询参数
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前页面大小
        pagesize: 2
      },
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
      // 修改用户弹窗的隐藏与显示
      editUserDialogVisible: false,
      // 修改用户对象
      editUserForm: {
        sname: '',
        semail: '',
        sphone: ''
      },
      // 修改用户规则对象
      editUserFormRules: {
        semail: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }],
        sphone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }]
      },
      // 下载参数框的显示与隐藏
      downloadDialogVisible: false,
      // 下载参数对象
      downloadForm: {},
      activeName: 'first',
      TeamList: [
        {
          teamId: 1,
          teamName: '刘绪俭1队',
          teamCompetition: '无线电定向"猎狐竞赛"',
          teamScore: 77.1,
          teamTime: 2017,
          teamUsers: [
            {
              snu: '32017094041',
              sname: '刘绪俭1',
              role: 0
            },
            {
              snu: '32017094042',
              sname: '刘绪俭2',
              role: 1
            },
            {
              snu: '32017094043',
              sname: '刘绪俭3',
              role: 0
            }
          ]
        },
        {
          teamId: 2,
          teamName: '刘绪俭2队',
          teamCompetition: '无线电定向"猎狐竞赛"',
          teamScore: 77.2,
          teamTime: 2017,
          teamUsers: [
            {
              snu: '32017094044',
              sname: '刘绪俭21',
              role: 1
            },
            {
              snu: '32017094045',
              sname: '刘绪俭22',
              role: 0
            },
            {
              snu: '32017094046',
              sname: '刘绪俭23',
              role: 0
            }
          ]
        },
        {
          teamId: 3,
          teamName: '刘绪俭3队',
          teamCompetition: '无线电定向"猎狐竞赛"',
          teamScore: 77.3,
          teamTime: 2017,
          teamUsers: [
            {
              snu: '32017094047',
              sname: '刘绪俭31',
              role: 0
            },
            {
              snu: '32017094048',
              sname: '刘绪俭32',
              role: 0
            },
            {
              snu: '32017094049',
              sname: '刘绪俭33',
              role: 1
            }
          ]
        }
      ],
      // 编辑团队弹窗的显示与隐藏
      editTeamDialogVisible: false,
      // 编辑团队对象参数
      editTeamForm: {
        teamName: ''
      },
      // 编辑团队弹窗验证规则
      editTeamFormRules: {
        teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }]
      },
      // 下载团队数据参数弹窗的显示与隐藏
      downloadTeamDialogVisible: false,
      // 下载团队对象
      downloadTeamForm: {},
      // 添加团队的弹窗的显示与隐藏
      addTeamDialogVisible: false,
      // 添加团队对象
      addTeamForm: {
        teamName: '',
        teamUser: '',
        teamCollege: ''
      },
      // 总页数
      total: 0
    }
  },
  created () {
  },
  methods: {
    // 修改框的显示
    showEditDialog (snu) {
      this.editUserForm = this.MyUsersList.find(user => user.snu === snu)
      console.log(this.editUserForm)
      this.editUserDialogVisible = true
    },
    // 用户修改框的关闭
    editUserDialogClose () {
      this.$refs.editUserFormRef.resetFields()
    },
    // 用户数据下载弹窗的关闭
    downloadDialogClose () {
      this.$refs.downloadFormRef.resetFields()
    },
    // 团队修改框的关闭
    editTeamDialogClose () {
      this.$refs.editTeamFormRef.resetFields()
    },
    // 团队数据下载弹窗的关闭
    downloadTeamDialogClose () {
      this.$refs.downloadTeamFormRef.resetFields()
    },
    // 添加团队框的关闭
    addTeamDialogClose () {
      this.$refs.addTeamFormRef.resetFields()
    },
    // 删除框的显示
    async removeUserById (snu) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.$message.success('已经删除')
    },
    // 修改用户确定按钮
    editUserInfo () {
      this.$message.success('修改成功')
      this.editUserDialogVisible = false
    },
    // 修改team的确定按钮
    editTeamInfo () {
      this.$message.success('修改成功')
      this.editTeamDialogVisible = false
    },
    // 下载框的显示
    downloadClick () {
      this.downloadDialogVisible = true
    },
    // 下载参数提交按钮
    editdownload () {
      this.$message.success('下载成功')
      this.downloadDialogVisible = false
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    showEditTeamDialog () {
      this.editTeamDialogVisible = true
    },
    async removeTeamById (teamId, teamTime) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.$message.success('已经删除')
      console.log(teamId + ':' + teamTime)
    },
    editdownloadTeam () {
      this.$message.success('下载成功')
      this.downloadTeamDialogVisible = false
    },
    downloadTeamClick () {
      this.downloadTeamDialogVisible = true
    },
    addTeamClick () {
      this.addTeamDialogVisible = true
    },
    addTeam () {
      this.$message.success('添加团队成功')
      this.addTeamDialogVisible = false
    },
    // 提升为队长按钮
    teamer () {
      this.$message.success(' 提升队长成功')
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
