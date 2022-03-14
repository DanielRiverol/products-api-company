import { Router } from 'express'
import * as userCtrl from '../controllers/user.controller'
import { authJwt, verifySignUp } from '../middlewares'
const router = Router()

router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRoleExisted],
    userCtrl.createUser
)

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers)

router.get('/:id', [authJwt.verifyToken], userCtrl.getUserById)

router.put('/:id', [authJwt.verifyToken], userCtrl.updateUserById)

router.patch('/update-profile/:id', [authJwt.verifyToken], userCtrl.updateProfile)

router.patch('/update-password/:id', [authJwt.verifyToken], userCtrl.updatePassword)

router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    userCtrl.deleteUserById
)
router.get('/user', [authJwt.verifyToken])

router.get('/mod', [authJwt.verifyToken, authJwt.isModerator])

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin])

export default router
