import { Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTime } from "../hooks/use-time";

const Clock = () => {
  const time = useTime(1000);
  return <Text fontSize="6xl">{dayjs(time).format("HH:mm:ss")}</Text>;
};

export { Clock };
