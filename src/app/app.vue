<template>
  <div id="content">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  min-width: 1200px;
  // overflow: hidden;
  margin: 0;
  padding: 0;
}
#content {
  .size;
}
</style>

