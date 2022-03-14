import { Schema, model } from 'mongoose'
export const ROLE = ['admin', 'moderator', 'user']
const roleSchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
)
export default model('Role', roleSchema)
