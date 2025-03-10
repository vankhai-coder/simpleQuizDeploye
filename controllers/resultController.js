import mongoose from "mongoose"
import Quiz from "../models/quizModel.js"
import Result from '../models/resultModel.js'

export const userDoQuiz = async (req, res) => {
    try {
        const { userId, quizId } = req.params
        const { userAnswer } = req.body
        // check all field required : 
        if (!userId || !quizId || !userAnswer) {
            return res.status(400).json({ message: 'All field required' })
        }
        // check if id is valid mongodb objectId : 
        if (!mongoose.Types.ObjectId.isValid(quizId) ||!mongoose.Types.ObjectId.isValid(userId) ) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        // calculate score :
        let score = 0
        const quiz = await Quiz.findById(quizId).populate('questions').select('questions')

        // return res.json(quiz.questions)
        
        for (let i = 0; i < quiz.questions.length; i++) {
            console.log(userAnswer[i] , quiz.questions[i].correctAnswerIndex);
            
            score  += calculateScore(quiz.questions[i].correctAnswerIndex , userAnswer[i])
        }
        // add new result : 
        const createdResult = await Result.create({
            userId,
            quizId,
            score,
            userAnswer
        })
        return res.render("user/userDoQuiz.ejs" ,{quizData : createdResult})
    } catch (error) {
        console.log('fail run userDoQuiz : ', error.message);
        return res.status(400).json({ message: 'Error run userDoQuiz' })
    }
}

function calculateScore(correctAnswers, userAnswers) {
    const correctSet = new Set(correctAnswers);
    const userSet = new Set(userAnswers);
    
    const intersection = new Set([...correctSet].filter(x => userSet.has(x)));
    
    if (intersection.size === correctSet.size && intersection.size === userSet.size) {
        return 1; // Fully correct answer
    } else if (intersection.size > 0) {
        return 0.5; // Partially correct answer
    } else {
        return 0; // Wrong answer
    }
}

