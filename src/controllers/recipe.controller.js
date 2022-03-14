import Recipe from '../models/Recipe'

export const createRecipe = async (req, res) => {
    const {
        title,
        description,
        ingredients,
        procedure,
        preparation_Time,
        cooking_Time,
        imgUrl,
    } = req.body
    const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        procedure,
        preparation_Time,
        cooking_Time,
        imgUrl,
    })
    const recipeSaved = await newRecipe.save()
    res.status(200).json(recipeSaved)
}

export const getRecipes = async (req, res) => {
    const recipes = await Recipe.find()
    res.json(recipes)
}

export const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
}

export const updateRecipeById = async (req, res) => {
    const recipeUpdated = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(recipeUpdated)
}

export const deleteRecipeById = async (req, res) => {
    await Recipe.findByIdAndDelete(req.params)
    res.status(204).json()
}
