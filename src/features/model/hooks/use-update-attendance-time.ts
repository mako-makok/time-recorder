import { saveAttendanceTime } from "./save-attendance-time";
import { AttendanceTime } from "./use-attendance-times";

const useUpdateAttendanceTime = (
  props: AttendanceTime[]
): Array<Promise<void>> => {
  return props.map(
    async (attendanceTime) => await saveAttendanceTime(attendanceTime)
  );
};
export { useUpdateAttendanceTime };
