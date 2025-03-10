import mongoose from "mongoose";
import Quiz from "../models/quizModel.js";

export const getAllQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find({}).populate('questions')
        return res.status(200).json(quizzes)
    } catch (error) {
        console.log('Error when get all quizzes : ', error.message);
        return res.status(500).json({ message: 'Error when get all quizzes' })
    }
}

export const createNewQuiz = async (req, res) => {
    try {
        const { title, description } = req.body
        console.log('title :', title, 'description :', description);
        const saveQuize = await Quiz.create({
            title,
            description
        })
        console.log('create new quiz with id : ', saveQuize.id);

        return res.status(200).json({ message: `create new quiz with id ${saveQuize._id}` })
    } catch (error) {
        console.log('Error when create new quiz : ', error.message);
        return res.status(400).json({ message: 'Error when create quiz' })
    }
}

export const deleteQuizWithId = async (req, res) => {
    try {
        const id = req.params.id
        console.log('id: ', id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        const deletedQuiz = await Quiz.deleteOne({ _id: id })
        return res.status(200).json({ message: 'Delete successfully!' })
    } catch (error) {
        console.log('fail to delete : ', error.message);
        return res.status(400).json({ message: 'Error when delete' })
    }
}

export const getQuizById = async (req, res) => {
    try {
        const {quizId} = req.params
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        const quiz =await Quiz.findById(quizId)
        return res.status(200).json(quiz)
    } catch (error) {
        console.log('fail to get quiz by id : ', error.message);
        return res.status(400).json({ message: 'Error when get quiz by id' })
    }
}

export const deleteQuestionOutOfQuiz = async (req , res) => {
    try {
        
    } catch (error) {
        
    }
}