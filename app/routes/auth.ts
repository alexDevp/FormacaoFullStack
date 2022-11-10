import express from 'express';
import controller from '../controllers/auth';
const _router = express.Router();

_router.get('/login', controller.login);
_router.post('/signup', controller.signup);

export const router = _router;