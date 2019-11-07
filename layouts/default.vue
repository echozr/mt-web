<template>
  <el-container class="layout-default">
    <el-header>
      <zrHeader />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
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
