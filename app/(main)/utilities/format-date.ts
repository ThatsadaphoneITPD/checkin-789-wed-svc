import dayjs from 'dayjs';

export function formatDate(date?: any, format: string = 'DD/MM/YYYY'): string {
  if (!date) return '';
  return dayjs(date).format(format);
}
export function formatDayMonth(date?: any, format: string = 'DD/MM'): string {
    if (!date) return '';
    return dayjs(date).format(format);
}
export function formatDay(date?: Date, format: string = 'DD'): string {
    if (!date) return '';
    return dayjs(date).format(format);
}
export function formatMonth(date?: Date, format: string = 'MM'): string {
    if (!date) return '';
    return dayjs(date).format(format);
}
export function getDayMonthYear(date?: Date): {day: string,  month: string; year: string } {
  if (!date) return { month: '', year: '' , day: ""}; // Return an object with empty values if no date is provided
  const day = dayjs(date).format('dd');
  const month = dayjs(date).format('MM');
  const year = dayjs(date).format('YYYY');
  return {day, month, year };
}
export function formatDate2(
  date?: Date,
  format: string = 'YYYY-MM-DD'
): string {
  if (!date) return '';
  return dayjs(date).format(format);
}
export function formatDateTime(
  date?: any,
  format: string = 'DD/MM/YYYY HH:mm:ss'
): string {
  if (!date) return '';
  return dayjs(date).format(format);
}
export function formatTime(
  date: string | Date | undefined
): string | undefined {
  if (date) {
    return dayjs(String(date)).format('HH:mm');
  }
}
export function formatNumber(value: number | string): string {
  if (!value) return '0';
  const formattedValue = Number(value).toFixed(0);
  return formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function formatNumber2(value: number | string): string {
  if (!value) return '0.00';
  const formattedValue = Number(value).toFixed(2);
  return formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const convertToDate = (yearMonthString: string) => {
  const year = parseInt(yearMonthString.substring(0, 4), 10);
  const month = parseInt(yearMonthString.substring(4, 6), 10) - 1; // JavaScript months are zero-indexed

  return new Date(year, month);
};

export const formatDateToMonthString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for the month
  return `${year}-${month}`;
};

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so we add 1
  const day = String(date.getDate()).padStart(2, '0');
  // console.log(` ddddd---->${year}${month}${day}`);

  return `${year}${month}${day}`;
};
export const formatYearMonth = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};
export const formatDateToMonthString2 = (date: string): string => {
  return date.slice(0, 7); // Keep the format YYYY-MM
};

export const convertDate = (dateString: string) => {
  // console.log('Converting date', dateString);
  if (dateString?.length !== 6) {
    throw new Error('Invalid date format. Expected YYYYMM.');
  }
  const year = dateString?.slice(0, 4);
  const month = dateString?.slice(4);
  return `${year}-${month}`;
};
export const parseStringToNumber = (value: string): number => {
  const parsed = parseFloat(value.replace(/,/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

export function formatDateMonthYear(dateString: string): string {
  if (dateString.length !== 6) {
    throw new Error('Invalid date string format. Expected YYYYMM.');
  }

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);

  return `${month}/${year}`;
}
