import React from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

import { useGetSubjectQuery } from "../api/subjectApi";
import { SubjectPage } from "./Subject";

export const WaniKani = () => {
  const {
    isError: isErrorSubject,
    isFetching: isFetchingSubject,
    data: subject,
  } = useGetSubjectQuery({ subjectId: 1553 });

  const isLoading = isFetchingSubject;
  const isError = isErrorSubject;

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {subject ? <SubjectPage subject={subject} /> : null}

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
