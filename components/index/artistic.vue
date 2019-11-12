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
                all: [{
                    img: '//p1.meituan.net/msmerchant/42b9a65b88afab37efd7c2145c8cabda95091.jpg@460w_260h_1e_1c',
                    title: 'théATRE 茶聚场（王府中環店）',
                    pos: '蛋糕2选1,约6英寸，圆形',
                    price: 298,
                    oldPrice: 330,
                    address: '王府井/东单'
                },
                {
                    img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@460w_260h_1e_1c',
                    title: '丰泽园饭店（王府井店）',
                    pos: '2人自选套餐，提供免费WiFi',
                    price: 248,
                    oldPrice: 362,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@460w_260h_1e_1c',
                    title: '中央电视塔空中观景旋转餐厅',
                    pos: '午餐+观光',
                    price: 298,
                    oldPrice: 330,
                    address: '航天桥'
                }],
                part: [{
                    img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@460w_260h_1e_1c',
                    title: '丰泽园饭店（王府井店）',
                    pos: '2人自选套餐，提供免费WiFi',
                    price: 248,
                    oldPrice: 362,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/42b9a65b88afab37efd7c2145c8cabda95091.jpg@460w_260h_1e_1c',
                    title: 'théATRE 茶聚场（王府中環店）',
                    pos: '蛋糕2选1,约6英寸，圆形',
                    price: 298,
                    oldPrice: 330,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@460w_260h_1e_1c',
                    title: '中央电视塔空中观景旋转餐厅',
                    pos: '午餐+观光',
                    price: 298,
                    oldPrice: 330,
                    address: '航天桥'
                }],
                spa: [{
                    img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@460w_260h_1e_1c',
                    title: '丰泽园饭店（王府井店）',
                    pos: '2人自选套餐，提供免费WiFi',
                    price: 248,
                    oldPrice: 362,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/42b9a65b88afab37efd7c2145c8cabda95091.jpg@460w_260h_1e_1c',
                    title: 'théATRE 茶聚场（王府中環店）',
                    pos: '蛋糕2选1,约6英寸，圆形',
                    price: 298,
                    oldPrice: 330,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@460w_260h_1e_1c',
                    title: '中央电视塔空中观景旋转餐厅',
                    pos: '午餐+观光',
                    price: 298,
                    oldPrice: 330,
                    address: '航天桥'
                }],
                movie: [{
                    img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@460w_260h_1e_1c',
                    title: '丰泽园饭店（王府井店）',
                    pos: '2人自选套餐，提供免费WiFi',
                    price: 248,
                    oldPrice: 362,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/42b9a65b88afab37efd7c2145c8cabda95091.jpg@460w_260h_1e_1c',
                    title: 'théATRE 茶聚场（王府中環店）',
                    pos: '蛋糕2选1,约6英寸，圆形',
                    price: 298,
                    oldPrice: 330,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@460w_260h_1e_1c',
                    title: '中央电视塔空中观景旋转餐厅',
                    pos: '午餐+观光',
                    price: 298,
                    oldPrice: 330,
                    address: '航天桥'
                }],
                travel: [{
                    img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@460w_260h_1e_1c',
                    title: '丰泽园饭店（王府井店）',
                    pos: '2人自选套餐，提供免费WiFi',
                    price: 248,
                    oldPrice: 362,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/42b9a65b88afab37efd7c2145c8cabda95091.jpg@460w_260h_1e_1c',
                    title: 'théATRE 茶聚场（王府中環店）',
                    pos: '蛋糕2选1,约6英寸，圆形',
                    price: 298,
                    oldPrice: 330,
                    address: '王府井/东单'
                },
                {
                    img: '//p1.meituan.net/msmerchant/7776f22c9d6fd0413b7e52441b3f74557386836.jpg@460w_260h_1e_1c',
                    title: '中央电视塔空中观景旋转餐厅',
                    pos: '午餐+观光',
                    price: 298,
                    oldPrice: 330,
                    address: '航天桥'
                }]
            }
        }
    },
    computed: {
        // 获取到当前移入的数据
        currentList() {
            return this.list[this.kind]
        }
    },
    methods: {
        over(e) {
            const dom = e.target
            const tag = dom.tagName.toLowerCase()
            if (tag === 'dd') {
                this.kind = dom.getAttribute('kind')
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
