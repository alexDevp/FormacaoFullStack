import express from 'express';
import controller from '../controllers/post';
const _router = express.Router();

_router.get('/posts', controller.getPosts);

export const router = _router;