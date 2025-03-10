import express from 'express'
import { createNewQuiz, deleteQuizWithId, getAllQuiz, getQuizById } from '../controllers/quizController.js'


const router = express.Router()

// get quiz by id : 
router.get('/:quizId', getQuizById)

// get all quizzes : 
router.get('/', getAllQuiz)

// create new quize : 
router.post('/', createNewQuiz)

// delete quize with id : 
router.delete('/:id', deleteQuizWithId)


// export router : 
export default router 