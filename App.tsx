import { StyleSheet, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@emotion/react";

import { store } from "./src/store/store";
import { lightTheme } from "./src/styles";
import { WaniKani } from "./src/components/WaniKani";
import { RootStackParams } from "./src/components/navigation.models";

export default function App() {
  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Provider store={store}>
      <ThemeProvider theme={scheme === "dark" ? lightTheme : lightTheme}>
        <NavigationContainer>
          {/* <View style={styles.container}>
            <WaniKani />
            <StatusBar style="auto" />
          </View> */}
          <Stack.Navigator>
            <Stack.Screen name="Subject" options={{ headerShown: false }}>
              {(props) => (
                <WaniKani
                  {...props}
                  route={{
                    key: "1",
                    name: "Subject",
                    params: { subjectId: props?.route?.params?.subjectId ?? 1 },
                  }}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
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
