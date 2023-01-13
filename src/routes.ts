import { Router } from 'express'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { AuthenticateUserController } from './modules/account/useCases/authenticateUser/AuthenticateUserController'
import { GetUserController } from './modules/users/useCases/getUser/GetUserController'
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from './modules/users/useCases/updateUserAvatar/UpdateUserAvatarController'
import { UpdateUserBioController } from './modules/users/useCases/updateUserBio/UpdateUserBioController'
import { CreateLinkController } from './modules/links/useCases/createLink/CreateLinkController'
import { GetLinksController } from './modules/links/useCases/getLinks/GetLinksController'

import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserController = new GetUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const updateUserBioController = new UpdateUserBioController()
const createLinkController = new CreateLinkController()
const getLinksController = new GetLinksController()

const upload = multer(uploadConfig)

/* users */
routes.post('/users', createUserController.handle)
routes.patch('/users', ensureAuthenticate, updateUserBioController.handle)
routes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  updateUserAvatarController.handle,
)

/* session */
routes.get('/me', ensureAuthenticate, getUserController.handle)
routes.post('/session', authenticateUserController.handle)

/* links */
routes.post('/links', ensureAuthenticate, createLinkController.handle)
routes.get('/links', ensureAuthenticate, getLinksController.handle)

export { routes }
