<template>
<el-row :gutter="0" class="m-header">
    <el-col :span="5">
        <city />
    </el-col>
    <el-col :span="5">
        <user />
    </el-col>
    <el-col :span="14">
        <zrnav />
    </el-col>
</el-row>
</template>
<script>
import city from './city'
import user from './user'
import zrnav from './nav'
export default {
    components: {
        city,
        user,
        zrnav
    }
}
</script>
<style lang='scss'>

</style>
