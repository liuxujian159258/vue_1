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
      <el-tabs
          v-model="activeName" @tab-click="handleClick">

        <!-- 学生用户管理 -->
        <el-tab-pane label="学生用户管理" name="fifth">
          <!-- 搜索学生或者学号 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
                  placeholder="请输入学号或者姓名"
                  clearable
                  v-model="studentInformationQueryInfo.query"
                  @clear="getStudentInformationList">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getStudentInformationList">
                </el-button>
              </el-input>
            </el-col>
          </el-row>
          <!-- 学生用户列表 -->
          <el-table :data="studentInformationList" stripe>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="学号" prop="studentNumber"></el-table-column>
            <el-table-column label="姓名" prop="studentName"></el-table-column>
            <el-table-column label="性别" prop="studentSex">
              <template slot-scope="scope">
                <span v-if="scope.row.studentSex == 2">女</span>
                <span v-else>男</span>
              </template>
            </el-table-column>
            <el-table-column label="学院" prop="studentCollege"></el-table-column>
            <el-table-column label="年级" prop="studentGrade"></el-table-column>
            <el-table-column label="班级" prop="studentClass"></el-table-column>
            <el-table-column label="邮箱" prop="studentEmail"></el-table-column>
            <el-table-column label="手机号码" prop="studentPhone"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
                  <!-- 修改按钮 -->
                  <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showStudentInformatitionEditDialog(scope.row.studentNumber)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
                  <!-- 删除按钮 -->
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeUserById(scope.row.studentNumber)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleStudentInformationSizeChange"
            @current-change="handleStudentInformationCurrentChange"
            :current-page="studentInformationQueryInfo.pageNum"
            :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
            :page-size="studentInformationQueryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="studentInformationTotal">
          </el-pagination>
        </el-tab-pane>

        <!-- 学生用户竞赛管理 -->
        <el-tab-pane label="学生用户竞赛管理" name="first">
          <!-- 搜索学生或者学号 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
                  placeholder="请输入学号或者姓名"
                  clearable v-model="queryInfo.query"
                  @clear="getStudentList">
                <el-button
                    slot="append" icon="el-icon-search" @click="getStudentList">
                </el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                  icon="el-icon-download" @click="downloadClick">
                下载报名表</el-button>
            </el-col>
          </el-row>
          <!-- 学生用户列表 -->
          <el-table :data="studentList" stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                    class="ElRow" v-for="competition in scope.row.competitions"
                    :key="competition.id">
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">{{ competition.competitionId }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">{{ competition.competitionName }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">{{ competition.studentScore }}</el-tag>
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="danger" effect="dark">{{ competition.studentTime }}</el-tag>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="学号" prop="studentNumber"></el-table-column>
            <el-table-column label="姓名" prop="studentName"></el-table-column>
            <el-table-column label="性别" prop="studentSex">
              <template slot-scope="scope">
                <span v-if="scope.row.studentSex == 2">女</span>
                <span v-else>男</span>
              </template>
            </el-table-column>
            <el-table-column label="学院" prop="studentCollege"></el-table-column>
            <el-table-column label="年级" prop="studentGrade"></el-table-column>
            <el-table-column label="班级" prop="studentClass"></el-table-column>
            <el-table-column label="邮箱" prop="studentEmail"></el-table-column>
            <el-table-column label="手机号码" prop="studentPhone"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
                  <!-- 修改按钮 -->
                  <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showEditDialog(scope.row.studentNumber)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
                  <!-- 删除按钮 -->
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeUserById(scope.row.studentNumber)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>

        <!-- 团队管理 -->
        <el-tab-pane label="报名竞赛团队管理" name="second">
          <!-- 搜索团队编号或者名称 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
                  placeholder="请输入团队编号或者名称"
                  clearable v-model="teamQueryInfo.query"
                  @clear="getTeamList">
                <el-button
                    slot="append" icon="el-icon-search" @click="getTeamList"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                  icon="el-icon-download" @click="downloadTeamClick">下载报名表</el-button>
            </el-col>
            <el-col :span="4">
              <el-button
                  icon="el-icon-plus" @click="addTeamClick">添加团队</el-button>
            </el-col>
          </el-row>
          <!-- 团队列表 -->
          <el-table :data="teamList" stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                    class="ElRow"
                    v-for="teamStudent in scope.row.teamStudents"
                    :key="teamStudent.studentNumber">
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentNumber }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentName }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        type="danger" effect="dark" v-if="teamStudent.isCaptain === 1">队长</el-tag>
                    <el-tag
                        type="danger" effect="dark" v-else>队员</el-tag>
                  </el-col>
                  <el-col :span="12">
                    <el-tag type="warning" effect="dark">操作</el-tag>
                    <el-button
                        size="small"
                        plain type="warning"
                        v-if="teamStudent.isCaptain === 0"
                        @click="updateCaptain(scope.row.teamId, teamStudent.studentNumber)">
                      提升为队长</el-button>
                    <el-button
                        size="small"
                        plain
                        type="warning"
                        v-if="teamStudent.isCaptain === 0"
                        @click="removeStudent(scope.row.teamId, teamStudent.studentNumber)">
                      移出团队</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="团队编号" prop="teamId"></el-table-column>
            <el-table-column label="团队名称" prop="teamName"></el-table-column>
            <el-table-column label="团队注册学院" prop="teamCollege"></el-table-column>
            <el-table-column label="竞赛编号" prop="competitionId"></el-table-column>
            <el-table-column label="竞赛名称" prop="competitionName"></el-table-column>
            <el-table-column label="参赛时间" prop="teamTime"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="修改团队" placement="top" :enterable="false">
                  <!-- 修改按钮 -->
                  <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showEditTeamDialog(scope.row.teamId)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除团队" placement="top" :enterable="false">
                  <!-- 删除按钮 -->
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeTeamById(scope.row.teamId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleTeamSizeChange"
            @current-change="handleTeamCurrentChange"
            :current-page="teamQueryInfo.pageNum"
            :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
            :page-size="teamQueryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="teamTotal">
          </el-pagination>
        </el-tab-pane>

        <!-- 未报名竞赛团队管理 -->
        <el-tab-pane label="未报名竞赛团队管理" name="third">
          <!-- 搜索团队编号或者名称 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
                  placeholder="请输入团队编号或者名称"
                  clearable
                  v-model="notSignUpTeamQueryInfo.query"
                  @clear="getNotSignUpTeamList">
                <el-button
                    slot="append" icon="el-icon-search" @click="getNotSignUpTeamList"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <!-- 团队列表 -->
          <el-table :data="notSignUpTeamList" stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                    class="ElRow"
                    v-for="teamStudent in scope.row.teamStudents"
                    :key="teamStudent.studentNumber">
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentNumber }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentName }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        type="danger" effect="dark" v-if="teamStudent.isCaptain === 1">队长</el-tag>
                    <el-tag
                        type="danger" effect="dark" v-else>队员</el-tag>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="团队编号" prop="teamId"></el-table-column>
            <el-table-column label="团队名称" prop="teamName"></el-table-column>
            <el-table-column label="团队注册学院" prop="teamCollege"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="永久删除团队" placement="top" :enterable="false">
                  <!-- 删除按钮 -->
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeNotSignUpTeamById(scope.row.teamId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleNotSignUpTeamSizeChange"
            @current-change="handleNotSignUpTeamCurrentChange"
            :current-page="notSignUpTeamQueryInfo.pageNum"
            :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
            :page-size="notSignUpTeamQueryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="notSignUpTeamTotal">
          </el-pagination>
        </el-tab-pane>

        <!-- 已删除竞赛团队管理 -->
        <el-tab-pane label="已删除竞赛团队管理" name="fourth">
          <!-- 搜索团队编号或者名称 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
                  placeholder="请输入团队编号或者名称"
                  clearable v-model="deleteTeamQueryInfo.query"
                  @clear="getDeleteTeamList">
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getDeleteTeamList"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <!-- 团队列表 -->
          <el-table :data="deleteTeamList" stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row
                    class="ElRow"
                    v-for="teamStudent in scope.row.teamStudents"
                    :key="teamStudent.studentNumber">
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentNumber }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        effect="dark">{{ teamStudent.studentName }}</el-tag>
                  </el-col>
                  <el-col :span="4">
                    <el-tag
                        type="danger" effect="dark" v-if="teamStudent.isCaptain === 1">队长</el-tag>
                    <el-tag
                        type="danger" effect="dark" v-else>队员</el-tag>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="团队编号" prop="teamId"></el-table-column>
            <el-table-column label="团队名称" prop="teamName"></el-table-column>
            <el-table-column label="团队注册学院" prop="teamCollege"></el-table-column>
            <el-table-column label="竞赛编号" prop="competitionId"></el-table-column>
            <el-table-column label="竞赛名称" prop="competitionName"></el-table-column>
            <el-table-column label="参赛时间" prop="teamTime"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="恢复团队" placement="top" :enterable="false">
                  <!-- 修改按钮 -->
                  <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="cancelDeleteTeam(scope.row.teamId)"></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="永久删除团队" placement="top" :enterable="false">
                  <!-- 删除按钮 -->
                  <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="removeDeleteTeamById(scope.row.teamId)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
              @size-change="handleDeleteTeamSizeChange"
              @current-change="handleDeleteTeamCurrentChange"
              :current-page="deleteTeamQueryInfo.pageNum"
              :page-sizes="[2, 5, 10, 20, 100, 1000, 10000]"
              :page-size="deleteTeamQueryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="deleteTeamTotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      </el-card>

      <!-- 编辑用户框 -->
      <el-dialog title="编辑用户"
                 :visible.sync="editStudentDialogVisible"
                  width="50%"
                 @close="editStudentDialogClose"
                 center>
        <el-form
            ref="editStudentFormRef"
            :model="editStudentForm"
            :rules="editStudentFormRules"
            label-width="100px">
          <el-form-item
              label="用户名" prop="studentName">
            <el-input
                v-model="editStudentForm.studentName" disabled></el-input>
          </el-form-item>
          <el-form-item
              label="用户邮箱" prop="studentEmail">
            <el-input
                v-model="editStudentForm.studentEmail"></el-input>
          </el-form-item>
          <el-form-item
              label="用户手机" prop="studentPhone">
            <el-input
                v-model="editStudentForm.studentPhone"></el-input>
          </el-form-item>
        </el-form>
        <span
            slot="footer" class="editDialogVisible">
    <el-button
        @click="editStudentDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="editStudentInfo">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 下载参数框 -->
      <el-dialog
          title="输入下载参数"
          :visible.sync="downloadDialogVisible"
          width="50%"
          @close="downloadDialogClose">
        <el-form ref="downloadFormRef" :model="downloadForm" label-width="70px">
          <el-form-item
              label="竞赛名称" prop="competitionName">
            <el-input
                v-model="downloadForm.competitionName"></el-input>
          </el-form-item>
          <el-form-item
              label="竞赛时间" prop="studentTime">
            <el-input
                v-model="downloadForm.studentTime" type="number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button
        @click="downloadDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="editDownload">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 编辑团队框 -->
      <el-dialog
          title="编辑团队"
          :visible.sync="editTeamDialogVisible"
          width="50%"
          @close="editTeamDialogClose"
          center>
        <el-form
            ref="editTeamFormRef"
            :model="editTeamForm"
            :rules="editTeamFormRules"
            label-width="110px">
          <el-form-item
              label="团队名称" prop="teamName">
            <el-input
                v-model="editTeamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item
              label="团队注册学院" prop="teamCollege">
            <el-input
                v-model="editTeamForm.teamCollege"></el-input>
          </el-form-item>
        </el-form>
        <span
            slot="footer" class="editDialogVisible">
    <el-button
        @click="editTeamDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="editTeamInfo">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 团队数据下载参数框 -->
      <el-dialog
          title="输入团队数据下载参数"
          :visible.sync="downloadTeamDialogVisible"
          width="50%"
          @close="downloadTeamDialogClose">
        <el-form
            ref="downloadTeamFormRef" :model="downloadTeamForm" label-width="70px">
          <el-form-item
              label="竞赛名称" prop="competitionName">
            <el-input
                v-model="downloadTeamForm.competitionName"></el-input>
          </el-form-item>
          <el-form-item
              label="竞赛时间" prop="teamTime">
            <el-input
                v-model="downloadTeamForm.teamTime" type="number"></el-input>
          </el-form-item>
        </el-form>
        <span
            slot="footer" class="dialog-footer">
    <el-button
        @click="downloadTeamDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="editDownloadTeam">确 定</el-button>
  </span>
      </el-dialog>
      <!-- 添加团队弹窗 -->
      <el-dialog
          title="输入注册团队所需信息"
          :visible.sync="addTeamDialogVisible"
          width="50%"
          @close="addTeamDialogClose">
        <el-form
            ref="addTeamFormRef"
            :model="addTeamForm"
            :rules="addTeamFormRules"
            label-width="110px">
          <el-form-item
              label="团队名称" prop="teamName">
            <el-input
                v-model="addTeamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item
              label="团队成员" prop="teamStudent">
            <el-input
                v-model="addTeamForm.teamStudent"></el-input>
          </el-form-item>
          <el-form-item
              label="团队注册学院" prop="teamCollege">
            <el-input
                v-model="addTeamForm.teamCollege"></el-input>
          </el-form-item>
        </el-form>
        <span
            slot="footer" class="dialog-footer">
    <el-button
        @click="addTeamDialogVisible = false">取 消</el-button>
    <el-button
        type="primary" @click="addTeam">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
