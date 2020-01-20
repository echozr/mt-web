<template>
<div class="m-products-list">
    <dl>
        <dd v-for="item in nav" :key="item.name" :class="[item.name,item.acitve?'s-nav-active':'']">
            {{ item.txt }}
        </dd>
    </dl>
    <ul>
        <zr-item v-for="(item,index) in list" :key="index" :meta="item" />
    </ul>
</div>
</template>
<script>
import zrItem from './prodictsItem'
export default {
    components: {
        zrItem
    },
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            nav: [{
                name: 's-default',
                txt: '智能排序',
                acitve: true
            }, {
                name: 's-price',
                txt: '价格最低',
                active: false
            }, {
                name: 's-visit',
                txt: '人气最高',
                active: false
            }, {
                name: 's-comment',
                txt: '评价最高',
                active: false
            }]
        }
    }
}
</script>
<style lang="scss">

</style>
