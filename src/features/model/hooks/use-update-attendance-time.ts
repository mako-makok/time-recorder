import { saveAttendanceTime } from "./save-attendance-time";
import { AttendanceTime } from "./use-attendance-times";

const useUpdateAttendanceTime = (
  props: Array<AttendanceTime>
): Promise<void>[] => {
  return props.map((attendanceTime) => saveAttendanceTime(attendanceTime));
};
export { useUpdateAttendanceTime };
