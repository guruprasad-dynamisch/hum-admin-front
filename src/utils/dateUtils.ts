import moment from 'moment';

// Date format constants for better maintainability
export enum DateFormat {
  FULL_DATE_TIME = 'FULL_DATE_TIME',           // October 2, 2023 at 9:02 AM
  FULL_DATE = 'FULL_DATE',                     // October 2, 2023
  SHORT_DATE = 'SHORT_DATE',                   // Oct 2, 2023
  RELATIVE_TIME = 'RELATIVE_TIME',             // ... time ago
  ISO_DATE = 'ISO_DATE',                       // 2024-01-08
  US_DATE = 'US_DATE',                         // 01/08/2024
  SHORT_DATE_TIME = 'SHORT_DATE_TIME',         // DEC 6, 2018 08:16 PM
  DASH_DATE = 'DASH_DATE',                     // 01-08-2024
  TIME_12H = 'TIME_12H',                       // 07:28 am
  UTC_TO_LOCAL_TIME = 'UTC_TO_LOCAL_TIME',     // Convert UTC Time to Local
  FULL_DATE_TIME_NO_AT = 'FULL_DATE_TIME_NO_AT', // October 2, 2023 9:02 AM
  US_DATE_TIME = 'US_DATE_TIME',               // 01/08/2024 9:02 AM
  TIME_12H_ALT = 'TIME_12H_ALT',               // Alternative time format
  UPPER_SHORT_DATE = 'UPPER_SHORT_DATE',       // OCT 2, 2023
  UPPER_SHORT_DATE_TIME = 'UPPER_SHORT_DATE_TIME', // OCT 2, 2023 9:02 AM
  TIMEZONE_DATE = 'TIMEZONE_DATE',             // Aug 2, 2024 at 5:43 PM GMT+5:30
  EST_FORMAT = 'EST_FORMAT',                   // 20-Dec-2024/22:10 EST
  UTC_TO_LOCAL_FULL = 'UTC_TO_LOCAL_FULL',     // Feb 11, 2025 05:51 AM
  DAY_MONTH_YEAR = 'DAY_MONTH_YEAR',          // 15 Oct, 2023
  UTC_FULL = 'UTC_FULL',                       // Feb 11, 2025 05:51 AM (UTC)
  UTC_TIMESTAMP = 'UTC_TIMESTAMP',             // 2025-04-04 14:23:30 (UTC)
  DAY_MONTH_YEAR_ALT = 'DAY_MONTH_YEAR_ALT',  // 2 Jul, 2025
  UTC_TO_LOCAL_DATE = 'UTC_TO_LOCAL_DATE',     // 01/08/2024
  MONTH_YEAR = 'MONTH_YEAR',                   // January 2025
  MONTH_YEAR_SHORT = 'MONTH_YEAR_SHORT'        // Jan 2025
}

// Type for date format keys
/**
 * Parses and formats a date string according to the specified format type
 * @param date - The date string to parse
 * @param type - The format type from DateFormat enum
 * @returns Formatted date string or empty string if date is invalid
 */
