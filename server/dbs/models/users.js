import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: 'String',
        unique: true, // 判断是否唯一
        require: true // 判断是否必须
    },
    password: {
        type: 'String',
        require: true
    },
    email: {
        type: 'String',
        require: true
    }
})
export default mongoose.model('User', userSchema)
