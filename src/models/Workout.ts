import { Schema, model, Document } from 'mongoose';

interface IExercise {
  name: string;
}

interface IWorkout extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  exercises: IExercise[];
  warmupTime: number; // Время разминки в секундах
  exerciseTime: number; // Время упражнения в секундах
  restTime: number; // Время отдыха между упражнениями в секундах
  rounds: number; // Количество раундов
  restBetweenRounds: number; // Время отдыха между раундами в секундах
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
