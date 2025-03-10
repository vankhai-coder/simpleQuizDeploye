import Question from "../models/questionModel.js"
import Quiz from "../models/quizModel.js"

export const addNewQuestion =  async (req, res) => {
    try {
        // get quizId : 
        const { quizId } = req.params
        // create new question : 
        const { text, options, keywords, correctAnswerIndex } = req.body
        if (!text || !options || !keywords || !correctAnswerIndex) {
            return res.status(400).json({ message: "All field required!" })
        }
        const createdQuestion = await Question.create({
            ...req.body
        })
        // update quiz with new question id : 
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { $addToSet: { questions: createdQuestion.id } },
            { new: true })
        // response : 
        return res.status(400).json({ message: 'Create new question successfully!' })

    } catch (error) {
        console.log('Error when crete question: ', error.message);
        return res.status(400).json({ message: 'Error when create question' })
    }
}
export const addMultipleQuestion = async (req, res) => {
    try {
        // get quizId : 
        const { quizId } = req.params
        // create new question : 
        const { arrayQuestions } = req.body
        if (!arrayQuestions) {
            return res.status(400).json({ message: "All field required!" })
        }
        const createdQuestions = await Question.insertMany(arrayQuestions)
        // console.log('createQuestions : ',createdQuestions);
        // get array of question id : 
        const questionIds = createdQuestions.map(q => q.id)
        // update quiz with new question id : 
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            quizId,
            { $addToSet: { questions: { $each: questionIds } } },
            { new: true })
        // response : 
        return res.status(200).json({ message: 'Create mutiple questions successfully!' })

    } catch (error) {
        console.log('Error when crete question: ', error.message);
        return res.status(400).json({ message: 'Error when create question' })
    }
}
export const deleteQuestionById =  async (req, res) => {
    try {
        const id = req.params.id
        console.log('id: ', id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        const deletedQuestion = await Question.findByIdAndDelete(id)
        console.log(deletedQuestion);
        return res.status(200).json({ message: 'Delete successfully' })

    } catch (error) {
        console.log('fail to delete : ', error.message);
        return res.status(400).json({ message: 'Error when delete' })
    }
}