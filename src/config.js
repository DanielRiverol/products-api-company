import {config} from 'dotenv'
config()



module.exports= {
    SECRET: process.env.SECRET,
    MONGODB_URI: process.env.MONGODB_URI||"mongodb://localhost/recipe"
}