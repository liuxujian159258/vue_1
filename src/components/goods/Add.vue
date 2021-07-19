<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <!-- 提示区域 -->
        <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
        <!-- 步骤条区域 -->
        <el-steps :space="200" :active="+activeIndex" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- tab区域栏 -->
        <el-form :model="addGoodForm" :rules="addGoodFormRules" ref="addGoodFormRef" label-width="100px" label-position="top">
          <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addGoodForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addGoodForm.goods_price" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodForm.goods_weight" type="number"></el-input>
            </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodForm.goods_number" type="number"></el-input>
            </el-form-item>
              <el-form-item label="商品分类:" prop="goods_cat">
                <!-- options用来指定数据源 -->
                <!-- props用来指定配置对象 -->
                <el-cascader v-model="addGoodForm.goods_cat" :options="catelist"
                             :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', children: 'children', checkStrictly: true }"
                             @change="addHandleChange" clearable>
                </el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <!-- 渲染表单的Item项 -->
              <el-form-item :label="item.attr_name" v-for="item in manyTableDate" :key="item.attr_id">
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border size="mini"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <!-- 渲染表单的Item项 -->
              <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload :action="uploadURL" :on-preview="handlePreview"
                :on-remove="handleRemove" list-type="picture" :headers="headerObj" :on-success="handleSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <!-- 富文本编辑器 -->
              <quill-editor v-model="addGoodForm.goods_introduce">
              </quill-editor>
              <!-- 添加商品的按钮 -->
              <el-button type="primary" class="btnAdd" @click="addGood">添加商品</el-button>
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
import _ from 'lodash'
export default {
  name: 'Add',
  data () {
    return {
      activeIndex: '0',
      // 添加商品的表单数据对象
      addGoodForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属分类数组
        goods_cat: [],
        // 图片数组
        pics: [],
        // 商品的详情描述
        goods_introduce: '',
        // 属性数组
        attrs: []
      },
      // 添加商品的表单验证对象
      addGoodFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请输入商品数量', trigger: 'blur' }]
      },
      // 商品分类列表
      catelist: [],
      // 动态参数列表数据
      manyTableDate: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 上传图片地址
      uploadURL: 'http://timemeetyou.com:8889/api/private/v1/upload',
      // 图片上传组件的header请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 预览图片路径
      previewPath: '',
      // 控制图片预览框的显示与隐藏
      previewVisible: false
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取所有商品分类数据
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('商品分类数据获取失败')
      }
      this.catelist = res.data
      console.log(this.catelist)
    },
    // 级联选择器选中项变化，会触发这个函数
    addHandleChange () {
      // console.log(this.addGoodForm.goods_cat)
      if (this.addGoodForm.goods_cat.length !== 3) {
        this.addGoodForm.goods_cat = []
      }
    },
    // 控制标签页的切换
    beforeTabLeave (activeName, oldActiveName) {
      // console.log(oldActiveName + '=>' + activeName)
      if (oldActiveName === '0' && this.addGoodForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    // 点击相应的标签页加载相应的数据
    async tabClicked () {
      // console.log(this.activeIndex)
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'many' } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数列表失败! ')
        }
        console.log(res.data)
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        this.manyTableDate = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) {
          return this.$message.error('获取静态属性列表失败! ')
        }
        console.log(res.data)
        this.onlyTableData = res.data
      }
    },
    // 处理图片预览
    handlePreview (file) {
      // console.log(file)
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 处理移除产品
    handleRemove (file) {
      // console.log(file)
      // 获取将要删除的图片的临时路径
      const filePath = file.response.data.tmp_path
      // 从pics数组中，找到这个图片对应的索引值
      const i = this.addGoodForm.pics.findIndex(x => x.pic === filePath)
      // 调用数组的splice方法，把图片信息对象从，pics数组中移除
      this.addGoodForm.pics.splice(i, 1)
      console.log(this.addGoodForm)
    },
    // 监听图片上传成功的事件
    handleSuccess (response) {
      console.log(response)
      // 1 拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 2 将图片信息对象，push到pics数组中
      this.addGoodForm.pics.push(picInfo)
      console.log(this.addGoodForm)
    },
    // 点击添加商品按钮
    addGood () {
      // console.log(this.addGoodForm)
      this.$refs.addGoodFormRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        }
        // 执行添加的页逻辑
        // lodash cloneDeep深拷贝
        const form = _.cloneDeep(this.addGoodForm)
        form.goods_cat = form.goods_cat.join(',')
        // 处理动态参数
        this.manyTableDate.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addGoodForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addGoodForm.attrs.push(newInfo)
        })
        form.attrs = this.addGoodForm.attrs
        console.log(form)
        // 发起请求添加商品
        // 商品的名称，必须是唯一的
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) {
          console.log(res.meta)
          return this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功!')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId () {
      if (this.addGoodForm.goods_cat.length === 3) {
        return this.addGoodForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
  .el-checkbox {
    margin: 0 5px 0 0 !important;
  }
  .previewImg {
    width: 100%;
  }
  .btnAdd {
    margin-top: 15px;
  }
</style>
