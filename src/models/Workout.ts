import { Schema, model, Document } from 'mongoose';

interface IExercise {
  name: string;
}

interface IWorkout extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  exercises: IExercise[];
  warmupTime: number;
  exerciseTime: number;
  restTime: number;
  rounds: number;
  restBetweenRounds: number;
}

const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true }
});

const workoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [exerciseSchema],
  warmupTime: { type: Number, required: true },
  exerciseTime: { type: Number, required: true },
  restTime: { type: Number, required: true },
  rounds: { type: Number, required: true },
  restBetweenRounds: { type: Number, required: true }
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
