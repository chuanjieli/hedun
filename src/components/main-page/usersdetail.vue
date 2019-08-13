<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="用户详情" shadow style>
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="用户名" prop="name">
            <Input :disabled="disabled" type="text" v-model="form.name" placeholder="用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input :disabled="disabled" type="password" v-model="form.password" placeholder="密码"></Input>
          </FormItem>
          <FormItem label="确认密码">
            <Input :disabled="disabled" type="password" v-model="form.password1" placeholder="确认密码"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input :disabled="disabled" type="email" v-model="form.email" placeholder="邮箱"></Input>
          </FormItem>
          <FormItem>
            <CheckboxGroup v-model="form.opt" size="large">
              <Checkbox label="1" :disabled="disabled">授权管理员</Checkbox>
              <br />
              <Checkbox label="2" :disabled="disabled">证书管理员</Checkbox>
              <br />
              <Checkbox label="3" :disabled="disabled">应用程序管理员</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem>
            <Button @click="disabled = !disabled" type="primary">编辑</Button>
            <Button :disabled="disabled" @click="handleSubmit" type="primary">保存</Button>
            <Button :disabled="disabled" @click="handleSubmit1" type="primary">删除</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      form: {
        name: "",
        password: "",
        password1: "",
        email: "",
        opt: []
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请填写邮箱",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.form);
    },
    handleSubmit1() {}
  },
  watch: {}
};
</script>
