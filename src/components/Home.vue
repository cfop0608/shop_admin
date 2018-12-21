<template>
  <el-container class="home">
  <el-header>
    <div class="logo"></div>
    <div class="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="loginOut">
      <span>欢迎光临</span>
      <a href="javascript:;" @click="logout">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <!-- 菜单项 el-menu-item-->
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <!-- 菜单项 el-menu-item-->
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span slot="title">角色列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
/*
  // 退出功能
    1. 点击退出功能
    2. 弹出一个弹框
    3. 点击确定，删除token，跳转到登录组件
*/
export default {
  methods: {
    logout() {
      this.$confirm('你确定要退出吗', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 删除token
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: pink;
    display: flex;
    .logo {
      width: 180px;
      // background-color: orange;
      background-image: url('~@/assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .title {
      flex: 1;
      h1 {
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
    }
    .loginOut {
      width: 180px;
      // background-color: red;
      line-height: 60px;
      text-align: center;
      font-weight: 700;
      a {
        color: orange;
      }
    }
  }
  .el-aside {
    background-color: #545c64;

    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #ccc;
  }
}
</style>
