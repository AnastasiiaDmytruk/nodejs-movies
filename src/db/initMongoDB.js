import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = getEnvVar('MONGO_USER');
    const pwd = getEnvVar('MONGO_PASSWORD');
    const url = getEnvVar('MONGO_URL');
    const db = getEnvVar('MONGO_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection established successfully');
  } catch (error) {
    console.log('Error while setting up MongoDb connection', error);
    throw error;
  }
};
