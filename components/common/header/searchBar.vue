<template>
<div class="search-panel">
    <el-row class="m-header-searchbar">
        <el-col :span="3" class="left">
            <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png">
        </el-col>
        <el-col :span="15" class="center">
            <div class="wrapper">
                <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input" />
                <button class="el-button el-button--primary"><i class="el-icon-search" /></button>
                <dl v-if="isShowHot" class="hotPlace">
                    <dt>热门搜索</dt>
                    <dd v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx">{{ item.name }}</dd>
                </dl>
                <dl v-if="isShowSearch" class="searchList">
                    <dd v-for="(item,idx) in searchList" :key="idx">{{ item }}</dd>
                </dl>
            </div>
            <p class="suggest">
                <a>北京欢乐谷</a>
                <a>八达岭长城</a>
                <a>米粑粑</a>
                <a>沪小二铜炉蛙锅</a>
                <a>圆明园</a>
                <a>坡峰岭</a>
            </p>
            <ul class="nav">
                <li>
                    <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                </li>
            </ul>
        </el-col>
        <el-col :span="6" class="right">
            <ul class="security">
                <li>
                    <i class="refund" />
                    <p class="txt">随时退</p>
                </li>
                <li>
                    <i class="single" />
                    <p class="txt">不满意免单</p>
                </li>
                <li>
                    <i class="overdue" />
                    <p class="txt">过期退</p>
                </li>
            </ul>
        </el-col>
    </el-row>
</div>
</template>
<script>
export default {
    data() {
        return {
            isFocus: false,
            search: '',
            hotList: [],
            searchList: ['私人影院', '宋家庄', '世贸天阶', '十里河']
        }
    },
    computed: {
        isShowHot() {
            return this.isFocus && !this.search
        },
        isShowSearch() {
            return this.isFocus && this.search
        }
    },
    methods: {
        focus() {
            this.isFocus = true
        },
        blur() {
            const self = this
            setTimeout(() => {
                self.isFocus = false
            }, 200)
        },
        input() {}
    }
}
</script>
<style scoped lang='scss'>

</style>
