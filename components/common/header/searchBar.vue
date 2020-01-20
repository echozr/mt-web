<template>
<div class="search-panel">
    <el-row class="m-header-searchbar">
        <el-col :span="3" class="left">
            <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png">
        </el-col>
        <el-col :span="15" class="center">
            <div class="wrapper">
                <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input" />
                <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
                <dl v-if="isShowHot" class="hotPlace">
                    <dt>热门搜索</dt>
                    <dd v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }} </a></dd>
                </dl>
                <dl v-if="isShowSearch" class="searchList">
                    <dd v-for="(item,idx) in searchList" :key="idx"><a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }} </a></dd>
                </dl>
            </div>
            <p class="suggest">
                <span v-for="(item,idx) in $store.state.home.hotPlace.slice(5,10)" :key="idx">
                  <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }} </a>
                </span>
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
import _ from 'lodash'
export default {
    data() {
        return {
            isFocus: false,
            search: '',
            hotList: [],
            searchList: []
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
        input: _.debounce(async function() {
            const self = this
            const city = self.$store.state.geo.position.city.replace('市', '')
            const { status, data } = await self.$axios.get('/search/top', {
                params: {
                    city,
                    input: self.search
                }
            })
            self.searchList = data.top.slice(0, 10)
        }, 300)
    }
}
</script>
<style scoped lang='scss'>

</style>
