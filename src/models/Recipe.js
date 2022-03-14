import { Schema, model } from 'mongoose'
const RecipeSchema = new Schema(
    {
        title: String,
        description: String,
        ingredients: String,
        procedure: String,
        preparation_Time: Number,
        cooking_Time: Number,
        imgUrl: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
export default model('Recipe', RecipeSchema)
