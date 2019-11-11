<template>
<div class="page-index">
    <el-row>
        <el-col :span="5"><mt-menu /></el-col>
        <el-col :span="19"><mt-lift /></el-col>
    </el-row>
    <el-row>
        <el-col :span="24"><mtArtistic /></el-col>
    </el-row>
</div>
</template>
<script>
import mtMenu from '@/components/index/menu'
import mtLift from '@/components/index/life'
import mtArtistic from '@/components/index/artistic'
export default {
  components: {
    mtMenu,
    mtLift,
    mtArtistic
  }
}
</script>
<style lang='scss'>
@import "@/assets/css/index/index.scss";

</style>
