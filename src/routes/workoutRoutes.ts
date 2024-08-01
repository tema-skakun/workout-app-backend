import { Router } from 'express';
import { createWorkout, getWorkouts, updateWorkout, deleteWorkout, getWorkout } from '../controllers/workoutController';
import { authMiddleware } from '../middleware/authMiddleware';
import {body} from "express-validator";

const router = Router();

router.use(authMiddleware);

router.post(
  '/',
  [
    body('warmupTime').isInt({ min: 5 }).withMessage('Warmup time must be at least 5 seconds'),
    body('exerciseTime').isInt({ min: 5 }).withMessage('Exercise time must be at least 5 seconds'),
    body('restTime').isInt({ min: 5 }).withMessage('Rest time must be at least 5 seconds'),
    body('restBetweenRounds').isInt({ min: 5 }).withMessage('Rest between rounds must be at least 5 seconds'),
  ],
  createWorkout
);

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.put(
  '/:id',
  [
    body('warmupTime').isInt({ min: 5 }).withMessage('Warmup time must be at least 5 seconds'),
    body('exerciseTime').isInt({ min: 5 }).withMessage('Exercise time must be at least 5 seconds'),
    body('restTime').isInt({ min: 5 }).withMessage('Rest time must be at least 5 seconds'),
    body('restBetweenRounds').isInt({ min: 5 }).withMessage('Rest between rounds must be at least 5 seconds'),
  ],
  updateWorkout
);

router.delete('/:id', deleteWorkout);

export default router;
