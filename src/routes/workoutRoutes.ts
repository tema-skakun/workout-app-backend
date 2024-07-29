import { Router } from 'express';
import { createWorkout, getWorkouts, updateWorkout, deleteWorkout, getWorkout } from '../controllers/workoutController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createWorkout);
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