import Papa from 'papaparse'
export default {
  name: 'MyUsers',
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
      // 查询参数
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前页面大小
        pageSize: 2
      },
      // 所有用户重新参数
      studentInformationQueryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前页面大小
        pageSize: 2
      },
      // 报名团队查询参数
      teamQueryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前页面大小
        pageSize: 2
      },
      // 未报名竞赛团队查询参数
      notSignUpTeamQueryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前页面大小
        pageSize: 2
      },
      // 已删除竞赛团队查询参数
      deleteTeamQueryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前页面大小
        pageSize: 2
      },
      // 修改用户弹窗的隐藏与显示
      editStudentDialogVisible: false,
      // 修改用户对象
      editStudentForm: {
        studentName: '',
        studentEmail: '',
        studentPhone: ''
      },
      // 修改用户规则对象
      editStudentFormRules: {
        studentEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }],
        studentPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }]
      },
      // 下载参数框的显示与隐藏
      downloadDialogVisible: false,
      // 下载参数对象
      downloadForm: {
        competitionName: '',
        studentTime: null
      },
      // tab显示对象
      activeName: 'fifth',
      // 编辑团队弹窗的显示与隐藏
      editTeamDialogVisible: false,
      // 编辑团队对象参数
      editTeamForm: {
        teamId: null,
        teamName: '',
        teamCollege: ''
      },
      // 编辑团队弹窗验证规则
      editTeamFormRules: {
        teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        teamCollege: [{ required: true, message: '请输入团队注册学院', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }]
      },
      // 团队添加注册弹窗验证规则
      addTeamFormRules: {
        teamName: [{ required: true, message: '请输入团队名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        teamCollege: [{ required: true, message: '请输入团队注册学院', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        teamStudent: [{ required: true, message: '请输入团队成员', trigger: 'blur' }]
      },
      // 下载团队数据参数弹窗的显示与隐藏
      downloadTeamDialogVisible: false,
      // 下载团队对象
      downloadTeamForm: {
        competitionName: '',
        teamTime: null
      },
      // 添加团队的弹窗的显示与隐藏
      addTeamDialogVisible: false,
      // 添加团队对象
      addTeamForm: {
        teamName: '',
        teamStudent: '',
        teamCollege: ''
      },
      // 总页数
      total: 0,
      // 所有学生用户信息总页数
      studentInformationTotal: 0,
      // 团队总页数
      teamTotal: 0,
      // 未报名团队总页数
      notSignUpTeamTotal: 0,
      // 已删除团队总页数
      deleteTeamTotal: 0,
      // 学生用户列表
      studentList: [],
      // 所有学生信息列表
      studentInformationList: [],
      // 删除学生用户对象
      deleteStudent: {
        studentNumber: ''
      },
      // 删除报名团队对象
      deleteTeam: {
        teamId: null
      },
      // 删除未报名团队对象
      deleteNotSignUpTeam: {
        teamId: null
      },
      // 团队信息列表
      teamList: [],
      // 未报名团队信息列表
      notSignUpTeamList: [],
      // 已删除团队信息列表
      deleteTeamList: [],
      // 团队队长修改对象
      teamCaptain: {
        teamId: null,
        studentNumber: ''
      },
      // 移除团队队员对象
      teamRemove: {
        teamId: null,
        studentNumber: ''
      },
      // 取消删除团队对象
      teamCancel: {
        teamId: null
      },
      // 永久删除已删除团队对象
      deleteForeverTeam: {
        teamId: null
      }
    }
  },
  created () {
    this.getStudentInformationList()
  },
  methods: {
    // 获取用户列表
    async getStudentList () {
      const { data: res } = await this.$http.get('admin/students/competitions', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentList = res.data.students
      this.total = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取用户信息列表
    async getStudentInformationList () {
      const { data: res } = await this.$http.get('admin/students', { params: this.studentInformationQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.studentInformationList = res.data.students
      this.studentInformationTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取团队信息列表
    async getTeamList () {
      const { data: res } = await this.$http.get('admin/teams', { params: this.teamQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.teamList = res.data.teams
      this.teamTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取未报名竞赛团队列表
    async getNotSignUpTeamList () {
      const { data: res } = await this.$http.get('admin/teams/NotSignUp', { params: this.notSignUpTeamQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.notSignUpTeamList = res.data.teams
      this.notSignUpTeamTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 获取已删除团队列表
    async getDeleteTeamList () {
      const { data: res } = await this.$http.get('admin/teams/delete/cancel', { params: this.deleteTeamQueryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.deleteTeamList = res.data.teams
      this.deleteTeamTotal = res.data.total
      this.$message.success(res.meta.msg)
      console.log(res)
    },
    // 修改框的显示
    showEditDialog (studentNumber) {
      this.editStudentForm = this.studentList.find(student => student.studentNumber === studentNumber)
      console.log(this.editStudentForm)
      this.editStudentDialogVisible = true
    },
    // 信息修改框的显示
    showStudentInformatitionEditDialog (studentNumber) {
      this.editStudentForm = this.studentInformationList.find(student => student.studentNumber === studentNumber)
      console.log(this.editStudentForm)
      this.editStudentDialogVisible = true
    },
    // 团队修改框的显示
    showEditTeamDialog (teamId) {
      this.editTeamForm = this.teamList.find(team => team.teamId === teamId)
      console.log(this.editTeamForm)
      this.editTeamDialogVisible = true
    },
    // 用户修改框的关闭
    editStudentDialogClose () {
      this.$refs.editStudentFormRef.resetFields()
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
    async removeUserById (studentNumber) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.deleteStudent.studentNumber = studentNumber
      const { data: res } = await this.$http.delete('admin/students', { params: this.deleteStudent })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      if (this.activeName === 'first') {
        this.getStudentList()
      } else {
        this.getStudentInformationList()
      }
    },
    // 修改用户确定按钮
    editStudentInfo () {
      this.$refs.editStudentFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改用户请求
        const { data: res } = await this.$http.put('admin/students', this.qs.stringify(this.editStudentForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        if (this.activeName === 'first') {
          this.getStudentList()
        } else {
          this.getStudentInformationList()
        }
        this.editStudentDialogVisible = false
      })
    },
    // 修改团队的确定按钮
    editTeamInfo () {
      this.$refs.editTeamFormRef.validate(async valid => {
        if (!valid) return
        // 发起修改团队请求
        const { data: res } = await this.$http.put('admin/teams', this.qs.stringify(this.editTeamForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getTeamList()
        this.editTeamDialogVisible = false
      })
    },
    // 下载框的显示
    downloadClick () {
      this.downloadDialogVisible = true
    },
    // 下载参数提交按钮
    editDownload () {
      this.$refs.downloadFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.get('admin/students/download', { params: this.downloadForm })
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        // 当前时间
        console.log(res.data.studentsVOS)
        const yy = new Date().getFullYear()
        const mm = new Date().getMonth() + 1
        const dd = new Date().getDate()
        const hh = new Date().getHours()
        const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
        const time = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss
        console.log(time)
        const csv = Papa.unparse(res.data.studentsVOS)
        // 定义文件内容，类型必须为Blob 否则createObjectURL会报错
        const url = window.URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/plain;charset=utf-8' }))
        // 生成url对象
        // 生成<a></a>DOM元素
        const el = document.createElement('a')
        // 链接赋值
        el.href = url
        el.download = this.downloadForm.competitionName + '_' + this.downloadForm.studentTime + '_' + '个人_' + time + '文件导出.csv'
        // 必须点击否则不会下载
        el.click()
        // 移除链接释放资源
        window.URL.revokeObjectURL(url)
        this.$message.success(res.meta.msg)
        this.downloadDialogVisible = false
      })
    },
    // 卡片切换
    handleClick () {
      switch (this.activeName) {
        case 'first':
          this.getStudentList()
          break
        case 'second':
          this.getTeamList()
          break
        case 'third':
          this.getNotSignUpTeamList()
          break
        case 'fourth':
          this.getDeleteTeamList()
          break
        case 'fifth':
          this.getStudentInformationList()
          break
        default:
          this.getStudentInformationList()
          break
      }
    },
    // 删除报名团队
    async removeTeamById (teamId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将删除该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.deleteTeam.teamId = teamId
      const { data: res } = await this.$http.delete('admin/teams', { params: this.deleteTeam })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getTeamList()
      this.getDeleteTeamList()
      console.log(teamId)
    },
    // 删除未报名团队
    async removeNotSignUpTeamById (teamId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将删除该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.deleteNotSignUpTeam.teamId = teamId
      const { data: res } = await this.$http.delete('admin/teams/delete/forever/notSignUp', { params: this.deleteNotSignUpTeam })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getNotSignUpTeamList()
      console.log(teamId)
    },
    // 永久删除团队
    async removeDeleteTeamById (teamId) {
      // 弹窗提示是否删除用户
      const confirmResult = await this.$confirm('此操作将永久删除该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => { return err })
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除!')
      }
      this.deleteForeverTeam.teamId = teamId
      const { data: res } = await this.$http.delete('admin/teams/delete/forever/team', { params: this.deleteForeverTeam })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getDeleteTeamList()
      console.log(teamId)
    },
    // 团队下载参赛提交
    editDownloadTeam () {
      this.$refs.downloadTeamFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('admin/teams/download', { params: this.downloadTeamForm })
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        // 当前时间
        console.log(res.data.teamsDownloadVOS)
        const yy = new Date().getFullYear()
        const mm = new Date().getMonth() + 1
        const dd = new Date().getDate()
        const hh = new Date().getHours()
        const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
        const time = yy + '' + mm + '' + dd + '' + hh + '' + mf + '' + ss
        console.log(time)
        const csv = Papa.unparse(res.data.teamsDownloadVOS)
        // 定义文件内容，类型必须为Blob 否则createObjectURL会报错
        const url = window.URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/plain;charset=utf-8' }))
        // 生成url对象
        // 生成<a></a>DOM元素
        const el = document.createElement('a')
        // 链接赋值
        el.href = url
        el.download = this.downloadTeamForm.competitionName + '_' + this.downloadTeamForm.teamTime + '_' + time + '团队_' + '文件导出.csv'
        // 必须点击否则不会下载
        el.click()
        // 移除链接释放资源
        window.URL.revokeObjectURL(url)
        this.$message.success(res.meta.msg)
        this.$message.success('下载成功')
        this.downloadTeamDialogVisible = false
      })
    },
    downloadTeamClick () {
      this.downloadTeamDialogVisible = true
    },
    addTeamClick () {
      this.addTeamDialogVisible = true
    },
    // 添加团队
    addTeam () {
      this.$refs.addTeamFormRef.validate(async valid => {
        // 判断是否满足相应的数据格式
        if (!valid || this.addTeamForm.teamStudent.split(',').length % 2 !== 0) {
          return this.$message.error('请检查相应的数据格式')
        }
        // 发起添加团队请求
        const { data: res } = await this.$http.post('admin/teams', this.qs.stringify(this.addTeamForm))
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getTeamList()
        this.addTeamDialogVisible = false
      })
    },
    // 提升为队长按钮
    async updateCaptain (teamId, studentNumber) {
      this.teamCaptain.teamId = teamId
      this.teamCaptain.studentNumber = studentNumber
      const { data: res } = await this.$http.put('admin/teams/teamId/studentNumber', this.qs.stringify(this.teamCaptain))
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getTeamList()
    },
    // 移除团队成员
    async removeStudent (teamId, studentNumber) {
      this.teamRemove.teamId = teamId
      this.teamRemove.studentNumber = studentNumber
      const { data: res } = await this.$http.delete('admin/teams/students', { params: this.teamRemove })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getTeamList()
    },
    // 恢复团队删除
    async cancelDeleteTeam (teamId) {
      this.teamCancel.teamId = teamId
      const { data: res } = await this.$http.put('admin/teams/delete/cancel', this.qs.stringify(this.teamCancel))
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      this.getDeleteTeamList()
      this.getTeamList()
    },
    // 监听pagesize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getStudentList()
    },
    // 监听页面值改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getStudentList()
    },
    // 监听pagesize 改变的事件
    handleTeamSizeChange (newSize) {
      // console.log(newSize)
      this.teamQueryInfo.pageSize = newSize
      this.getTeamList()
    },
    // 监听页面值改变的事件
    handleTeamCurrentChange (newPage) {
      // console.log(newPage)
      this.teamQueryInfo.pageNum = newPage
      this.getTeamList()
    },
    // 监听pagesize 改变的事件
    handleNotSignUpTeamSizeChange (newSize) {
      // console.log(newSize)
      this.notSignUpTeamQueryInfo.pageSize = newSize
      this.getNotSignUpTeamList()
    },
    // 监听页面值改变的事件
    handleNotSignUpTeamCurrentChange (newPage) {
      // console.log(newPage)
      this.notSignUpTeamQueryInfo.pageNum = newPage
      this.getNotSignUpTeamList()
    },
    // 监听pagesize 改变的事件
    handleDeleteTeamSizeChange (newSize) {
      // console.log(newSize)
      this.deleteTeamQueryInfo.pageSize = newSize
      this.getDeleteTeamList()
    },
    // 监听页面值改变的事件
    handleDeleteTeamCurrentChange (newPage) {
      // console.log(newPage)
      this.deleteTeamQueryInfo.pageNum = newPage
      this.getDeleteTeamList()
    },
    // 监听pagesize 改变的事件
    handleStudentInformationSizeChange (newSize) {
      // console.log(newSize)
      this.studentInformationQueryInfo.pageSize = newSize
      this.getStudentInformationList()
    },
    // 监听页面值改变的事件
    handleStudentInformationCurrentChange (newPage) {
      // console.log(newPage)
      this.studentInformationQueryInfo.pageNum = newPage
      this.getStudentInformationList()
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
  .el-breadcrumb {
    font-size: 15px;
  }
</style>
