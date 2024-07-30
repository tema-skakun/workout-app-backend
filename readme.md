# Backend Project

## Описание проекта

Этот проект представляет собой backend для приложения по управлению тренировками. В нем реализованы функциональные возможности регистрации и аутентификации пользователей, а также создания, получения, обновления и удаления тренировок.

## Установка и запуск проекта

Следуйте этим шагам для установки и запуска проекта на вашем локальном компьютере:

1. **Клонирование репозитория**

    ```sh
    git clone git@github.com:tema-skakun/workout-app-backend.git
    cd workout-app-backend
    ```

2. **Установка зависимостей**

   Убедитесь, что у вас установлены Node.js и npm. Затем установите все необходимые зависимости:

    ```sh
    npm install
    ```

3. **Настройка переменных окружения**

   Создайте файл `.env` в корневой директории проекта и добавьте в него следующие переменные окружения:

    ```env
    MONGODB_URI=your_mongodb_uri
    PORT=your_port
    JWT_SECRET=your_jwt_secret
    ```

4. **Компиляция TypeScript**

   Скомпилируйте проект из TypeScript в JavaScript:

    ```sh
    npm run build
    ```

5. **Запуск проекта**

   Запустите сервер:

    ```
    npm start
    ```

   Сервер будет запущен и доступен по адресу `http://localhost:<your_port>`.

## Тестирование

Проект включает тесты для контроллеров аутентификации и управления тренировками. Для запуска тестов используйте следующую команду:

```
npm test
```

## Структура проекта
- `src/middleware` - Middleware для валидации, аутентификации и обработки ошибок.

- `src/models` - Модели Mongoose для работы с MongoDB.

- `src/controllers` - Контроллеры для обработки запросов.

- `src/routes` - Маршруты для различных API эндпоинтов.

- `src/types` - Типы TypeScript для проекта.

- `src/tests` - Тесты для API.

## Основные зависимости
- express
- mongoose
- jsonwebtoken
- bcrypt
- express-validator
- ts-jest
- supertest
- dotenv
- cors

## Контакты
Если у вас есть вопросы или предложения, пожалуйста, свяжитесь со мной по [ссылке](https://t.me/tema_skakun).

