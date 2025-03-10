import mongoose from "mongoose"
import User from "../models/userModel.js"

export const createNewUser = async (req, res) => {
    try {
        const name = req.body.name
        if (!name) {
            return res.status(400).json({ message: 'name is required1' })
        }
        const createdUser = await User.create({
            name
        })
        return res.status(200).json({ message: `create user with id ${createdUser.id}` })
    } catch (error) {
        console.log('fail to create user : ', error.message);
        return res.status(400).json({ message: 'Error when create user' })
    }
}

export const addQuizForUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const quizid = req.params.quizid
        if (!mongoose.Types.ObjectId.isValid(quizid) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        // add quiz for user :
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { quizArray: quizid } },
            { new: true }
        )
        console.log('userdatedUser ; ', updatedUser);
        return res.status(400).json({ message: 'Add quiz for user success!' })

    } catch (error) {
        console.log('fail to add quiz to user : ', error.message);
        return res.status(400).json({ message: 'Error when add quiz to user' })
    }
}

export const getAllQuizOfUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'id is not follow mongodb objectId format' })
        }
        // get all quiz for user : 
        const user = await User.findById(userId).populate({ path: 'quizArray', populate: { path: 'questions' } })
        if (!user) {
            return res.status(400).json({ message: 'Can not find user ' })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log('fail to get quiz for user : ', error.message);
        return res.status(400).json({ message: 'Error when get quiz for user' })
    }
}
