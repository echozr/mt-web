const state = () => ({
    Menu: []
})

const mutations = {
    setMenu(state, val) {
        state.Menu = val
    }
}
const actions = {
}
export default { namespaced: true, state, mutations }
