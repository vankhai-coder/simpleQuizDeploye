import express from 'express'

// import controller : 
import { addQuizForUser, createNewUser, getAllQuizOfUser } from '../controllers/userController.js'
const router = express.Router()

// create new user : 
router.post('/', createNewUser)
// add quiz for user by quizid : 
router.post('/addQuiz/:userId/:quizid', addQuizForUser)
// get all quizs of user : 
router.get('/getAllQuiz/:userId', getAllQuizOfUser)

// export router : 
export default router 