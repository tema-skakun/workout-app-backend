import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workoutRoutes';
import { Workout } from './models/Workout';
import { User } from './models/User';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/workouts', workoutRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
});

afterEach(async () => {
  await Workout.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Workout API', () => {
  let userToken: string;
  let workoutId: string;

  beforeAll(async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password'
    });
    await user.save();

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    userToken = response.body.token;

    const workoutResponse = await request(app)
      .post('/api/workouts')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Morning Routine',
        exercises: [{ name: 'Push-ups' }, { name: 'Squats' }],
        warmupTime: 5,
        exerciseTime: 30,
        restTime: 10,
        rounds: 3,
        restBetweenRounds: 60
      })
      .expect(201);

    workoutId = workoutResponse.body._id;
  });

  it('should get a workout by id', async () => {
    const response = await request(app)
      .get(`/api/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', workoutId);
    expect(response.body.name).toBe('Morning Routine');
  });

});
