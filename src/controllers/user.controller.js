import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'


export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        status : 'Active'
       
    })
    //Si no envia un rol, el rol predeterminado es User
    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map((role) => role._id)
    } else {
        const role = await Role.findOne({ name: 'user' })
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
   
    //token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, //24 hours
    })
    res.json({ token })
}

export const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404).json('user not found')
    } else {
        res.status(200).json(user)
    }
}

export const updateUserById = async (req, res) => {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(userUpdated)
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const newUsername = req.body.username

        user.username = newUsername

        await user.save()

        res.status(200).json({ message: 'Username updated successfully' })
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const newPassword = await User.encryptPassword(req.body.password)

        user.password = newPassword

        await user.save()

        res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
        res.status(401).json(`An error has occured: ${error}`)
    }
}

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)

    res.status(204).json()
}
