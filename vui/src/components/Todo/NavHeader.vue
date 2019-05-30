<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
             @select="handleSelect"
             text-color="black"
             active-text-color="gold"
    >
      <el-menu-item index="1"><router-link to="/">todo</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/quote">quote</router-link></el-menu-item>
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
