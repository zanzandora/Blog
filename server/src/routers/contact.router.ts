import { getContact } from '@/controllers/contact.controller';
import { Router } from 'express';

const expressRouter = Router();

expressRouter.post('/', getContact);

export default expressRouter;
