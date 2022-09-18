import { useToast } from "@chakra-ui/react";
import { BaseButton } from "../../../common/components/base/BaseButton";
import { useTimeRecord } from "../hooks/use-time-record";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";
import { FC } from "react";

const method: TimeRecordMethod = "StepOut";

const StepOutButton: FC = () => {
  const toast = useToast();
  return (
    <BaseButton
      label={"中抜け開始"}
      onClick={() => {
        useTimeRecord(method);

        toast({
          title: "中抜け開始打刻をしました",
          description: "戻り次第忘れず中抜け終了打刻をしましょう",
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      }}
    />
  );
};

export { StepOutButton };
