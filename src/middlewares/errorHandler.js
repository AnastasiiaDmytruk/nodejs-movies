import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  console.log('My-error in ErrorHandler', error);
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'SOmething went wrong',
    data: error.message,
  });
};
