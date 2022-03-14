
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pkg from '../package.json'
import recipeRoute from './routes/recipes.route'
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import homeRoute from './routes/home.route'

import { CreateRoles } from './libs/initialSetup'

//init
const app = express()
CreateRoles()

//Settings
app.set('PORT', process.env.PORT || 3000)
const corsOptions = {}

app.set('pkg', pkg)

//middlewares
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//route inicial
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
        version: app.get('pkg').version,
    })
})
app.use('/api/v1/recipes', recipeRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1', homeRoute)

export default app
