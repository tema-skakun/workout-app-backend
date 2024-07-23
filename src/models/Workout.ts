// src/models/User.ts
import { Schema, model, Document } from 'mongoose';

interface IExercise {
  name: string;
}

interface IWorkout extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  exercises: IExercise[];
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true }
});

const workoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [exerciseSchema]
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
