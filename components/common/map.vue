<template>
<div id="mapview" ref="map" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map" />
</template>
<script>
import esriLoader from 'esri-loader'
import baseMap from '../../assets/util/mapTools'
export default {
    props: {
        points: {
            type: Array,
            default () {
                return []
            }
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 300
        }
    },
    mounted() {
        this.createMap()
    },
    methods: {
        createMap() {
            const self = this
            const options = { url: 'https://js.arcgis.com/3.27/' }
            esriLoader.loadModules(['esri/map', 'esri/layers/WebTiledLayer', 'esri/symbols/PictureMarkerSymbol', 'esri/graphic',
                'esri/SpatialReference', 'esri/layers/GraphicsLayer', 'esri/geometry/Point'], options)
                .then(([Map, WebTiledLayer, PictureMarkerSymbol, Graphic, SpatialReference, GraphicsLayer, Point]) => {
                    const map = new Map(self.$refs.map, {
                        center: [110.4573, 27.2965],
                        zoom: 7,
                        minZoom: 7
                    })
                    const pointGraphic = new GraphicsLayer()
                    map.addLayer(pointGraphic, 20)
                    baseMap.loadLayer(map, WebTiledLayer)
                    self.addPoints(map, PictureMarkerSymbol, Graphic, SpatialReference, GraphicsLayer, Point, pointGraphic, self.points)
                })
        },
        addPoints(map, PictureMarkerSymbol, Graphic, SpatialReference, GraphicsLayer, Point, pointGraphic, data) {
            for (let i = 0; i < data.length; i++) {
                // eslint-disable-next-line no-undef
                const pointer = new Point(data[i][0], data[i][1], new SpatialReference({
                    wkid: 4326
                }))
                const picUrl = '../../assets/img/fei.png'
                const pictureMarkerSymbol = new PictureMarkerSymbol(picUrl, 22, 33)
                pictureMarkerSymbol.setOffset(0, 17)
                const graphicPicture = new Graphic(pointer, pictureMarkerSymbol)
                graphicPicture.attributes = {
                    'itme': data[i]
                }
                pointGraphic.add(graphicPicture)
            }
            // eslint-disable-next-line no-undef
            dojo.connect(pointGraphic, 'onMouseOver', function(evt) {
                const g = evt.graphic
                const point1 = map.toScreen(evt.mapPoint)
                map.infoWindow.setTitle('标题')
                map.infoWindow.setContent(
                    '<table class="map_overtabs">' +
                    '<tr><td class="text_rt" style="width:100px;">污水处理厂名称：</td><td>' + g.attributes.itme.WSCData[0].WSCName + '</td></tr>' +
                    '<tr><td class="text_rt">所属区域：</td><td>' + g.attributes.itme.area + '</td></tr>' +
                    '<tr><td class="text_rt">废水排放去向：</td><td>' + g.attributes.itme.WSCData[0].WaterDir + '</td></tr>' +
                    '<tr><td class="text_rt">经纬度：</td><td>' + g.attributes.itme.WSCData[0].LonAndLat + '</td></tr>' +
                    '</table>'
                )
                map.infoWindow.show(point1, map.getInfoWindowAnchor(point1))
            })
            // eslint-disable-next-line no-undef
            dojo.connect(pointGraphic, 'onMouseOut', function(evt) {
                map.infoWindow.hide()
            })
        }
    }
}

</script>
<style>
@import url('https://js.arcgis.com/3.27/esri/css/esri.css');
#mapview {
    background: red;
}
</style>
