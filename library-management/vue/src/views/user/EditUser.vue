<template>
  <div>
    <div style="margin-top: 50px;
    width: 80%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    background: #f1e3e3;
    padding: 30px 30px 50px 30px;
    border-radius: 10px;">
      <div style="margin-bottom: 40px; font-weight: bold; font-size: 38px;">编辑用户</div>
      <el-form :inline="true" :model="form" label-width="100px">
        <el-form-item label="卡号">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <br>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="性别" style="margin-right: 95px;">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center; margin-top: 30px;">
        <el-button type="primary" @click="modify" size="medium">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'EditUser',
  data() {
    return {
      form: {}
    }
  },
  created() {
    const id = this.$route.query.id
    request.get("/user/" + id).then(res => {
      this.form = res.data
    })
  },
  methods: {
    modify() {
      request.put('/user/update', this.form).then(res => {
        if(res.code === '200') {
          this.$notify.success('修改成功')
          this.$router.push("/userList")
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>

