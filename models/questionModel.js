import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswerIndex: [{
        type: Number,
        required: true,
        min: 0,
    }]
} , {timestamps : true})

const Question = mongoose.model('Question', questionSchema)
export default Question