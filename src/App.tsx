import Views from "./Components/Views/Views";
import { ChakraProvider } from '@chakra-ui/react';
import GlobalProvider from "./Context/GlobalProvider";

function App() {
  
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Views />
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;