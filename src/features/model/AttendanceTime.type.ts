import { TimeRecordMethod } from "./TimeRecordMethod";

type AttendanceTime = {
  method: TimeRecordMethod;
  date: string; // yyyy-mm-dd
  hhmm: string;
};

export type { AttendanceTime };
