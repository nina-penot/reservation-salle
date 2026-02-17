import { Router } from 'express';
import { makeReservation, deleteReservation, editReservation } from '../controllers/reserv.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const res_router = Router();

//all protected as it's only when logged in
res_router.post('/', authMiddleware, makeReservation);
res_router.put('/:id', authMiddleware, editReservation);
res_router.delete('/:id', authMiddleware, deleteReservation);

export default res_router;