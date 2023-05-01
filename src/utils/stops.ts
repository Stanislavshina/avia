function inflectStopsNumber(number: number) {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['пересадка', 'пересадки', 'пересадок'];
  return number + ' ' + titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
}

export default inflectStopsNumber;
