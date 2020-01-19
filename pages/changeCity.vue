<template>
<div class="page-changeCity">
    <el-row>
        <el-col>
            <zr-select />
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <zr-hot />
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <zr-categroy />
        </el-col>
    </el-row>
</div>
</template>
<script>
import zrSelect from '../components/changeCity/isSelect'
import zrHot from '../components/changeCity/hot'
import zrCategroy from '../components/changeCity/categroy'
export default {
    components: {
        zrSelect,
        zrHot,
        zrCategroy
    }
}
</script>
<style lang="scss">

</style>
