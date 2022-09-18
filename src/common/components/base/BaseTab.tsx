import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FC } from "react";

interface BaseTabItem {
  name: string;
  children: JSX.Element;
}
interface BaseTabProps {
  items: BaseTabItem[];
}

const BaseTab: FC<BaseTabProps> = ({ items }) => {
  return (
    <Tabs variant="enclosed" isLazy>
      <TabList padding={0}>
        {items.map((item) => (
          <Tab key={item.name}>{item.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {items.map((item) => (
          <TabPanel key={item.name}>{item.children}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export { BaseTab };
