<template>
  <div>
    <div style="
    margin-top: 50px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    background: #f1e3e3;
    padding: 30px 30px 50px 30px;
    border-radius: 10px;">
      <div style="margin-bottom: 40px; font-weight: bold; font-size: 38px;">新增图书管理员</div>
      <el-form :label-position="labelPosition" :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <br><br>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center; margin-top: 30px;">
        <el-button type="primary" @click="save" size="medium">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'AddAdmin',
  data() {
    //自定义校验规则
    const checkPhone = (rule, value, callback) => {
      //正则表达式：1--以1为开头；2--第二位可为3,4,5,6，7,8,9中的任意一位；3--最后以0-9的9个整数结尾。 总共11位数.
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
        return callback(new Error('请输入合法手机号'));
      }
      callback()
    };

    return {
      labelPosition:'right',
      form: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min:1, max: 10, message: '请输入位数于1-10之间的用户名', trigger: 'blur'}
        ],
        phone: [
          {validator:checkPhone, trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    save() {
      //表单校验。  ref 绑定控件，$ refs 获取控件
      this.$refs["ruleForm"].validate((valid) => {
        //如果合法提交表单
        if (valid) {
          request.post('/admin/add', this.form).then(res => {
            if(res.code === '200') {
              this.$notify.success('添加成功')
              this.form = {}
              //方法二：清空form页面. 经试验地址一栏无法清空
              //this.$refs['ruleForm'].resetFields()
            } else {
              this.$notify.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

