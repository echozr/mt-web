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
  data () {
    return {
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['美团外卖']
        }]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店星级',
          child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
        }]
      }]
    }
  },
  computed: {
    getDeatilData () {
      return this.menu.filter(v => v.type === this.kind)[0]
    }
  },
  methods: {
    enterMenu (e) {
      this.kind = e
      console.log(this.kind)
    },
    leaveMenu () {
      const self = this
      self.timer = setTimeout(() => {
        self.kind = ''
      }, 250)
    },
    leaveDetail () {
      this.kind = ''
    },
    enterDetail () {
      clearInterval(this.timer)
    }
  }
}
</script>
<style scoped>

</style>
