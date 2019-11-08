<template>
  <el-container class="layout-default">
    <el-header style="height:197px">
      <zrHeader />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>1234565</el-footer>
  </el-container>
</template>
<script>
import zrHeader from '@/components/common/header/index'
export default {
  components: {
    zrHeader
  }
}
</script>
<style>
</style>
