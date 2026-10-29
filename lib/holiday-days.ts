/** Ordinary adult statutory minimum: 24 days / six-day week = four weeks of leave. */
export function minimumHolidayDays(workdaysPerWeek: number) {
  if (!Number.isInteger(workdaysPerWeek) || workdaysPerWeek < 1 || workdaysPerWeek > 6) {
    throw new RangeError("Expected a regular 1–6-day working week");
  }
  return 4 * workdaysPerWeek;
}
