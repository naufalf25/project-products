const formatDate = (dateString, locale = "en-US") => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0; // Hindari pembagian dengan nol

  const total = numbers.reduce((sum, num) => sum + num, 0);
  return (total / numbers.length).toFixed(1);
};

export { formatDate, calculateAverage };
