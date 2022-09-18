interface Time {
  time: string;
}
interface AttendanceTimes {
  attendance?: Time;
  leave?: Time;
  stepOut?: Time;
  stepIn?: Time;
}

export type { AttendanceTimes };
