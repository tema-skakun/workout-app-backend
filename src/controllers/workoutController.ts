import { Request, Response } from 'express';
import { Workout } from '../models/Workout';
import { JwtPayload } from "../types/jwt";

export const createWorkout = async (req: Request<{}, any, any, any, JwtPayload>, res: Response) => {
  const { name, exercises, warmupTime, exerciseTime, restTime, rounds, restBetweenRounds } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const workout = new Workout({
    user: req.user.id,
    name,
    exercises,
    warmupTime,
    exerciseTime,
    restTime,
    rounds,
    restBetweenRounds
  });

  await workout.save();
  res.status(201).json(workout);
};

export const getWorkouts = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const workouts = await Workout.find({ user: req.user.id });
  res.json(workouts);
};

export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const workout = await Workout.findOne({ _id: id, user: req.user.id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, exercises, warmupTime, exerciseTime, restTime, rounds, restBetweenRounds } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const workout = await Workout.findByIdAndUpdate(id, {
    name,
    exercises,
    warmupTime,
    exerciseTime,
    restTime,
    rounds,
    restBetweenRounds
  }, { new: true });

  res.json(workout);
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await Workout.findByIdAndDelete(id);
  res.status(204).send();
};
