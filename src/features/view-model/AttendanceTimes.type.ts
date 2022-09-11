type Time = {
  time: string;
};
type AttendanceTimes = {
  attendance?: Time;
  leave?: Time;
  stepOut?: Time;
  stepIn?: Time;
};

export type { AttendanceTimes };
