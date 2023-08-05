export function utcDate(date?: string) {
  const newDate = date ? new Date(date) : new Date();
  const utcDate = new Date(
    newDate.getTime() + newDate.getTimezoneOffset() * 60000
  );

  return utcDate;
}
