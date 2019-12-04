const state = () => ({
    position: {}
})

const mutations = {
    setPosition(state, val) {
        state.position = val
    }
}
const actions = {
}
export default { namespaced: true, state, mutations }
