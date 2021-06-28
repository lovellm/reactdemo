export function fakeDataProcess(inMs) {
  const ms = Number.isInteger(inMs) ? inMs : 1000;
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
  return Math.floor(Math.random() * 100);
}

export function fakeDataProcessAsync(inMs) {
  const ms = Number.isInteger(inMs) ? inMs : 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, ms);
  });
}