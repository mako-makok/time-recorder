import { useToast } from "@chakra-ui/react";
import { BaseButton } from "../../../common/components/base/BaseButton";
import { useTimeRecord } from "../hooks/use-time-record";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";
import { FC } from "react";

const method: TimeRecordMethod = "StepIn";

const StepInButton: FC = () => {
  const toast = useToast();
  return (
    <BaseButton
      label={"中抜け終了"}
      onClick={() => {
        useTimeRecord(method);
        toast({
          title: "中抜け終了打刻をしました",
          description: "残りも頑張りましょう！",
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      }}
    />
  );
};

export { StepInButton };
