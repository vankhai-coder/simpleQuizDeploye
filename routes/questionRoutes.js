import express from 'express'
import Question from '../models/questionModel.js'
import Quiz from '../models/quizModel.js'
import mongoose from 'mongoose'
import { addMultipleQuestion, addNewQuestion, deleteQuestionById } from '../controllers/questionController.js'
const router = express.Router()

// add new question : 
router.post('/:quizId/', addNewQuestion)

// add multiple questions : 
router.post('/:quizId/multiple', addMultipleQuestion)

// delete question by id : 
router.delete('/:id', deleteQuestionById)


// export router : 
export default router 