<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="策略详情" shadow style>
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="名称或描述" prop="name">
            <Input :disabled="disabled" type="text" v-model="form.name" placeholder="名称或描述"></Input>
          </FormItem>
          <FormItem label="应用范围">
            <Input disabled="disabled" type="text" v-model="form.range"></Input>
          </FormItem>
          <FormItem label="漏洞名称">
            <Select :disabled="disabled" v-model="form.bugName">
              <Option value="Sensitive Data Leakage">Sensitive Data Leakage</Option>
              <Option value="SQL Injection">SQL Injection</Option>
            </Select>
          </FormItem>
          <div style="backgroung:#999" v-for="(item,index) in form.tactics" :key="'b'+index">
            <FormItem label="检查点">
              <Select :disabled="disabled" v-model="form.tactics[index].check">
                <Option value="URLPath">URLPath</Option>
                <Option value="CookieValue">CookieValue</Option>
              </Select>
            </FormItem>
            <FormItem label="操作形式">
              <Select :disabled="disabled" v-model="form.tactics[index].operation">
                <Option value="Sensitive Data Leakage">Sensitive Data Leakage</Option>
                <Option value="SQL Injection">SQL Injection</Option>
              </Select>
            </FormItem>
            <FormItem
              label="正则策略"
              :prop="'tactics.' + index + '.reg'"
              :rules="{required: true, message: '请填写正则策略', trigger: 'blur'}"
            >
              <Input
                :disabled="disabled"
                v-model="form.tactics[index].reg"
                type="text"
                placeholder="(Google RE2,忽略大小写以(?i)开头)"
              >
                <Icon type="md-add" size="16" slot="append" @click="addDomain" />
                <Icon v-if="delReg" type="md-close" size="16" slot="append" @click="delReg1" />
              </Input>
            </FormItem>
          </div>

          <FormItem>
            <Button @click="disabled = !disabled" type="primary">编辑</Button>
            <Button :disabled="disabled" @click="handleSubmit" type="primary">保存</Button>
            <Button :disabled="disabled" @click="handleSubmit1" type="primary">删除</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
    <Card title="正则表达式测试工具" shadow style="margin-top:20px">
      <div>
        <Form
          ref="form1"
          :model="form1"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="策略模式" prop="re2">
            <Input type="text" v-model="form1.re2" placeholder="(Google RE2正则表达式)"></Input>
          </FormItem>
          <FormItem label="Payload值" prop="payload">
            <Input type="text" v-model="form1.payload" placeholder="需要测试的Payload值"></Input>
          </FormItem>
          <FormItem label="匹配结果">
            <Input disabled="disabled" type="text" v-model="form1.result"></Input>
          </FormItem>
          <FormItem>
            <CheckboxGroup v-model="form1.opt" size="large">
              <Checkbox label="1">预处理Payload的值 (Remove " ' /**/ etc.)</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem>
            <Button type="primary">测试</Button>
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
      delReg: false,
      disabled: true,
      form: {
        name: "",
        range: "全部应用",
        bugName: "SQL Injection",
        tactics: [{ check: "URLPath", operation: "SQL Injection", reg: "" }]
      },
      form1: {
        re2: "",
        payload: "",
        result: "",
        opt: ["1"]
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "名称或描述",
            trigger: "blur"
          }
        ],
        re2: [
          {
            required: true,
            message: "请填写正则表达式",
            trigger: "blur"
          }
        ],
        payload: [
          {
            required: true,
            message: "请填写Payload值",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    addDomain() {
      if (this.disabled == false) {
        this.form.tactics.push({ check: "", operation: "", reg: "" });
        this.delReg = true;
      } else {
        this.$Message.info("请点击编辑");
      }
    },
    delReg1() {
      if (this.disabled == false) {
        this.form.tactics.pop();
      } else {
        this.$Message.info("请点击编辑");
      }
    },
    handleSubmit() {
      console.log(this.form);
    },
    handleSubmit1() {}
  },
  watch: {
    "form.tactics": function() {
      if (this.form.tactics.length == 1) {
        this.delReg = false;
      }
    }
  }
};
</script>
