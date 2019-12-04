<template>
<div class="m-geo">
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
        切换城市
    </nuxt-link>[雄安 河北 天津]
</div>
</template>
<script>
export default {
}
</script>
<style scoped lang='less'>

</style>
