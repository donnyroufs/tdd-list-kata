export function addDays(date: any, n: number): Date {
  const oneDayInMs = 86400 * 1000
  return new Date(Date.parse(date) + n * oneDayInMs)
}
