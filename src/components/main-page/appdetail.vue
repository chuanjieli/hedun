<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="应用详情" shadow style>
      <div>
        <Form
          ref="form"
          :model="form"
          label-position="right"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="应用名称" prop="appName">
            <Input :disabled="disabled" type="text" v-model="form.appName" placeholder="应用名称"></Input>
          </FormItem>
          <FormItem label="后端及协议类型">
            <Select :disabled="disabled" v-model="form.protocol">
              <Option value="http">http</Option>
              <Option value="http">https</Option>
            </Select>
          </FormItem>
          <FormItem
            v-for="(item, index) in form.app1"
            :key="index"
            label="目的地址"
            :prop="'app1.' + index + '.appSite'"
            :rules="{required: true, message: '请填写目的地址', trigger: 'blur'}"
          >
            <Input
              :disabled="disabled"
              v-model="form.app1[index].appSite"
              type="text"
              placeholder="例如 IPv4:10.10.10.10:80 , IPv6:[::1%lo]:8080"
            >
              <Icon type="md-add" size="16" slot="append" @click="addSite"/>
              <Icon v-if="delSite" type="md-close" size="16" slot="append" @click="delSite1"/>
            </Input>
          </FormItem>
          <div v-for="(item,index) in form.app2" :key="'b'+index">
            <FormItem
              label="域名"
              :prop="'app2.' + index + '.appDomain'"
              :rules="{required: true, message: '请填写域名', trigger: 'blur'}"
            >
              <Input
                :disabled="disabled"
                v-model="form.app2[index].appDomain"
                type="text"
                placeholder="请输入域名"
              >
                <Icon type="md-add" size="16" slot="append" @click="addDomain"/>
                <Icon v-if="delDomain" type="md-close" size="16" slot="append" @click="delDomain1"/>
              </Input>
            </FormItem>
            <FormItem
              label="证书"
              :prop="'app2.' + index + '.appCertificate'"
              :rules="{required: true, message: '请填写证书', trigger: 'blur'}"
            >
              <Input
                :disabled="disabled"
                type="text"
                v-model="form.app2[index].appCertificate"
                placeholder="No Certificate (HTTP Only)"
              ></Input>
            </FormItem>
          </div>
          <FormItem label="获取客户IP途径">
            <Select :disabled="disabled" v-model="form.way">
              <Option value="REMOTE_ADDR">REMOTE_ADDR</Option>
              <Option value="X_Forwareded_For">X_Forwareded_For</Option>
              <Option value="X_REAL_IP">X_REAL_IP</Option>
              <Option value="REAL_IP">REAL_IP</Option>
            </Select>
          </FormItem>
          <FormItem label="用户名">
            <Input :disabled="disabled" type="text" v-model="form.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem>
            <CheckboxGroup v-model="form.fruit" size="large">
              <Checkbox label="1" :disabled="disabled">将HTTP重定向到HTTPS(301)</Checkbox>
              <br>
              <Checkbox label="2" :disabled="disabled">https启用hsts(添加响应头:严格传输安全)</Checkbox>
              <br>
              <Checkbox label="3" :disabled="disabled">启用WAF(Web应用程序防火墙)</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem>
            <Button @click="disabled = !disabled" type="primary">编辑</Button>
            <Button :disabled="disabled" @click="handleSubmit" type="primary">保存</Button>
            <Button :disabled="disabled" @click="handleSubmit1" type="primary">删除</Button>
          </FormItem>
        </Form>
      </div>
      <!-- <div v-for="(item,index) in form.app2" :key="'b'+index">
        <Form
          :ref="'form2'+ index"
          :model="form.app2[index]"
          :rules="ruleValidate"
          :label-width="100"
        >
          <FormItem label="域名" prop="appDomain">
            <Input
              :disabled="disabled"
              v-model="form.app2[index].appDomain"
              type="text"
              placeholder="请输入域名"
            >
              <Icon type="md-add" size="16" slot="append" @click="addDomain"/>
              <Icon v-if="delDomain" type="md-close" size="16" slot="append" @click="delDomain1"/>
            </Input>
          </FormItem>
          <FormItem label="证书" prop="appCertificate">
            <Input
              :disabled="disabled"
              type="text"
              v-model="form.app2[index].appCertificate"
              placeholder="No Certificate (HTTP Only)"
            ></Input>
          </FormItem>
        </Form>
      </div>-->
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      delSite: false,
      delDomain: false,
      disabled: true,
      form: {
        appName: "",
        protocol: "http",
        way: "REAL_IP",
        fruit: ["1", "2", "3"],
        userName: "",
        app1: [{ appSite: "" }],
        app2: [{ appCertificate: "", appDomain: "" }]
      },
      ruleValidate: {
        appName: [
          {
            required: true,
            message: "请填写应用名称",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写目的地址",
            trigger: "blur"
          }
        ],
        appSite: [
          {
            required: true,
            message: "请填写目的地址",
            trigger: "blur"
          }
        ],
        appDomain: [
          {
            required: true,
            message: "请填写域名",
            trigger: "blur"
          }
        ],
        appCertificate: [
          {
            required: true,
            message: "请填写证书",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    addSite() {
      if (this.disabled == false) {
        this.form.app1.push({ appSite: "" });
        this.delSite = true;
      } else {
        this.$Message.info("请点击编辑");
      }
    },
    delSite1() {
      if (this.disabled == false) {
        this.form.app1.pop({ appSite: "" });
      } else {
        this.$Message.info("请点击编辑");
      }
    },
    addDomain() {
      if (this.disabled == false) {
        this.form.app2.push({ appCertificate: "", appDomain: "" });
        this.delDomain = true;
      } else {
        this.$Message.info("请点击编辑");
      }
    },
    delDomain1() {
      if (this.disabled == false) {
        this.form.app2.pop({ appSite: "" });
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
    delSite() {
      console.log(this.delSite);
    },
    "form.app1": function() {
      if (this.form.app1.length == 1) {
        this.delSite = false;
      }
    },
    "form.app2": function() {
      if (this.form.app2.length == 1) {
        this.delDomain = false;
      }
    }
  }
};
</script>
