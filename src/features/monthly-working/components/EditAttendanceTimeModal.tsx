import {
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { createRef, FC, RefObject, useRef, useState } from "react";
import { BaseButton } from "../../../common/components/base/BaseButton";
import { formatHHmm } from "../../../common/util/time-format";
import { AttendanceTime } from "../../model/AttendanceTime.type";
import { TimeRecordMethod } from "../../model/TimeRecordMethod";
import { useUpdateAttendanceTime } from "../../model/hooks/use-update-attendance-time";
import { AttendanceTimes } from "../../view-model/AttendanceTimes.type";

interface EditAttendanceTimeModalProps {
  date: string | undefined;
  times: AttendanceTimes | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSaveAsync?: () => Promise<void>;
}
interface HasErrorsState {
  attendance: boolean;
  leave: boolean;
  stepOut: boolean;
  stepIn: boolean;
}
const EditAttendanceTimeModal: FC<EditAttendanceTimeModalProps> = ({
  date,
  times,
  isOpen,
  onClose,
  onSaveAsync,
}) => {
  const refs = useRef<Array<RefObject<HTMLInputElement>>>([]);
  const attendanceRefIndex = 0;
  const leaveRefIndex = 1;
  const stepOutRefIndex = 2;
  const stepInRefIndex = 3;

  refs.current[attendanceRefIndex] = createRef();
  refs.current[leaveRefIndex] = createRef();
  refs.current[stepOutRefIndex] = createRef();
  refs.current[stepInRefIndex] = createRef();

  const [hasErrors, setHasErrors] = useState<HasErrorsState>({
    attendance: false,
    leave: false,
    stepOut: false,
    stepIn: false,
  });

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    timeRecordMethod: TimeRecordMethod
  ): void => {
    const value = e.target.value;
    try {
      const formated = formatHHmm(value);
      e.target.value = formated;
    } catch (error) {
      switch (timeRecordMethod) {
        case "Attendance":
          return setHasErrors({ ...hasErrors, attendance: true });
        case "Leave":
          return setHasErrors({ ...hasErrors, leave: true });
        case "StepOut":
          return setHasErrors({ ...hasErrors, stepOut: true });
        case "StepIn":
          return setHasErrors({ ...hasErrors, stepIn: true });
      }
    }

    switch (timeRecordMethod) {
      case "Attendance":
        return setHasErrors({ ...hasErrors, attendance: false });
      case "Leave":
        return setHasErrors({ ...hasErrors, leave: false });
      case "StepOut":
        return setHasErrors({ ...hasErrors, stepOut: false });
      case "StepIn":
        return setHasErrors({ ...hasErrors, stepIn: false });
    }
  };

  const toast = useToast();
  const handleSubmit = (): void => {
    if (date === undefined) return;

    if (
      hasErrors.attendance ||
      hasErrors.leave ||
      hasErrors.stepOut ||
      hasErrors.stepIn
    ) {
      toast({
        title: "不正な入力があります",
        status: "error",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    const attendanceHHmm = refs.current[attendanceRefIndex].current?.value;
    const leaveHHmm = refs.current[leaveRefIndex].current?.value;
    const stepOutHHmm = refs.current[stepOutRefIndex].current?.value;
    const stepInHHmm = refs.current[stepInRefIndex].current?.value;

    const records: AttendanceTime[] = [
      {
        method: "Attendance",
        date,
        hhmm: attendanceHHmm === undefined ? "" : attendanceHHmm,
      },
      { method: "Leave", date, hhmm: leaveHHmm === undefined ? "" : leaveHHmm },
      {
        method: "StepOut",
        date,
        hhmm: stepOutHHmm === undefined ? "" : stepOutHHmm,
      },
      {
        method: "StepIn",
        date,
        hhmm: stepInHHmm === undefined ? "" : stepInHHmm,
      },
    ];

    (async (): Promise<void> => {
      await Promise.all(useUpdateAttendanceTime(records));
      onSaveAsync != null && (await onSaveAsync());
      await onClose();
    })().catch(console.error);
  };

  return (
    <>
      {date !== undefined && times != null && (
        <Modal
          initialFocusRef={refs.current[0]}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{`${date}の勤怠を編集する`}</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody pb={6}>
              <VStack alignItems={"flex-start"} flexBasis={100}>
                <Text fontSize={16}>出退勤</Text>
                <HStack
                  border={"1px"}
                  borderRadius="md"
                  padding={4}
                  borderColor="#E2E8F0"
                >
                  <FormControl isInvalid={hasErrors.attendance}>
                    <Input
                      ref={refs.current[0]}
                      defaultValue={times.attendance?.time}
                      onBlur={(e) => handleBlur(e, "Attendance")}
                      size="sm"
                    />
                    <FormErrorMessage>
                      <Text fontSize={12}>hh:mm形式に変換できません</Text>
                    </FormErrorMessage>
                  </FormControl>
                  <Text>〜</Text>

                  <FormControl isInvalid={hasErrors.leave}>
                    <Input
                      ref={refs.current[1]}
                      defaultValue={times.leave?.time}
                      onBlur={(e) => handleBlur(e, "Leave")}
                      size="sm"
                    />
                    <FormErrorMessage minH={50}>
                      <Text fontSize={12}>hh:mm形式に変換できません</Text>
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <Text fontSize={16}>中抜け</Text>
                <HStack
                  border={"1px"}
                  borderRadius="md"
                  padding={4}
                  borderColor="#E2E8F0"
                >
                  <FormControl isInvalid={hasErrors.stepOut}>
                    <Input
                      ref={refs.current[2]}
                      defaultValue={times.stepOut?.time}
                      onBlur={(e) => handleBlur(e, "StepOut")}
                      size="sm"
                    />
                    <FormErrorMessage>
                      <Text fontSize={12}>hh:mm形式に変換できません</Text>
                    </FormErrorMessage>
                  </FormControl>
                  <Text>〜</Text>
                  <FormControl isInvalid={hasErrors.stepIn}>
                    <Input
                      ref={refs.current[3]}
                      defaultValue={times.stepIn?.time}
                      onBlur={(e) => handleBlur(e, "StepIn")}
                      size="sm"
                    />
                    <FormErrorMessage>
                      <Text fontSize={12}>hh:mm形式に変換できません</Text>
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <BaseButton
                onClick={() => {
                  handleSubmit();
                }}
                label="保存"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export { EditAttendanceTimeModal };
