<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏 -->
     <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
         <el-button type="success" plain @click="showAddDialog">用户添加</el-button>
    <!-- 表格组件 -->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <!-- 在自定义的模板中，如何访问到当前列的数据 -->
      <template slot-scope="scope">
        <el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)" size="mini" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)" size="mini" plain></el-button>
        <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="currentPage"
      :page-sizes="[2,4,6,8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="40%">
  <!-- 添加的表单 -->
  <el-form :model="addForm" label-width="80px" :rules="rules" status-icon ref="addForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password" placeholder="请输入用户密码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email" placeholder="请输入用户邮箱"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="addForm.mobile" placeholder="请输入用户"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

  <!-- 添加表单 -->
    <el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="40%">
  <!-- 添加的表单 -->
  <el-form :model="editForm" label-width="80px" :rules="rules" status-icon ref="editForm">
    <el-form-item label="用户名">
      <el-tag type="info">{{ editForm.username }}</el-tag>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editForm.email" placeholder="请输入用户邮箱"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="editForm.mobile" placeholder="请输入用户"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateUser">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
// 引入axios
// import axios from 'axios'
export default {
  data() {
    return {
      // 用户列表
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      addDialogVisible: false,
      addForm: {
        uesername: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 9, message: '用户名长度在3到9个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在6到12个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入一个合法的邮箱', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1\d{10}$/,
            message: '请输入一个合法的手机号',
            trigger: 'blur'
          }
        ]
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    async getUserList() {
      let res = await this.axios({
        methods: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      // console.log(res)
      let { meta: { status }, data: { users, total } } = res
      if (status === 200) {
        this.userList = users
        this.total = total
      }
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      this.getUserList()
    },
    search() {
      // 搜索的时候。把当前页改成1
      this.currentPage = 1
      this.getUserList()
    },
    async delUser(id) {
      try {
        // console.log(id)
        await this.$confirm('你确定要删除该用户吗', '温馨提示', {
          type: 'warning'
        })
        // 发送ajax请求，删除数据
        let res = await this.axios({
          method: 'delete',
          url: `users/${id}`
        })
        // console.log(res)
        if (res.meta.status === 200) {
          if (this.userList.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.getUserList()
          this.$message.success('你已成功删除')
          // 如果发现当前页只有一条数据，，currentPage应该减1，渲染上一页
        }
      } catch (e) {
        this.$message.info('取消删除了')
      }
    },
    changeState({ id, mg_state: mgState }) {
      // console.log(user)
      this.axios({
        method: 'put',
        url: `users/${id}/state/${mgState}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message.success('修改成功了')
        } else {
          this.$message.error('修改失败了')
        }
      })
    },
    // 显示对话框
    showAddDialog() {
      this.addDialogVisible = true
    },
    addUser() {
      // 1. 表单校验功能
      // 2. 发送ajax请求添加数据
      // 3. 重新渲染，关闭模态框，重置样式

      this.$refs.addForm.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // 校验成功
        let res = await this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        })
        // console.log(res)
        if (res.meta.status === 201) {
          this.total++
          this.currentPage = Math.ceil(this.total / this.pageSize)
          // 重新渲染
          this.getUserList()
          // 重置表单样式
          this.$refs.addForm.resetFields()
          // 隐藏模态框
          this.addDialogVisible = false
          // 提示信息
          this.$message.success('添加成功了')
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    showEditDialog(row) {
      // 显示对话框
      this.editDialogVisible = true
      // console.log(row)
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    updateUser() {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return false
        // 发送ajax
        let res = await this.axios({
          method: 'put',
          url: `users/${this.editForm.id}`,
          data: this.editForm
        })
        // console.log(res)
        if (res.meta.status === 200) {
          // 重新渲染
          this.getUserList()
          // 关闭对话框
          this.editDialogVisible = false
          // 重置修改表单
          this.$refs.editForm.resetFields()
          // 提示信息
          this.$message.success('修改成功了')
        } else {
          this.$massage.error('服务器异常')
        }
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  background-color: #f1f1f1;
  padding-left: 10px;
}
.input-with-select {
  width: 300px;
  margin-bottom: 5px;
}
</style>
