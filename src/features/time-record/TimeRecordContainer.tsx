import { ButtonGroup, Center, Container, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { AttendanceButton } from "./components/AttendanceButton";
import { Clock } from "./components/Clock";
import { LeaveButton } from "./components/LeaveButton";
import { StepInButton } from "./components/StepInButton";
import { StepOutButton } from "./components/StepOutButton";

const TimeRecordContainer: FC = () => {
  const spacing = 4;
  return (
    <Container>
      <Center h={"100%"}>
        <VStack spacing={spacing}>
          <Clock />
          <ButtonGroup variant="outline">
            <AttendanceButton />
            <LeaveButton />
          </ButtonGroup>
          <ButtonGroup variant="outline">
            <StepOutButton />
            <StepInButton />
          </ButtonGroup>
        </VStack>
      </Center>
    </Container>
  );
};

export { TimeRecordContainer };
