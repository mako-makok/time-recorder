import { AttendanceTime } from "../AttendanceTime.type";
import { generateKey } from "./generate-key";

const saveAttendanceTime = async ({
  method,
  date,
  hhmm,
}: AttendanceTime): Promise<void> => {
  const key = generateKey({ method, date });
  const record = { [key]: hhmm };
  await chrome.storage.local.remove(key);
  await chrome.storage.local.set(record);
};

export { saveAttendanceTime };
