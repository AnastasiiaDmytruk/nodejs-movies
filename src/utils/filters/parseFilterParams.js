const parseNumber = (number) => {
  if (typeof number !== 'string') return null; // or just return (then it`ll return undefined)

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return null; // or just return (then it`ll return undefined)

  return parsedNumber;
};

export const parseFilterParams = ({ minReleaseYear, maxReleaseYear }) => {
  const parsedMinReleaseYear = parseNumber(minReleaseYear);
  const parsedMaxReleaseYear = parseNumber(maxReleaseYear);

  return {
    minReleaseYear: parsedMinReleaseYear,
    maxReleaseYear: parsedMaxReleaseYear,
  };
};
