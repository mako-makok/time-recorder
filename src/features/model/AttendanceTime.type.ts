import { TimeRecordMethod } from "./TimeRecordMethod";

interface AttendanceTime {
  method: TimeRecordMethod;
  date: string; // yyyy-mm-dd
  hhmm: string;
}

export type { AttendanceTime };
