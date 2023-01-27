import { Router } from 'express'
import { ensureAuthenticate } from './middlewares/ensureAuthenticate'
import { AuthenticateUserController } from './modules/account/useCases/authenticateUser/AuthenticateUserController'
import { GetProfileController } from './modules/account/useCases/getProfile/GetProfileController'
import { GetUserController } from './modules/users/useCases/getUser/GetUserController'
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from './modules/account/useCases/updateUserAvatar/UpdateUserAvatarController'
import { UpdateUserBioController } from './modules/account/useCases/updateUserBio/UpdateUserBioController'
import { CreateLinkController } from './modules/links/useCases/createLink/CreateLinkController'
import { GetLinksController } from './modules/links/useCases/getLinks/GetLinksController'
import { DeleteLinkController } from './modules/links/useCases/deleteLink/DeleteLinkController'

import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const createUserController = new CreateUserController()
const getUserController = new GetUserController()

const authenticateUserController = new AuthenticateUserController()
const getProfileController = new GetProfileController()
const updateUserAvatarController = new UpdateUserAvatarController()
const updateUserBioController = new UpdateUserBioController()
const createLinkController = new CreateLinkController()
const getLinksController = new GetLinksController()
const deleteLinkController = new DeleteLinkController()

const upload = multer(uploadConfig)

/* users */
routes.post('/users', createUserController.handle)
routes.get('/users/:id', getUserController.handle)

/* session */
routes.get('/me', ensureAuthenticate, getProfileController.handle)
routes.post('/session', authenticateUserController.handle)
routes.patch('/users', ensureAuthenticate, updateUserBioController.handle)
routes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  updateUserAvatarController.handle,
)

/* links */
routes.post('/links', ensureAuthenticate, createLinkController.handle)
routes.get('/links', ensureAuthenticate, getLinksController.handle)
routes.delete('/links/:id', ensureAuthenticate, deleteLinkController.handle)

export { routes }
