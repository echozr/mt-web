<template>
<div class="page-detail">
    <el-row>
        <el-col :span="24">
            <zr-crumbs :keyword="keyword" :type="type" />
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <zr-summary :meta="product" />
        </el-col>
    </el-row>
    <el-row class="m-title">
        <el-col :span="24">
            <h3>商家团购及优惠</h3>
        </el-col>
    </el-row>
    <el-row>
        <el-col v-if="canBuy || !isLogin" :span="24">
            <zr-list v-if="isLogin" :list="list" />
            <div v-else class="deal-need-login">
                <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
                <span>请登录后查看详细团购优惠</span>
                <el-button type="primary" round>
                    <a href="/login">立即登录</a>
                </el-button>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import zrCrumbs from '@/components/detail/crumbs'
import zrSummary from '@/components/detail/summary'
import zrList from '@/components/detail/list'
export default {
    components: {
        zrCrumbs,
        zrSummary,
        zrList
    },
    data() {
        return {
            keyword: '',
            type: '',
            product: {},
            list: [],
            isLogin: ''
        }
    },
    computed: {
        canBuy() {
            return this.list.filter(item => item.photos.length).length
        }
    },

    async asyncData(ctx) {
        // eslint-disable-next-line no-undef
        const keyword = ctx.query.keyword
        const type = ctx.query.type
        const { status, data } = await ctx.$axios.get('/search/products', {
            params: {
                keyword,
                type,
                city: ctx.store.state.geo.position.city
            }
        })
        if (status === 200) {
            return {
                keyword,
                product: data.product,
                type,
                list: data.more,
                login: data.login
            }
        } else {
            return {
                keyword,
                product: {},
                type,
                list: [],
                login: false
            }
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/detail/index.scss"
</style>
