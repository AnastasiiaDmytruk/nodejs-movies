import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDB(); //await очікує завершення підключення до MongoDb, після успішного підключення до Бази Даних викликається ф-ція яка запускає сервер
  startServer();
};

bootstrap();
