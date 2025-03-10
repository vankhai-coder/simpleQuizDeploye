import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quizArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        default: []
    }]
})

const User = mongoose.model('User', userSchema)
export default User