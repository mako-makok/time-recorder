import { useToast } from "@chakra-ui/react";
import { BaseButton } from "../../../common/components/base/BaseButton";
import { useTimeRecord } from "../hooks/use-time-record";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";
import { FC } from "react";

const method: TimeRecordMethod = "Leave";

const LeaveButton: FC = () => {
  const toast = useToast();
  return (
    <BaseButton
      label={"退勤"}
      onClick={() => {
        useTimeRecord(method);

        toast({
          title: "退勤打刻をしました",
          description: "今日も一日お疲れさまでした！",
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      }}
    />
  );
};

export { LeaveButton };