export function parseDateTimeString(date: string | Date | null | undefined, type: DateFormat): string {
  if (!date) return "";

  const formatMap = {
    [DateFormat.FULL_DATE_TIME]: () => moment(date).format("MMMM D, YYYY [at] h:mm A"),
    [DateFormat.FULL_DATE]: () => moment(date).format("MMMM D, YYYY"),
    [DateFormat.SHORT_DATE]: () => moment(date).format("MMM D, YYYY"),
    [DateFormat.RELATIVE_TIME]: () => moment(date).fromNow(),
    [DateFormat.ISO_DATE]: () => moment(date).format("YYYY-MM-DD"),
    [DateFormat.US_DATE]: () => moment(date).format("MM/DD/YYYY"),
    [DateFormat.SHORT_DATE_TIME]: () => moment(date).format("MMM D, YYYY hh:mm A"),
    [DateFormat.DASH_DATE]: () => moment(date).format("MM-DD-YYYY"),
    [DateFormat.TIME_12H]: () => moment(date, "HH:mm:ss").format("hh:mm A"),
    [DateFormat.UTC_TO_LOCAL_TIME]: () => moment.utc(date, "HH:mm:ss").local().format("hh:mm A"),
    [DateFormat.FULL_DATE_TIME_NO_AT]: () => moment(date).format("MMMM D, YYYY h:mm A"),
    [DateFormat.US_DATE_TIME]: () => moment(date).format("MM/DD/YYYY h:mm A"),
    [DateFormat.TIME_12H_ALT]: () => moment(date, "HH:mm:ss").format("hh:mm A"),
    [DateFormat.UPPER_SHORT_DATE]: () => moment(date).format("MMM D, YYYY").toUpperCase(),
    [DateFormat.UPPER_SHORT_DATE_TIME]: () => moment(date).format("MMM D, YYYY hh:mm A").toUpperCase(),
    [DateFormat.TIMEZONE_DATE]: () => moment(date).format("MMM D, YYYY [at] h:mm A [GMT]Z"),
    [DateFormat.EST_FORMAT]: () => moment(date).format("DD-MMM-YYYY/HH:mm [EST]"),
    [DateFormat.UTC_TO_LOCAL_FULL]: () => moment.utc(date, "YYYY-MM-DD HH:mm:ss").local().format("MMM D, YYYY hh:mm A"),
    [DateFormat.DAY_MONTH_YEAR]: () => moment(date).format("D MMM, YYYY"),
    [DateFormat.UTC_FULL]: () => moment.utc(date).format("MMM D, YYYY hh:mm A [(UTC)]"),
    [DateFormat.UTC_TIMESTAMP]: () => moment.utc(date).format("YYYY-MM-DD HH:mm:ss"),
    [DateFormat.DAY_MONTH_YEAR_ALT]: () => moment(date).format("D MMM, YYYY"),
    [DateFormat.UTC_TO_LOCAL_DATE]: () => moment.utc(date, "YYYY-MM-DD HH:mm:ss").local().format("MM/DD/YYYY"),
    [DateFormat.MONTH_YEAR]: () => moment(date).format("MMMM YYYY"),
    [DateFormat.MONTH_YEAR_SHORT]: () => moment(date).format("MMM YYYY")
  };

  try {
    const formatter = formatMap[type];
    return formatter ? formatter() : String(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return "";
  }
}

/**
 * Converts a UTC date string to local time
 * @param utcDate - UTC date string
 * @returns Local date string
 */
export function utcToLocal(utcDate: string): string {
  return parseDateTimeString(utcDate, DateFormat.UTC_TO_LOCAL_FULL);
}

/**
 * Formats a date to relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function toRelativeTime(date: string | Date): string {
  return parseDateTimeString(date, DateFormat.RELATIVE_TIME);
}

/**
 * Checks if a date string is valid
 * @param date - Date string to validate
 * @returns Boolean indicating if the date is valid
 */
export function isValidDate(date: string): boolean {
  return moment(date).isValid();
}

/**
 * Gets the current date in the specified format
 * @param format - Format type from DateFormat enum
 * @returns Formatted current date string
 */
export function getCurrentDate(format: DateFormat = DateFormat.FULL_DATE): string {
  return parseDateTimeString(new Date(), format);
}

/**
 * Adds time to a date
 * @param date - Base date
 * @param amount - Amount to add
 * @param unit - Unit of time (day, month, year, etc.)
 * @param format - Output format type from DateFormat enum
 * @returns Formatted date string
 */
export function addTime(
  date: string | Date,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor,
  format: DateFormat = DateFormat.FULL_DATE
): string {
  const newDate = moment(date).add(amount, unit);
  return parseDateTimeString(newDate.toDate(), format);
}

/**
 * Gets the difference between two dates in the specified unit
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Unit of time for the difference
 * @returns Number representing the difference
 */
export function getDateDifference(
  date1: string | Date,
  date2: string | Date,
  unit: moment.unitOfTime.Diff = 'days'
): number {
  return moment(date1).diff(moment(date2), unit);
}