// src/routes/workoutRoutes.ts
import { Router } from 'express';
import { createWorkout, getWorkouts, updateWorkout, deleteWorkout } from '../controllers/workoutController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);
router.post('/', createWorkout);
router.get('/', getWorkouts);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
