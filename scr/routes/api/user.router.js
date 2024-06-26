import { Router } from 'express'
import UserController from '../../controllers/users.controller.js'

const router = Router()
const{
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}= new UserController()
// edpoint para traer los usuarios /api/users
router.get('/',getUsers )
// edpoint para traer un usuario
router.get('/', getUser)
// enpoint para crear un usuario
router.post('/', createUser )
// Endpoint para actualizar un usuario
router.put('/:uid',updateUser)
// endpoint para eliminar un usuario
router.delete('/:uid', deleteUser )


export default router