<template>
<el-row class="page-product">
    <el-col :span="19">
        <zr-crumbs :keyword="keyword" />
        <zr-classify :types="types" />
        <zr-prodicts :list="list" />
    </el-col>
    <el-col :span="5">
        <zr-map v-if="points.length" :width="230" :height="290" :points="points" />
    </el-col>
</el-row>
</template>
<script>
import zrCrumbs from '../components/products/crumbs'
import zrClassify from '../components/products/classify'
import zrProdicts from '../components/products/prodictsList'
import zrMap from '../components/common/map'
export default {
    components: {
        zrCrumbs,
        zrClassify,
        zrProdicts,
        zrMap
    },
    data() {
        return {
            list: [],
            keyword: '',
            types: [],
            points: []
        }
    },
    async asyncData(ctx) {
        const keyword = ctx.query.keyword
        const city = ctx.store.state.geo.position.city.replace('市', '') || '北京'
        const { status, data } = await ctx.$axios.get('/search/resultsByKeywords', {
            params: {
                keyword: '',
                city: ''
            }
        })
        const { status: status1, data: data1 } = await ctx.$axios.get('/category/classify', {
            params: {
                city
            }
        })
        if (status === 200 && data.count > 0 && status1 === 200) {
            const pointArr = []
            data.poi.map((item) => {
                pointArr.push(item.location.split(','))
            })
            return {
                list: data.poi.filter(item => item.photos.length).map((item) => {
                    return {
                        type: item.type,
                        img: item.photos[0].url,
                        name: item.name,
                        comment: Math.floor(Math.random() * 10000),
                        rate: Number(item.biz_ext.rating),
                        price: Number(item.biz_ext.cost),
                        scene: item.tag,
                        tel: item.tel,
                        status: '可订明日',
                        location: item.location,
                        module: item.type.split(';')[0]
                    }
                }),
                keyword,
                types: [data1.areas].concat([data1.types]),
                points: pointArr
            }
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
