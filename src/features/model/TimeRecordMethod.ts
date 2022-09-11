const timeRecordMethods = ["Attendance", "Leave", "StepOut", "StepIn"] as const;
type TimeRecordMethods = typeof timeRecordMethods;
type TimeRecordMethod = TimeRecordMethods[number];

export { timeRecordMethods };
export type { TimeRecordMethods, TimeRecordMethod };
