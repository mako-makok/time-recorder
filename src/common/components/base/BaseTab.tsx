import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

type BaseTabItem = {
  name: string;
  children: JSX.Element;
};
type BaseTabProps = {
  items: Array<BaseTabItem>;
};

const BaseTab = ({ items }: BaseTabProps) => {
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
