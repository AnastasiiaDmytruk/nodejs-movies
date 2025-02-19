// Проблеми і вирішення:
// 1. Перевірити чи взагалі передали значення
// 2. Чи можна з нього зробити число?
// 3. Повернути значення за замовчуванням чи число
// Так як ці дії необхідно виконати з обома значеннями(page, perPage), створюємо ф-цію.

const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  // або зробити це простіше:
  // if(typeof number !== "string")return defaultValue

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
