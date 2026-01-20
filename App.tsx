/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import MainScreen from "./src/screens";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

function App() {
  const navigationRef = useNavigationContainerRef();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <MainScreen />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
