const baseMap = {
    loadLayer (map, WebTiledLayer) {
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
}
export default baseMap
