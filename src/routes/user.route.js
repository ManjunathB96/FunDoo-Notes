import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth, resetAuthorization } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.newRegistration);

//route to login user
router.post('/login',userController.login);

//route to forget password 
router.post('/forgetPwd',userController.forgetPwd);

 //route to reset Password
router.post('/resetPwd/:token',  resetAuthorization , userController.resetPassword);



export default router;

