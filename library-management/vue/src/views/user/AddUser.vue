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
      <div style="margin-bottom: 40px; font-weight: bold; font-size: 38px;">新增用户</div>
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="margin-right: 95px;">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
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
  name: 'AddUser',
  data() {
    //自定义校验规则
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      //正则表达式：/跟^不是连一起用的 ，^是匹配字符串开始的意思，【0-9】意思就是只要是范围0-9里的东西都要，或者说只要不是数字都不要～ +的意思的^[0-9]的范围里匹配一次以上～ $是匹配结束符
      if (!/^[0-9]+$/.test(value)) {
          callback(new Error('请输入数字值'));
      }
      if(parseInt(value) > 150 || parseInt(value) <= 0) {
        callback(new Error('请输入合理年龄'));
      }
      callback()
    };
    const checkPhone = (rule, value, callback) => {
      //正则表达式：1--以1为开头；2--第二位可为3,4,5,6，7,8,9中的任意一位；3--最后以0-9的9个整数结尾。 总共11位数.
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
        return callback(new Error('请输入合法手机号'));
      }
      callback()
    };

    return {
      form: {//默认sex为男
        sex: '男'
        },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        age:[
          {validator:checkAge, trigger:'blur'}
        ],
        phone:[
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
          request.post('/user/add', this.form).then(res => {
            if(res.code === '200') {
              this.$notify.success('添加成功')
              this.form = {sex: '男'}
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

