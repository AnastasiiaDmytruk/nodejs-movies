export const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      // const { status = 500 } = error; // Отримуємо статус помилки або 500 за замовчуванням
      // res.status(status).json({
      //   status,
      //   message: error.message,
      // });
      next(error); // якщо в next передати помилку він буде шукати обробник помилок 4 параметрами(err, req, res, next)і там її обробляти
    }
  };
};
