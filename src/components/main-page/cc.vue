<template>
  <div>
    <Card title="全局CC策略(对于具有自定义CC策略的应用程序无效)" shadow style>
      <div>
        <Form ref="form" label-position="right" :label-width="90" inline>
          <FormItem label="统计周期(秒)">
            <InputNumber :min="1" v-model="form.period" style="width: 150px"></InputNumber>
          </FormItem>
          <FormItem label="最大请求个数">
            <InputNumber :min="1" v-model="form.request" style="width: 150px"></InputNumber>
          </FormItem>
          <FormItem label="阻隔秒数">
            <InputNumber :min="1" v-model="form.obstruct" style="width: 150px"></InputNumber>
          </FormItem>

          <FormItem label="防御动作">
            <Select v-model="form.way" style="width: 150px">
              <Option value="Block">Block</Option>
              <Option value="BypassAndLog">BypassAndLog</Option>
              <Option value="Captcha">Captcha</Option>
              <Option value="OK_Pass">OK_Pass</Option>
            </Select>
          </FormItem>
          <br />
          <FormItem :label-width="0">
            <CheckboxGroup v-model="form.defensive" size="large">
              <Checkbox label="1">分别统计不同URL个数</Checkbox>
              <br />
              <Checkbox label="2">分别统计不同User-Agent个数</Checkbox>
              <br />
              <Checkbox label="3">分别统计不同Cookies个数</Checkbox>
              <br />
              <Checkbox label="4">启用此CC阻止策略</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <br />
          <Button type="primary">保存</Button>
        </Form>
      </div>
    </Card>

    <Collapse style="margin-top:20px">
      <Panel name="1">
        自定义应用程序CC策略(仅在选择应用程序时显示)
        <Col slot="content">
          <div style="display:flex;">
            <Select v-model="model1" style="flex:1;margin-right:10px">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.value }}</Option>
            </Select>
            <Button type="primary" @click.prevent="addCc">添加自定义策略</Button>
          </div>

          <Form
            v-if="custom"
            ref="form1"
            label-position="right"
            :label-width="90"
            inline
            style="margin-top:20px"
          >
            <FormItem label="统计周期(秒)">
              <InputNumber :min="1" v-model="form.period" style="width: 150px"></InputNumber>
            </FormItem>
            <FormItem label="最大请求个数">
              <InputNumber :min="1" v-model="form.request" style="width: 150px"></InputNumber>
            </FormItem>
            <FormItem label="阻隔秒数">
              <InputNumber :min="1" v-model="form.obstruct" style="width: 150px"></InputNumber>
            </FormItem>

            <FormItem label="防御动作">
              <Select v-model="form.way" style="width: 150px">
                <Option value="Block">Block</Option>
                <Option value="BypassAndLog">BypassAndLog</Option>
                <Option value="Captcha">Captcha</Option>
                <Option value="OK_Pass">OK_Pass</Option>
              </Select>
            </FormItem>
            <br />
            <FormItem :label-width="0">
              <CheckboxGroup v-model="form.defensive" size="large">
                <Checkbox label="1">分别统计不同URL个数</Checkbox>
                <br />
                <Checkbox label="2">分别统计不同User-Agent个数</Checkbox>
                <br />
                <Checkbox label="3">分别统计不同Cookies个数</Checkbox>
                <br />
                <Checkbox label="4">启用此CC阻止策略</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <br />
            <Button type="primary">保存</Button>
            <Button type="primary">取消</Button>
          </Form>
        </Col>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      custom: false,
      form: {
        period: 12,
        request: 3,
        obstruct: 23,
        way: "Block",
        defensive: ["1", "2", "4"]
      },
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  },
  methods: {
    addCc() {
      this.custom = !this.custom;
    }
  }
};
</script>
