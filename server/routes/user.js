import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();
const { create, login } = UserController;

router.post('/auth/signup', create);

router.post('/auth/login', login);

export default router;
