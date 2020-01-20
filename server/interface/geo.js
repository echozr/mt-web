import Router from 'koa-router'
import Menu from '../dbs/models/menus'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'
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
// 获取省
router.get('/province', async (ctx) => {
    // const province = await Province.find()
    // // eslint-disable-next-line no-restricted-syntax
    // console.log(province)
    // ctx.body = {
    //     province: province.map((item) => {
    //         return {
    //             id: item.id,
    //             name: item.name
    //         }
    //     })
    // }
    const { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
    ctx.body = {
        province: status === 200 ? province : []
    }
})
// 通过ID获取数据
router.get('/province/:id', async (ctx) => {
    // let city = await City.findOne({id: ctx.params.id})
    //
    // ctx.body = {
    //   code: 0,
    //   city: city.value.map(item => {
    //     return {province: item.province, id: item.id, name: item.name}
    //   })
    // }
    const { status, data: {
        city
    } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
    if (status === 200) {
        ctx.body = {
            city
        }
    } else {
        ctx.body = {
            city: []
        }
    }
})
// 获取市
router.get('/city', async (ctx) => {
    // let city = []
    // const result = await City.find()
    // result.forEach((item) => {
    //     city = city.concat(item.value)
    // })
    // ctx.body = {
    //     code: 0,
    //     city: city.map((e) => {
    //         const dataItem = {
    //             province: e[0].province,
    //             id: e[0].id,
    //             name: e[0].name === '市辖区' || e[0].name === '省直辖县级行政区划' ? e[0].province : e[0].name
    //         }
    //         // eslint-disable-next-line no-restricted-syntax
    //         console.log(dataItem)
    //         return dataItem
    //     })
    // }
    const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`)
    if (status === 200) {
        ctx.body = {
            city
        }
    } else {
        ctx.body = {
            city: []
        }
    }
})
// 获取热门城市
router.get('/hotCity', async (ctx) => {
    // let list = [
    //   '北京市',
    //   '上海市',
    //   '广州市',
    //   '深圳市',
    //   '天津市',
    //   '西安市',
    //   '杭州市',
    //   '南京市',
    //   '武汉市',
    //   '成都市'
    // ]
    // let result = await City.find()
    // let nList = []
    // result.forEach(item => {
    //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    // })
    // ctx.body = {
    //   hots: nList
    // }
    const { status, data: {
        hots
    } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
    if (status === 200) {
        ctx.body = {
            hots
        }
    } else {
        ctx.body = {
            hots: []
        }
    }
})

export default router
