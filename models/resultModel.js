import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userAnswer: [[{
        type: Number,
        min: 0
    }]],
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Result', resultSchema)