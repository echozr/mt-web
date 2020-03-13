const baseMap = {
    loadLayer(map, WebTiledLayer) {
        // // 行政区划图
        // dojo.declare('TDTLayer', new esri.TiledMapServiceLayer, {
        //     constructor() {
        //         // eslint-disable-next-line no-undef
        //         this.spatialReference = new esri.SpatialReference({
        //             wkid: 4326
        //         });
        //         this.initialExtent = (this.fullExtent =
        //             // eslint-disable-next-line no-undef
        //             new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference))
        //         // eslint-disable-next-line no-undef
        //         this.tileInfo = new esri.layers.TileInfo({
        //             'rows': 256,
        //             'cols': 256,
        //             'compressionQuality': 0,
        //             'origin': {
        //                 'x': -180,
        //                 'y': 90
        //             },
        //             'spatialReference': {
        //                 'wkid': 4326
        //             },
        //             'lods': [
        //                 { 'level': 1, 'resolution': 0.7031249999891485, 'scale': 2.958293554545656E8 },
        //                 { 'level': 2, 'resolution': 0.35156249999999994, 'scale': 1.479146777272828E8 },
        //                 { 'level': 3, 'resolution': 0.17578124999999997, 'scale': 7.39573388636414E7 },
        //                 { 'level': 4, 'resolution': 0.08789062500000014, 'scale': 3.69786694318207E7 },
        //                 { 'level': 5, 'resolution': 0.04394531250000007, 'scale': 1.848933471591035E7 },
        //                 { 'level': 6, 'resolution': 0.021972656250000007, 'scale': 9244667.357955175 },
        //                 { 'level': 7, 'resolution': 0.01098632812500002, 'scale': 4622333.678977588 },
        //                 { 'level': 8, 'resolution': 0.00549316406250001, 'scale': 2311166.839488794 },
        //                 { 'level': 9, 'resolution': 0.0027465820312500017, 'scale': 1155583.419744397 },
        //                 { 'level': 10, 'resolution': 0.0013732910156250009, 'scale': 577791.7098721985 },
        //                 { 'level': 11, 'resolution': 0.000686645507812499, 'scale': 288895.85493609926 },
        //                 { 'level': 12, 'resolution': 0.0003433227539062495, 'scale': 144447.92746804963 },
        //                 { 'level': 13, 'resolution': 0.00017166137695312503, 'scale': 72223.96373402482 },
        //                 { 'level': 14, 'resolution': 0.00008583068847656251, 'scale': 36111.98186701241 },
        //                 { 'level': 15, 'resolution': 0.000042915344238281406, 'scale': 18055.990933506204 },
        //                 { 'level': 16, 'resolution': 0.000021457672119140645, 'scale': 9027.995466753102 },
        //                 { 'level': 17, 'resolution': 0.000010728836059570307, 'scale': 4513.997733376551 },
        //                 { 'level': 18, 'resolution': 0.000005364418029785169, 'scale': 2256.998866688275 }
        //             ]
        //         })
        //         this.loaded = true
        //         this.onLoad(this)
        //     },
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=vec_c&tk=ef19e059af3882366e92a0c552bf9f4c&X=' + col + '&' + 'Y=' + row + '&' + 'L=' + level
        //     }
        // })
        // // 行政区划图文字标注
        // // eslint-disable-next-line no-undef
        // dojo.declare('TDTWordLayer', TDTLayer, {
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=cva_c&tk=ef19e059af3882366e92a0c552bf9f4c&x=' + col + '&y=' + row + '&l=' + level
        //     }
        // })
        // // 影像地图
        // // eslint-disable-next-line no-undef
        // dojo.declare('TDTImageLayer', TDTLayer, {
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=img_c&tk=ef19e059af3882366e92a0c552bf9f4c&X=' + col + '&Y=' + row + '&L=' + level
        //     }
        // })
        // // 影像地图 文字标注
        // // eslint-disable-next-line no-undef
        // dojo.declare('TDTImageWordLayer', TDTLayer, {
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=cia_c&tk=ef19e059af3882366e92a0c552bf9f4c&X=' + col + '&Y=' + row + '&L=' + level
        //     }
        // })
        // // 地形图
        // // eslint-disable-next-line no-undef
        // dojo.declare('TDTTerrainLayer', TDTLayer, {
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=ter_c&tk=ef19e059af3882366e92a0c552bf9f4c&X=' + col + '&Y=' + row + '&L=' + level
        //     }
        // })
        // // 地形图 文字标注
        // // eslint-disable-next-line no-undef
        // dojo.declare('TDTTerrainWordLayer', TDTLayer, {
        //     getTileUrl(level, row, col) {
        //         return 'http://t0.tianditu.gov.cn/DataServer?T=cta_c&tk=ef19e059af3882366e92a0c552bf9f4c&X=' + col + '&Y=' + row + '&L=' + level
        //     }
        // })

        /* 行政区划 */
        const xz = WebTiledLayer(
            // eslint-disable-next-line no-template-curly-in-string
            'http://${subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL=${col}&TILEROW=${row}&TILEMATRIX=${level}&tk=ef19e059af3882366e92a0c552bf9f4c', {
                subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
            })

        /* 影像图 */
        const yx = WebTiledLayer(
            // eslint-disable-next-line no-template-curly-in-string
            'http://${subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL=${col}0&TILEROW=${row}&TILEMATRIX=${level}&tk=ef19e059af3882366e92a0c552bf9f4c', {
                subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
            })
        /* 地形图 */
        const dx = WebTiledLayer(
            // eslint-disable-next-line no-template-curly-in-string
            'http://${subDomain}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL=${col}&TILEROW=${row}&TILEMATRIX=${level}&tk=ef19e059af3882366e92a0c552bf9f4c', {
                subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
            })
        /* 文字标注 */
        const text = WebTiledLayer(
            // eslint-disable-next-line no-template-curly-in-string
            'http://${subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL=${col}&TILEROW=${row}&TILEMATRIX=${level}&tk=ef19e059af3882366e92a0c552bf9f4c', {
                subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
            })
        map.addLayer(xz)
        map.addLayer(text)
    }
    // initMap(map) {
    //     // 行政区划图
    //     const xz = new TDTLayer()
    //     const xzLayer = new TDTWordLayer()
    //     // 地形图
    //     const dx = new TDTTerrainLayer()
    //     const dxLayer = new TDTTerrainWordLayer()
    //     // 卫星图
    //     const wx = new TDTImageLayer()
    //     const wxLayer = new TDTImageWordLayer()
    //     // 添加底图
    //     map.addLayer(xz, 1)
    //     map.addLayer(xzLayer, 5)
    // }
}
export default baseMap
