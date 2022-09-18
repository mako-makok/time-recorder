import { ChakraProvider } from "@chakra-ui/react";
import { RootContainer } from "./RootContainer";

function App(): JSX.Element {
  return (
    <ChakraProvider>
      <RootContainer />
    </ChakraProvider>
  );
}

export default App;
