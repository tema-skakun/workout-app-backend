// src/authController.test.ts
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { User } from './models/User';

// Инициализация окружения
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Перед каждым тестом подключаемся к базе данных
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
});

// После каждого теста очищаем базу данных
afterEach(async () => {
  await User.deleteMany({});
});

// После завершения всех тестов закрываем соединение с базой данных
afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'yourpassword',
      })
      .expect(201);

    expect(response.body).toHaveProperty('token');
  });

  // Добавьте другие тесты, например, для логина
});
