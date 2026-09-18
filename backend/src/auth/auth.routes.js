import { Router } from 'express';
import { login } from './auth.controller.js';
import { loginSchema } from './auth.schema.js';
import { validateSchema } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/', validateSchema(loginSchema), login);

export default router;
