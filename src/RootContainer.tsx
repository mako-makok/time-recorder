import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { BaseTab } from "./common/components/base/BaseTab";
import { MonthlyWorkingContainer } from "./features/monthly-working/MonthlyWorkingContainer";
import { TimeRecordContainer } from "./features/time-record/TimeRecordContainer";

const RootContainer: FC = () => {
  return (
    <Box height={"800px"} width={"800px"} padding="2">
      <BaseTab
        items={[
          { name: "打刻する", children: <TimeRecordContainer /> },
          { name: "勤怠を編集する", children: <MonthlyWorkingContainer /> },
        ]}
      ></BaseTab>
    </Box>
  );
};

export { RootContainer };
