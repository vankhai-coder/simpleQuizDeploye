import express from 'express'
import { userDoQuiz } from "../controllers/resultController.js";

const router = express.Router()

// user do quiz : 
router.post('/:userId/:quizId' , userDoQuiz )

export default router 