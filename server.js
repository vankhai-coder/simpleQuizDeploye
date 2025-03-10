import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/db.js'

// import route : 
import quizRoutes from './routes/quizRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import userRoutes from './routes/userRoutes.js'
import resultRoutes from './routes/resultRoutes.js'
import Quiz from './models/quizModel.js'
import Question from './models/questionModel.js'

// init app : 
const app = express()

// port : 
const PORT = process.env.PORT || 5001

// middleware : 
app.use(express.json())

// set view engine : 
app.set('view engine', 'ejs') // set ejs is the view engine 
app.set('views', './views') // set folder views contain all ejs file 

// log request : 
app.use((req, res, next) => {
    console.log(`Request Info : ${req.method} ${req.url}`);
    next()
})
// home page route : 
app.get("/", (req, res) => {
    return res.render("index.ejs", { title: "Trang chủ", message: "Chào mừng bạn đến với EJS!" });
});

// quiz routes for ejs (assg-2)
app.get('/quiz', async (req, res) => {
    // get list quizs : 
    const quizs = await Quiz.find({}).select('title description').sort({ createdAt: -1 })
    return res.render('quiz.ejs', { quizs })
})
app.get('/quiz/detail/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params
        if (!quizId) {
            return res.render('index.ejs')
        }
        // get quiz by id : 
        const quiz = await Quiz.findById(quizId).populate('questions')
        const quiz2 = await Quiz.findById(quizId).select('questions')
        if (!quiz) {
            return res.render('index.ejs')
        }
        // get list of question that can added in to this quiz : 
        const availableQuestions = await Question.find({ _id: { $nin: quiz2.questions } })
        // const availableQuestions = []

        // response by ejs : 
        return res.status(200).render('quiz-detail.ejs', { quiz, availableQuestions })
    } catch (error) {
        console.log('error in /quiz/detail :', error.message);
        return
    }
})

app.delete('/quiz/delete/:quizId/:questionId', async (req, res) => {
    try {
        const { quizId, questionId } = req.params
        if (!quizId || !questionId) {
            return res.json({ message: 'quizId or questionId is missing!' })
        }
        const quiz = await Quiz.findByIdAndUpdate(quizId,
            { $pull: { questions: questionId } },
            { new: true }
        )
        if (!quiz) {
            return res.json({ message: 'delete questions in quiz fail' })
        }
        return res.status(200).json({})
    } catch (error) {
        console.log(error);
    }
})

app.post('/quiz/:quizId/:questionId', async (req, res) => {
    try {
        const { quizId, questionId } = req.params
        if (!quizId || !questionId) {
            return res.status(400).json({ message: 'quizId or questionId is missing!' })
        }
        // add questionId in to quiz : 
        const quiz = await Quiz.findByIdAndUpdate(quizId,
            { $push: { questions: questionId } },
            { new: true }
        )
        if (!quiz) {
            return res.status(400).json({})
        }
        return res.status(200).json({})
    } catch (error) {
        console.log(error);
    }
})
app.get('/question', async (req, res) => {
    try {
        const questions = await Question.find({}).sort({ createdAt: -1 })
        return res.render('question.ejs', { questions })
    } catch (error) {
        console.log(error);
    }
})
app.delete('/question/delete/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params
        if (!questionId) {
            return res.status(400).json({})
        }
        const deletedQuestion = await Question.findByIdAndDelete(questionId)
        if (!deletedQuestion) {
            return res.status(400).json({})
        }
        return res.status(200).json({})
    } catch (error) {
        console.log(error);

    }
})

app.post('/question/create', async (req, res) => {
    try {
        const { text, options, correctAnswerIndex } = req.body
        if (!text || !options || !correctAnswerIndex) {
            return res.status(400).json({})
        }
        // change options to correct schema format : 
        const correctOptionsFormat = options.trim().split(',')
        //change correctAnswerIndex to correct schema format : 
        const correctAnswerIndexFormat = correctAnswerIndex.trim().split(',')
        const newQuestion = await Question.create({ text, options: correctOptionsFormat, correctAnswerIndex: correctAnswerIndexFormat })
        if (!newQuestion) {
            return res.status(400).json({})
        }
        return res.status(201).json({})
    } catch (error) {
        console.log(error);

    }
})

app.put('/question/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params
        if (!questionId) {
            return res.status(400).json({})
        }
        const { text, options, correctAnswerIndex } = req.body
        // change options to correct schema format : 
        const correctOptionsFormat = options.trim().split(',')
        //change correctAnswerIndex to correct schema format : 
        const correctAnswerIndexFormat = correctAnswerIndex.trim().split(',')
        console.log('req.body : ' , req.body);
        
        const updatedQuestion = await Question.findByIdAndUpdate(questionId, { $set: { text , options : correctOptionsFormat , correctAnswerIndex : correctAnswerIndexFormat} })
        return res.status(200).json({})
    } catch (error) {
        console.log(error);

    }
})

// quiz routes : 
app.use('/quizzes', quizRoutes)

// question routes : 
app.use('/questions', questionRoutes)

// user routes : 
app.use('/users', userRoutes)

// result routes : 
app.use('/results', resultRoutes)
// listen port : 
app.listen(PORT, (req, res) => {
    console.log(`App running on http://localhost:${PORT}`);
    // connect to db : 
    connectDB()
})