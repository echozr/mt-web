import Router from 'koa-router'
import POI from '../dbs/models/poi'
import axios from './utils/axios'

// eslint-disable-next-line import/no-mutable-exports
const router = new Router({
    prefix: '/search'
})
const sign = '85c955ab9dace161a6a5e21d01189ef7'
// 搜索获取
router.get('/top', async (ctx) => {
    // try {
    //     const top = await POI.find({
    //         'name': new RegExp(ctx.query.input),
    //         city: ctx.query.city
    //     })
    //     ctx.body = {
    //         code: 0,
    //         top: top.map((item) => {
    //             return {
    //                 name: item.name,
    //                 type: item.type
    //             }
    //         }),
    //         type: top.length ? top[0].type : ''
    //     }
    // } catch (e) {
    //     ctx.body = {
    //         code: -1,
    //         top: []
    //     }
    // }
    const { status, data } = await axios.get('http://cp-tools.cn/search/top', {
        params: {
            input: ctx.query.input,
            city: ctx.query.city,
            sign
        }
    })
    if (status === 200 && data) {
        ctx.body = {
            top: data.top
        }
    } else {
        ctx.body = {
            top: []
        }
    }
})
// 热门搜索
router.get('/hotPlace', async (ctx) => {
    const { status, data: data1 } = await axios.get('https://api.asilu.com/weather_v2/')
    if (status === 200 && data1) {
        const city = data1.forecasts[0].city ? data1.forecasts[0].city.replace('市', '') : ctx.query.city
        // try {
        //     const result = await POI.find({
        //         city,
        //         type: ctx.query.type || '景点'
        //     }).limit(10)
        //     ctx.body = {
        //         code: 0,
        //         result: result.map((item) => {
        //             return {
        //                 name: item.name,
        //                 type: item.type
        //             }
        //         })
        //     }
        // } catch (e) {
        //     ctx.body = {
        //         code: -1,
        //         result: []
        //     }
        // }
        const { status, data } = await axios.get('http://cp-tools.cn/search/hotPlace', {
            params: {
                city,
                sign
            }
        })
        if (status === 200 && data) {
            ctx.body = {
                code: 0,
                result: data.result
            }
        } else {
            ctx.body = {
                code: -1,
                result: []
            }
        }
    } else {
        ctx.body = {
            code: -1,
            result: []
        }
    }
})

// 关键字搜索结果
router.get('/resultsByKeywords', async (ctx) => {
    const { city, keyWords } = ctx.query
    const { status, data } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
        params: {
            city,
            keyWords,
            sign
        }
    })
    if (status === 200 && data) {
        ctx.body = {
            code: 0,
            count: data.count,
            poi: data.pois
        }
    } else {
        ctx.body = {
            code: 0,
            count: 0,
            poi: []
        }
    }
})

export default router
