import Router from 'koa-router'
import Menu from '../dbs/models/menus'
import axios from './utils/axios'

// eslint-disable-next-line import/no-mutable-exports
const router = new Router({
    prefix: '/geo'
})
const sign = '85c955ab9dace161a6a5e21d01189ef7'
// 获取城市
router.get('/getPosition', async (ctx) => {
    const { status, data } = await axios.get('https://api.asilu.com/weather_v2/')
    if (status === 200 && data) {
        ctx.body = {
            province: data.forecasts[0].province,
            city: data.forecasts[0].city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})
// 获取菜单
router.get('/menu', async (ctx) => {
    const result = await Menu.findOne()
    ctx.body = {
        menu: result.menu
    }
})
export default router
