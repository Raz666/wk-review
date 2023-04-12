import { StyleSheet, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@emotion/react";

import { store } from "./src/store/store";
import { lightTheme } from "./src/styles";
import { SubjectPage } from "./src/pages/SubjectPage";
import { RootStackParams } from "./src/navigation/navigation.models";
import { LevelPage } from "./src/pages/LevelPage";

export default function App() {
  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <Provider store={store}>
      <ThemeProvider theme={scheme === "dark" ? lightTheme : lightTheme}>
        <NavigationContainer>
          {/* <View style={styles.container}>
            <WaniKani />
            
          </View> */}
          <Stack.Navigator>
            <Stack.Screen name="Level" options={{ headerShown: false }}>
              {(props) => (
                <LevelPage
                  {...props}
                  route={{
                    key: "1",
                    name: "Level",
                    params: { levels: props?.route?.params?.levels ?? [31] },
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Subject" options={{ headerShown: false }}>
              {(props) => (
                <SubjectPage
                  {...props}
                  route={{
                    key: "2",
                    name: "Subject",
                    params: { subjectId: props?.route?.params?.subjectId ?? 1 },
                  }}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
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
