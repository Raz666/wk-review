import { StyleSheet, View, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@emotion/react";

import { store } from "./src/store/store";
import { lightTheme } from "./src/styles";
import { WaniKani } from "./src/components/WaniKani";

export default function App() {
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={scheme === "dark" ? lightTheme : lightTheme}>
        <View style={styles.container}>
          <WaniKani />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#eee",
  },
});
