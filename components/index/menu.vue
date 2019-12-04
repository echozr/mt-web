<template>
<div class="m-menu">
    <dl class="nav" @mouseleave="leaveMenu">
        <dt>全部分类</dt>
        <dd v-for="(item,idx) in menu" :key="idx" @mouseenter="enterMenu(item.type)"><i :class="item.type" />{{ item.name }} <span class="arrow" /></dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="enterDetail" @mouseleave="leaveDetail">
        <template v-for="(item,idx) in getDeatilData.child">
            <h4 :key="idx">{{ item.title }} <span style="float: right;">更多</span></h4>
            <span v-for="k in item.child" :key="k">{{ k }}</span>
</template>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            kind: '',
            menu: []
        }
    },
    computed: {
        getDeatilData() {
            return this.menu.filter(v => v.type === this.kind)[0]
        }
    },
    mounted() {
        this.menu = this.$store.state.home.Menu
    },
    methods: {
        enterMenu(e) {
            this.kind = e
        },
        leaveMenu() {
            const self = this
            self.timer = setTimeout(() => {
                self.kind = ''
            }, 250)
        },
        leaveDetail() {
            this.kind = ''
        },
        enterDetail() {
            clearInterval(this.timer)
        }
    }
}
</script>
<style scoped>

</style>
