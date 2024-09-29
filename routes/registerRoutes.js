import express from 'express';
import * as registerController from '../controllers/registerController.js';

const router = express.Router('/register');

router.get('/', registerController.registerGetController);

router.post('/', registerController.registerPostController);

export default router

