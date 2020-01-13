import mongoose from 'mongoose'
const Schema = mongoose.Schema
const city = new Schema({
    id: {
        type: 'String',
        require: true // 判断是否必须
    },
    value: {
        type: 'Array',
        require: true
    }
})
export default mongoose.model('City', city)
