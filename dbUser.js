import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    first: String,
    last: String,
    email: String,
    password: String
})

export default mongoose.model('users', userSchema)