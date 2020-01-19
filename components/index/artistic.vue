<template>
<div class="m-istyle">
    <dl @mouseover="over">
        <dt>有格调</dt>
        <dd keyword="景点" kind="all" :class="{active:kind==='all'}">全部</dd>
        <dd keyword="美食" kind="part" :class="{active:kind==='part'}">约会聚餐</dd>
        <dd keyword="丽人" kind="spa" :class="{active:kind==='spa'}">丽人spa</dd>
        <dd keyword="电影" kind="movie" :class="{active:kind==='movie'}">电影演出</dd>
        <dd keyword="旅游" kind="travel" :class="{active:kind==='travel'}">品质出游</dd>
    </dl>
    <ul class="ibody">
        <li v-for="(item,idx) in currentList" :key="idx">
            <el-card :body-style="{ padding: '0px' }" shadow="never">
                <img class="image" :src="item.img">
                <ul class="cbody">
                    <li class="title">{{ item.title }}</li>
                    <li class="pos">{{ item.pos }}</li>
                    <li class="price">
                        ￥<em>{{ item.price }}</em>
                        <span class="oldPrice">门市价￥<span>{{ item.oldPrice }}</span></span>
                        <span class="address">{{ item.address }}</span>
                    </li>
                </ul>
            </el-card>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data: () => {
        return {
            kind: 'all',
            list: {
                all: [],
                part: [],
                spa: [],
                movie: [],
                travel: []
            }
        }
    },
    computed: {
        // 获取到当前移入的数据
        currentList() {
            return this.list[this.kind]
        }
    },
    mounted() {
        this.getAllData('all', '', '')
    },
    methods: {
        over(e) {
            const dom = e.target
            const tag = dom.tagName.toLowerCase()
            if (tag === 'dd') {
                this.kind = dom.getAttribute('kind')
                const keyword = dom.getAttribute('keyword')
                this.list[this.kind] = this.getAllData(this.kind, keyword, '')
            }
        },
        async getAllData(kind, keyword, city) {
            const self = this
            const { status, data } = await self.$axios.get('/search/resultsByKeywords', {
                params: {
                    keyword,
                    city
                }
            })
            if (status === 200 && data.count > 0) {
                const resdata = data.poi.filter(item => item.photos.length).map((item) => {
                    return {
                        img: item.photos[0].url,
                        title: item.name,
                        pos: item.type,
                        price: item.biz_ext.cost || '暂无',
                        oldPrice: 362,
                        address: item.address
                    }
                })
                this.list[kind] = resdata
            } else {
                this.list[kind] = []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/index/artistic.scss';
.oldPrice {
    color: #666;
    text-decoration: line-through;
}

.address {
    color: #666;
    float: right;
    line-height: 32px;
    margin-right: 5px;
}
</style>
