import { Select, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface BaseSelectProps {
  title: string;
  items: Array<{
    content: string;
    value: string;
  }>;
  onChange: (value: string) => void;
  defaultValue?: string;
}
const BaseSelect: FC<BaseSelectProps> = ({
  title,
  items,
  onChange,
  defaultValue,
}) => {
  return (
    <VStack alignItems={"flex-start"}>
      <Text fontSize="xs" color={"#92929d"}>
        {title}
      </Text>
      <Select
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        size={"sm"}
        variant="outline"
      >
        {items.map(({ value, content }) => (
          <option key={value} value={value}>
            {content}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

export { BaseSelect };
export type { BaseSelectProps };
