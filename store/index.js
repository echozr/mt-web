
export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        const { status: status0, data: { province, city } } = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition', status0 === 200 ? { city, province } : { city: '', province: '' })
        const { status: status1, data: { menu } } = await app.$axios.get('/geo/menu')
        commit('home/setMenu', status1 === 200 ? menu : [])
    }
}
