<template>
<div class="m-iselect">
    <span>按省份选择：</span>
    <el-select v-model="provinceVal" placeholder="省份">
        <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="cityVal" placeholder="城市" :disabled="!city.length">
        <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <span>直接搜索：</span>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect" />
</div>
</template>
<script>
import _ from 'lodash'
export default {
    data() {
        return {
            provinceVal: '',
            cityVal: '',
            input: '',
            province: [],
            city: [],
            allCity: [],
            list: [],
            loading: false
        }
    },
    watch: {
        async provinceVal(newProvinceVal) {
            const self = this
            const { status, data } = await self.$axios.get(`/geo/province/${newProvinceVal}`)
            if (status === 200) {
                self.city = data.city.map((item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                self.cityVal = ''
            }
        }
    },
    async mounted() {
        const self = this
        const { status, data } = await self.$axios.get('/geo/province')
        if (status === 200) {
            self.province = data.province.map((item) => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
        }
    },
    methods: {
        querySearchAsync: _.debounce(async function(query, cb) {
            const self = this
            if (self.allCity.length) {
                cb(self.allCity.filter(item => item.value.includes(query)))
            } else {
                const { status, data: { city } } = await self.$axios.get('/geo/city')
                if (status === 200) {
                    self.allCity = city.map((item) => {
                        return {
                            value: item.name
                        }
                    })
                    cb(self.allCity.filter(item => item.value.includes(query)))
                } else {
                    // eslint-disable-next-line standard/no-callback-literal
                    cb([])
                }
            }
        }, 200),
        handleSelect(item) {
            // eslint-disable-next-line no-restricted-syntax
            console.log(item.value)
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>
