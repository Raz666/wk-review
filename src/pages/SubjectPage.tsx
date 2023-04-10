import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

import { useGetSubjectQuery } from "../api/subjectApi";
import { RootStackParams } from "../navigation/navigation.models";
import { Subject } from "../components";

type Props = NativeStackScreenProps<RootStackParams, "Subject">;
export const SubjectPage = ({ navigation, route }: Props) => {
  const { subjectId } = route.params;
  const {
    isError: isErrorSubject,
    isFetching: isFetchingSubject,
    data: subject,
  } = useGetSubjectQuery({ subjectId: subjectId ?? 8456 });

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
          {subject ? (
            <Subject subject={subject} goToSubject={goToSubject} />
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