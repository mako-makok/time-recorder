import { useToast } from "@chakra-ui/react";
import { BaseButton } from "../../../common/components/base/BaseButton";
import { useTimeRecord } from "../hooks/use-time-record";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";

const method: TimeRecordMethod = "Attendance";

const AttendanceButton = () => {
  const toast = useToast();

  const handleClick = () => {
    useTimeRecord(method);

    toast({
      title: "出勤打刻をしました",
      description: "今日も一日頑張りましょう！",
      status: "success",
      position: "top",
      duration: 1500,
      isClosable: true,
    });
  };

  return <BaseButton label={"出勤"} onClick={handleClick} />;
};

export { AttendanceButton };
