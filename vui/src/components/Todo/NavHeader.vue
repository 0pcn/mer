<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             text-color="black"
             active-text-color="gold" router>
      <el-menu-item index="/">todo</el-menu-item>
      <el-menu-item index="/quote">quote</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.el-menu-demo {
  background-color: #6e6e6e;
  color: black;
}
</style>
