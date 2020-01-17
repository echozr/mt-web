const state = () => ({
    Menu: [],
    hotPlace: []
})

const mutations = {
    setMenu(state, val) {
        state.Menu = val
    },
    setHotPlace(state, val) {
        state.hotPlace = val
    }
}
const actions = {
}
export default { namespaced: true, state, mutations }
