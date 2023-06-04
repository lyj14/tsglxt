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
      <div style="margin-bottom: 40px; font-weight: bold; font-size: 38px;">编辑管理员</div>
      <el-form :inline="true" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
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
  name: 'EditAdmin',
  data() {
    return {
      form: {}
    }
  },
  created() {
    const id = this.$route.query.id
    request.get("/admin/" + id).then(res => {
      this.form = res.data
    })
  },
  methods: {
    modify() {
      request.put('/admin/update', this.form).then(res => {
        if(res.code === '200') {
          this.$notify.success('修改成功')
          this.$router.push("/adminList")
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>

