<template>
<div />
</template>
<script>
export default {
    layout: 'blank',
    middleware: async (ctx) => {
        const { status, data } = await ctx.$axios.post('/users/exit')
        if (status === 200 && data.code === 1) {
            window.location.href = '/'
        }
    }
}
</script>
<style scoped>

</style>
