<template>
  <div class="login">
    <!-- 整个form组件 -->
    <el-form ref="form" :model="form" :rules="rules" status-icon label-width="80px">
      <img src="@/assets/avatar.jpg" alt="">
      <!-- 一个表单项 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 导入axios
import axios from 'axios'
export default {
  data() {
    return {
      // 收集表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单的校验规则
      rules: {
        // 用户名的校验规则
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 9,
            message: '用户名长度在 3 到 9 个字符',
            trigger: 'change'
          }
        ],
        // 密码校验规则
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '密码长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('登录成功')
          // 发送ajax请求
          axios({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.form
          }).then(res => {
            console.log(res.data)
            if (res.data.meta.status === 200) {
              // alert('登录成功')
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 1000
              })
              // 把后台办法的token存起来
              localStorage.setItem('token', res.data.data.token)

              // 跳转到Home组件
              this.$router.push('/home')
            } else {
              // 失败的消息
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        } else {
          // console.log('登录失败')
          return false
        }
      })
    },
    // 重置
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less">
.login {
  // height: 100%;
  width: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px 40px;
    position: relative;

    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }

    .el-button:nth-child(2) {
      margin-left: 80px;
    }
  }
}
</style>
