import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AttendanceTime } from "../AttendanceTime.type";
import { TimeRecordMethod, timeRecordMethods } from "../TimeRecordMethod";
import {
  Day,
  isMonth,
  isYear,
  yearMonthDay,
} from "../../../common/util/date-map";
import { generateKeys } from "./generate-key";

type UseAttendanceTime = (props: { year: string; month: string }) => {
  attendanceTimes: AttendanceTime[];
  mutate: () => Promise<void>;
};

const useAttendanceTimes: UseAttendanceTime = ({ year, month }) => {
  if (!isYear(year) || !isMonth(month)) throw new Error();

  const days: Day[] = yearMonthDay[year][month];
  const keys: string[] = days.reduce<string[]>((acc, day) => {
    return [
      ...acc,
      ...generateKeys({
        methods: timeRecordMethods,
        year,
        month,
        day: day.toString(),
      }),
    ];
  }, []);
  const [attendanceTimes, setAttendanceTimes] = useState<AttendanceTime[]>([]);
  useEffect(() => {
    const featcher = async (): Promise<void> => {
      const attendanceTimeByMethodAndDate: Record<string, string> =
        await chrome.storage.local.get(keys);
      setAttendanceTimes(
        Object.keys(attendanceTimeByMethodAndDate).map((key) => {
          const [method, year, month, day] = key.split("-");
          const hhmm: string = attendanceTimeByMethodAndDate[key];
          const _method = method as TimeRecordMethod;
          return {
            method: _method,
            date: `${year}-${month}-${day}`,
            hhmm,
          };
        })
      );
    };
    featcher().catch(console.error);
  }, [year, month]);

  const mutate = async (): Promise<void> =>
    await fetch(keys, setAttendanceTimes);

  return { attendanceTimes, mutate };
};

const fetch = async (
  keys: string[],
  setAttendanceTimes: Dispatch<SetStateAction<AttendanceTime[]>>
): Promise<void> => {
  const attendanceTimeByMethodAndDate: Record<string, string> =
    await chrome.storage.local.get(keys);
  setAttendanceTimes(
    Object.keys(attendanceTimeByMethodAndDate).map((key) => {
      const [method, year, month, day] = key.split("-");
      const hhmm: string = attendanceTimeByMethodAndDate[key];
      const _method = method as TimeRecordMethod;
      return {
        method: _method,
        date: `${year}-${month}-${day}`,
        hhmm,
      };
    })
  );
};

export { useAttendanceTimes };
export type { AttendanceTime };
