import { Router } from 'express'
import * as recipeCtrl from '../controllers/recipe.controller'
import { authJwt } from '../middlewares'
const router = Router()

router.get('/', recipeCtrl.getRecipes)

router.get('/:_id', recipeCtrl.getRecipeById)

router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator],
    recipeCtrl.createRecipe
)

router.put(
    '/:_id',
    [authJwt.verifyToken, authJwt.isAdmin],
    recipeCtrl.updateRecipeById
)

router.delete(
    '/:_id',
    [authJwt.verifyToken, authJwt.isAdmin],
    recipeCtrl.deleteRecipeById
)

export default router
