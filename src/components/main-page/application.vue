<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="应用管理" :padding="0" shadow style>
      <CellGroup>
        <Cell title="添加应用程序" to="/application/0">
          <Icon type="ios-add-circle-outline" slot="icon" size="24" />
          <span slot="arrow" />
        </Cell>
        <Cell title="广目1" label="www.cmri.cn" to="/application/1">
          <Icon type="md-apps" slot="icon" size="24" />
          <Tooltip content="应用详情" placement="left" slot="arrow">
            <Icon type="ios-locate" size="24" />
          </Tooltip>
        </Cell>
        <Cell title="www.10086.cn" label="www.10086.cn" to="/application/2">
          <Tooltip content="应用详情" placement="left" slot="arrow">
            <Icon type="ios-locate" size="24" />
          </Tooltip>
          <Icon type="md-apps" slot="icon" size="24" />
        </Cell>
        <Cell title="www.heimeixifu.com" label="www.heimeixifu.com" to="/application/3">
          <Tooltip content="应用详情" placement="left" slot="arrow">
            <Icon type="ios-locate" size="24" />
          </Tooltip>
          <Icon type="md-apps" slot="icon" size="24" />
        </Cell>
        <Cell title="广目2" label="www.cmcc.cn" to="/application/4">
          <Tooltip content="应用详情" placement="left" slot="arrow">
            <Icon type="ios-locate" size="24" />
          </Tooltip>
          <Icon type="md-apps" slot="icon" size="24" />
        </Cell>
        <Cell title="广目" label="security.cmri.cn" to="/application/5">
          <Tooltip content="应用详情" placement="left" slot="arrow">
            <Icon type="ios-locate" size="24" />
          </Tooltip>
          <Icon type="md-apps" slot="icon" size="24" />
        </Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switchValue: true
    };
  }
};
</script>