<template>
<el-container class="layout-default">
    <el-header style="height:197px">
        <zrHeader />
    </el-header>
    <el-main>
        <nuxt />
    </el-main>
    <el-footer style="height:auto">
        <zrFooter />
    </el-footer>
</el-container>
</template>
<script>
import zrHeader from '@/components/common/header/index'
import zrFooter from '@/components/common/footer/index'
export default {
    components: {
        zrHeader,
        zrFooter
    }
}
</script>
<style lang="scss">
@import '@/assets/css/public/layout.scss';
</style>
