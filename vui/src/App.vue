<template>
    <el-container>
      <el-header >
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :md="20" >
            <appHeader ></appHeader>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
            <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script>
import NavHeader from './components/Todo/NavHeader'
export default {
  components: {
    appHeader: NavHeader
  }
}
</script>

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

</style>
