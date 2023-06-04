<template>
  <div style="height: 100vh; overflow: hidden; position: relative">
    <el-card class="cover" v-if="loginAdmin.id">
      <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    :accuracy="5"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
      ></slide-verify>
    </el-card>

    <div id="login_box" style="width: 20%;
    height: 400px;
    background-color: rgba(221,183,183,0.38);
    margin: auto;
    margin-top: 8%;
    text-align: center;
    border-radius: 10px;
    padding: 50px 50px;">
      <h1 style="color: rgba(67,31,31,0.56);margin-top: 5%;">登 录</h1>
      <el-form :model="admin" :rules="rules" ref='loginForm'>
      <el-form-item prop="username" style="margin-top: 5%;" >
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="admin.username" style=" border: 0;
      width: 84%;
      font-size: 19px;
      color: #fff;
      background: transparent;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="admin.password" style=" border: 0;
      width: 84%;
      font-size: 19px;
      color: #fff;
      background: transparent;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top: 40px;
      width: 60%;
      height: 40px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      background-image: linear-gradient(to right, #e4b798, #a0665f);" type="primary" size="medium" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>

</template>

<script>
import request from "@/utils/request";
import Cookies from 'js-cookie'

export default {
  name: "LOGIN",
  data() {
    return {
      loginAdmin:{},
      admin: {},
      rules: {
        username: [
          //trigger:'blur'失去焦点时进行验证。
          {required: true, massage:'请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, massage:'请输入密码', trigger: 'blur'},
          {min:1, max:10, massage: '密码长度在1~10之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if(valid) {
          request.post('/admin/login', this.admin).then(res => {
            if(res.code === '200') {
              this.loginAdmin = res.data    //滑块组件出现了
            } else {
              this.$notify.error(res.msg)
            }
          })
        }
      })
    },
    onSuccess() {
      Cookies.set('admin', JSON.stringify(this.loginAdmin))
      this.$router.push('/')
      this.$notify.success("登录成功")
    },
    onFail() {

    },
    onRefresh() {
      console.log('refresh')
    }
  }
}
</script>
<style>
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>