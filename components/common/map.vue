<template>
<div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map" />
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 300
        },
        points: {
            type: Array,
            default () {
                return [116.46, 39.92]
            }
        }
    },
    data() {
        return {
            id: `map`,
            key: '0dbc0dfd7c775f2a927174493eab8220'
        }
    },
    watch: {
        point(val, old) {
            this.map.setCenter(val)
            this.marker.setPosition(val)
        }
    },
    mounted() {
        const self = this
        self.id = `map${Math.random().toString().slice(4, 6)}`
        window.onmaploaded = () => {
            const map = new window.AMap.Map(self.id, {
                resizeEnable: true,
                zoom: 6,
                center: self.point
            })
            self.map = map
            window.AMap.plugin('AMap.ToolBar', () => {
                const toolbar = new window.AMap.ToolBar()
                map.addControl(toolbar)
                const markerList = []
                for (const i in self.points) {
                    const marker = new window.AMap.Marker({
                        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                        position: self.points[i]
                    })
                    markerList.push(marker)
                }
                map.add(markerList)
            })
        }
        const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
        const jsapi = document.createElement('script')
        jsapi.charset = 'utf-8'
        jsapi.src = url
        document.head.appendChild(jsapi)
    }
}
</script>
<style lang="sass" scoped>

</style>
