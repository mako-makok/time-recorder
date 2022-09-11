import { stringValueIsNumber } from "./string-util";

const years = [2022, 2023] as const;
type Year = typeof years[number];

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type Month = typeof months[number];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
type Day = typeof days[number];

type MonthDay = Record<Month, Day[]>;
const monthDay: MonthDay = months.reduce((acc, month) => {
  switch (month) {
    case 2:
      // TODO: 閏日の考慮
      return { ...acc, [month]: days.slice(0, 28) };
    case 4:
      return { ...acc, [month]: days.slice(0, 30) };
    case 6:
      return { ...acc, [month]: days.slice(0, 30) };
    case 9:
      return { ...acc, [month]: days.slice(0, 30) };
    case 11:
      return { ...acc, [month]: days.slice(0, 30) };
    default:
      return { ...acc, [month]: days };
  }
}, {} as MonthDay);

type YearMonthDay = Record<Year, MonthDay>;
const yearMonthDay: YearMonthDay = years.reduce(
  (acc, year) => ({
    ...acc,
    [year]: monthDay,
  }),
  {} as YearMonthDay
);

const isYear = (value: string | number): value is Year => {
  const _years: number[] = [...years];
  switch (typeof value) {
    case "number": {
      return _years.includes(value);
    }
    case "string": {
      return stringValueIsNumber(value) && _years.includes(Number(value));
    }
    default:
      return false;
  }
};

const isMonth = (value: string | number): value is Month => {
  const _months: number[] = [...months];
  switch (typeof value) {
    case "number": {
      return _months.includes(value);
    }
    case "string": {
      return stringValueIsNumber(value) && _months.includes(Number(value));
    }
    default:
      return false;
  }
};

export { years, months, yearMonthDay, isMonth, isYear };
export type { Year, Month, Day };
