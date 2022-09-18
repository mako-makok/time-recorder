import dayjs from "dayjs";
import { saveAttendanceTime } from "../../model/hooks/save-attendance-time";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";

const useTimeRecord = (method: TimeRecordMethod): void => {
  const now = dayjs();
  const date = now.format("YYYY-MM-DD");
  const hhmm = toHHmm(now);
  saveAttendanceTime({ method, date, hhmm }).catch(console.error);
};

const toHHmm = (dayjs: dayjs.Dayjs): string => dayjs.format("HH:mm");

export { useTimeRecord };
