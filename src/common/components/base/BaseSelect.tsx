import { Select, Text, VStack } from "@chakra-ui/react";

type BaseSelectProps = {
  title: string;
  items: {
    content: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  defaultValue?: string;
};
const BaseSelect = ({
  title,
  items,
  onChange,
  defaultValue,
}: BaseSelectProps) => {
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
