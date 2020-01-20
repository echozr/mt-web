import Router from 'koa-router'
import category from '../dbs/models/category'
import axios from './utils/axios'

// eslint-disable-next-line import/no-mutable-exports
const router = new Router({
    prefix: '/category'
})
const sign = '85c955ab9dace161a6a5e21d01189ef7'
// 搜索分类
router.get('/classify', async (ctx) => {
    const city = ctx.query.city.replace('市', '') || '北京'
    // const result = await category.findOne({ city })
    // if (result) {
    //     ctx.body = {
    //         areas: result.areas,
    //         types: result.types
    //     }
    // } else {
    //     ctx.body = {
    //         areas: [],
    //         types: []
    //     }
    // }
    const { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
        params: {
            city,
            sign
        }
    })
    ctx.body = {
        areas: status === 200 ? areas : [],
        types: status === 200 ? types : []
    }
})

export default router
