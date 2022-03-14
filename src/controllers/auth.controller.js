import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'
import { nodemailer } from '../middlewares'


let characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let code = ''
for (let i = 0; i < 25; i++) {
    code += characters[Math.floor(Math.random() * characters.length)]
}
console.log(code)


export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        confirmationCode: code,
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

    nodemailer.sendConfirmationEmail(
        newUser.username,
        newUser.email,
        newUser.confirmationCode
    )
   
    //token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, //24 hours
    })
    res.json({ token })
}

export const signIn = async (req, res) => {
    const { email, password } = req.body
    const userFound = await User.findOne({ email }).populate('roles')

    if (!userFound) return res.status(400).json({ message: 'User not found' })
    const matchPassword = await User.comparePassword(
        password,
        userFound.password
    )

    if (!matchPassword)
        return res
            .status(401)
            .json({ token: null, message: 'Invalid password' })

    console.log(userFound)

    if (userFound.status != 'Active') {
        return res.status(401).send({
            message: 'Pending Account. Please Verify Your Email!',
        })
    }

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, //24 hours
    })
    res.json({ token })
}

export const verifyUser = async (req, res, next) => {
    await User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(404).send({ message: 'User Not found.' })
            }
            user.status = 'Active'
           // user.confirmationCode= ''
            
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
            })
        })
        .catch((e) => console.log('error', e))
        next()
}
