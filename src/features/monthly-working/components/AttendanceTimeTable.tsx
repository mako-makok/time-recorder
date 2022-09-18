import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
  HStack,
  useDisclosure,
  BackgroundProps,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { EditAttendanceTimeModal } from "./EditAttendanceTimeModal";
import { FC, useState } from "react";
import { AttendanceTimes } from "../../view-model/AttendanceTimes.type";
import dayjs from "dayjs";

type AttendanceTimeRecord = Record<string, AttendanceTimes>;
interface AttendanceTimeTableProps {
  timeByDate: AttendanceTimeRecord;
  mutate: () => Promise<void>;
}
interface CurrentTimesState {
  date: string;
  times: AttendanceTimes;
}
const AttendanceTimeTable: FC<AttendanceTimeTableProps> = ({
  timeByDate,
  mutate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const [currentTimes, setCurrentTimes] = useState<
    CurrentTimesState | undefined
  >(undefined);
  const handleClick = (date: string, times: AttendanceTimes): void => {
    setCurrentTimes({ date, times });
    onOpen();
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th>出勤</Th>
            <Th>退勤</Th>
            <Th>お昼開始</Th>
            <Th>お昼終了</Th>
            <Th>中抜け開始</Th>
            <Th>中抜け終了</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr></Tr>
          {Object.keys(timeByDate).map((date) => {
            const [year, month, day] = date.split("-");
            const dayjsDay = dayjs(date).day();
            return (
              <Tr
                key={`${year}${month}${day}`}
                backgroundColor={getBackgroundColor(dayjsDay)}
              >
                <Td>
                  <HStack>
                    <Text>{`${day}日 ${displayDayMap[dayjsDay]}`}</Text>
                    <IconButton
                      aria-label="edit attendance time"
                      variant="outline"
                      size="xs"
                      icon={<EditIcon />}
                      onClick={() => {
                        handleClick(date, timeByDate[date]);
                      }}
                    />
                  </HStack>
                </Td>
                <Td>{timeByDate[date].attendance?.time}</Td>
                <Td>{timeByDate[date].leave?.time}</Td>
                <Td>12:00</Td>
                <Td>13:00</Td>
                <Td>{timeByDate[date].stepOut?.time}</Td>
                <Td>{timeByDate[date].stepIn?.time}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <EditAttendanceTimeModal
        date={currentTimes?.date}
        times={currentTimes?.times}
        isOpen={isOpen}
        onClose={onClose}
        onSaveAsync={mutate}
      />
    </TableContainer>
  );
};

const Sunday = 0;
const Saturday = 6;
const getBackgroundColor = (
  day: number
): BackgroundProps["backgroundColor"] | undefined => {
  switch (day) {
    case Sunday:
      return "red.50";
    case Saturday:
      return "blue.50";
    default:
      return undefined;
  }
};

const displayDayMap: Record<number, string> = {
  0: " (日)",
  1: " (月)",
  2: " (火)",
  3: " (水)",
  4: " (木)",
  5: " (金)",
  6: " (土)",
};

export { AttendanceTimeTable };
export type { AttendanceTimeRecord };
