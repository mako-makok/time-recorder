import dayjs from "dayjs";
import { saveAttendanceTime } from "../../model/hooks/save-attendance-time";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";

const useTimeRecord = (method: TimeRecordMethod) => {
  const now = dayjs();
  const date = now.format("YYYY-MM-DD");
  const hhmm = toHHmm(now);
  saveAttendanceTime({ method, date, hhmm });
};

const toHHmm = (dayjs: dayjs.Dayjs) => dayjs.format("HH:mm");

export { useTimeRecord };
