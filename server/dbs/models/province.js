import mongoose from 'mongoose'
const Schema = mongoose.Schema
const province = new Schema({
    id: {
        type: 'String',
        require: true // 判断是否必须
    },
    name: {
        type: 'String',
        require: true
    }
})
export default mongoose.model('Province', province)
