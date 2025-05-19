/**
 * Formats a date/time value into a string with the format "dd/MM/yyyy HH:mm:ss".
 *
 * @param date - The date or date string to format.
 * @returns The formatted date and time string.
 *
 * @example
 * formatDateTime(new Date('2024-06-01T15:30:45Z')); // "01/06/2024 15:30:45"
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1); // Months are 0-indexed
  const year = d.getFullYear();

  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Formats a date/time value into a string with the format "dd/MM/yyyy".
 *
 * @param date - The date or date string to format.
 * @returns The formatted date string.
 *
 * @example
 * formatDate('2024-06-01'); // "01/06/2024"
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/**
 * Formats a date/time value into a string with the format "HH:mm:ss".
 *
 * @param date - The date or date string to format.
 * @returns The formatted time string.
 *
 * @example
 * formatTime('2024-06-01T15:30:45Z'); // "15:30:45"
 */
export function formatTime(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
