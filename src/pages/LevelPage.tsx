import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

import { useGetSubjectsQuery } from "../api/subjectApi";
import { RootStackParams } from "../navigation/navigation.models";
import { Level, Subject } from "../components";

type Props = NativeStackScreenProps<RootStackParams, "Level">;
export const LevelPage = ({ navigation, route }: Props) => {
  const { levels } = route.params;
  const {
    isError: isErrorSubject,
    isFetching: isFetchingSubject,
    data: subjects,
  } = useGetSubjectsQuery({ levels: levels });

  const isLoading = isFetchingSubject;
  const isError = isErrorSubject;

  const goToSubject = (subjectId: number) => {
    navigation.push("Subject", { subjectId: subjectId });
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {subjects ? (
            <Level subjects={subjects} goToSubject={goToSubject} />
          ) : null}

          {isError ? <Text>{isError.toString()}</Text> : null}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});