import { Router } from 'express';
import { makeReservation, deleteReservation, editReservation, getReservationByDate, getReservationByID } from '../controllers/reserv.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const res_router = Router();

//all protected as it's only when logged in
res_router.post('/', authMiddleware, makeReservation);
res_router.put('/:id', authMiddleware, editReservation);
res_router.delete('/:id', authMiddleware, deleteReservation);
res_router.get('/search/id/:id', authMiddleware, getReservationByID);
res_router.get('/search/date/:date', authMiddleware, getReservationByDate);

export default res_router;