// зчитуємо змінні оточення які знаходяться в файлі .env
// змінні оточення- налаштування компютера на якому запускається код

import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
};
