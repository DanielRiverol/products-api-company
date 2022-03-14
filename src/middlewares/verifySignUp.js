import { ROLE } from '../models/Role'
import User from '../models/User'

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user)
            return res.status(400).json({ message: 'The user already exists' })
        const email = await User.findOne({ email: req.body.email })
        if (email)
            return res.status(400).json({ message: 'The email already exists' })

        next()
    } catch (error) {
        console.error(error)
    }
}

export const checkRoleExisted = (req, res, next) => {
    
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLE.includes(req.body.roles[i])) {
                    return res.status(400).json({
                        messages: `Role ${req.body.roles[i]} does not exists`,
                    })
                }
            }
        }
        next()
    
}
