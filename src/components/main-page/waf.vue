<template>
  <div style="padding: 10px;background: #f8f8f9;height:100%">
    <Tabs value="name1" style="height:100%">
      <TabPane label="全局漏洞策略" name="name1">
        <Table stripe @on-row-click="showdetail" :columns="columns2" :data="data2"></Table>
      </TabPane>
      <TabPane label="CC策略" name="name2">
        <cc></cc>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import cc from './cc.vue'
export default {
  data() {
    return {
      columns2: [
        {
          title: 'ID',
          key: 'id',
          render: (h, params) => {
            return h('div', [
              h(
                'router-link',
                {
                  props: {
                    // type: "primary",
                    // size: "small",
                    tag: 'a',
                    to: '/tactics/' + params.row.id
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.index);
                    }
                  }
                },
                params.row.id
              )
            ])
          }
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '启动',
          key: 'enabled'
        }
      ],
      data2: [
        {
          id: '1001',
          description: 'Code Leakage',
          enabled: 'true'
        },
        {
          id: '1002',
          description: 'SQL Injection with Search',
          enabled: 'true'
        },
        {
          id: '1003',
          description: 'SQL Injection with Search',
          enabled: 'true'
        },
        {
          id: '1004',
          description: 'Basic SQL Injection Attempt',
          enabled: 'true'
        },
        {
          id: '1005',
          description: 'Basic SQL Injection Case When',
          enabled: 'true'
        },
        {
          id: '1006',
          description: 'Basic SQL Injection Case When',
          enabled: 'true'
        }
      ],

      custom: false,
      form: {
        period: 12,
        request: 3,
        obstruct: 23,
        way: 'Block',
        defensive: ['1', '2', '4']
      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: ''
    }
  },
  methods: {
    addCc() {
      this.custom = !this.custom
    },
    showdetail(params) {
      let url = '/tactics/' + params.id
      this.$router.push(url)
    }
  },
  components: {
    cc
  }
}
</script>