import { Container, Divider, HStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import {
  BaseSelect,
  BaseSelectProps,
} from "../../common/components/base/BaseSelect";
import {
  Day,
  Month,
  months,
  Year,
  yearMonthDay,
  years,
} from "../../common/util/date-map";
import {
  AttendanceTimeTable,
  AttendanceTimeRecord,
} from "./components/AttendanceTimeTable";
import {
  AttendanceTime,
  useAttendanceTimes,
} from "../model/hooks/use-attendance-times";
import { useState } from "react";
import { toYYYYMMDD } from "../../common/util/date-util";

const MonthlyWorkingContainer = () => {
  const now = dayjs();
  const nowYear = now.year().toString();
  const nowMonth = (now.month() + 1).toString();
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: string;
    month: string;
  }>({
    year: nowYear,
    month: nowMonth,
  });

  const { attendanceTimes, mutate } = useAttendanceTimes(selectedYearMonth);
  const yearMenuItems: BaseSelectProps["items"] = years.map((year) => ({
    content: year.toString(),
    value: year.toString(),
  }));

  const monthMenuItems: BaseSelectProps["items"] = months.map((month) => ({
    content: month.toString(),
    value: month.toString(),
  }));

  return (
    <Container h={"full"} maxW={"100%"} margin={0}>
      <HStack>
        <BaseSelect
          title="年"
          items={yearMenuItems}
          onChange={(value: string) => {
            setSelectedYearMonth({ ...selectedYearMonth, year: value });
          }}
          defaultValue={nowYear}
        />
        <BaseSelect
          title="月"
          items={monthMenuItems}
          onChange={(value: string) => {
            setSelectedYearMonth({ ...selectedYearMonth, month: value });
          }}
          defaultValue={nowMonth}
        />
      </HStack>
      <Divider marginTop={4} marginBottom={8} />
      <AttendanceTimeTable
        timeByDate={toAttendanceTimeTableProps({
          attendanceTimes,
          ...selectedYearMonth,
          days: yearMonthDay[Number(selectedYearMonth.year) as Year][
            Number(selectedYearMonth.month) as Month
          ],
        })}
        mutate={mutate}
      />
    </Container>
  );
};

type toAttendanceTimeTablePropsType = ({
  attendanceTimes,
  year,
  month,
  days,
}: {
  attendanceTimes: Array<AttendanceTime>;
  year: string;
  month: string;
  days: Day[];
}) => AttendanceTimeRecord;
const toAttendanceTimeTableProps: toAttendanceTimeTablePropsType = ({
  attendanceTimes,
  year,
  month,
  days,
}) => {
  const records = attendanceTimes.reduce((acc, attendanceTime) => {
    const date = attendanceTime.date;
    const attendanceTimeTableProp = acc[date];

    const time = attendanceTime.hhmm;

    if (attendanceTimeTableProp) {
      switch (attendanceTime.method) {
        case "Attendance": {
          acc[date].attendance = { time };
          return acc;
        }
        case "Leave": {
          acc[date].leave = { time };
          return acc;
        }
        case "StepOut": {
          acc[date].stepOut = { time };
          return acc;
        }
        case "StepIn": {
          acc[date].stepIn = { time };
          return acc;
        }
      }
    }

    switch (attendanceTime.method) {
      case "Attendance": {
        return { ...acc, ...{ [date]: { attendance: { time } } } };
      }
      case "Leave": {
        return { ...acc, ...{ [date]: { leave: { time } } } };
      }
      case "StepOut": {
        return { ...acc, ...{ [date]: { stepOut: { time } } } };
      }
      case "StepIn": {
        return { ...acc, ...{ [date]: { stepIn: { time } } } };
      }
    }
  }, {} as AttendanceTimeRecord);
  console.log(yearMonthDay);
  return {
    ...days.reduce(
      (acc, day) => ({
        ...acc,
        [toYYYYMMDD({ year, month, day: day.toString() })]: {},
      }),
      {} as AttendanceTimeRecord
    ),
    ...records,
  };
};

export { MonthlyWorkingContainer };
