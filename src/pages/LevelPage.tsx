import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, ScrollView } from "react-native";

import { useGetAssignmentsQuery, useGetSubjectsQuery } from "../api/subjectApi";
import { RootStackParams } from "../navigation/navigation.models";
import { Level } from "../components";

type Props = NativeStackScreenProps<RootStackParams, "Level">;
export const LevelPage = ({ route }: Props) => {
  const { levels } = route.params;
  const {
    isError: isErrorSubject,
    isFetching: isFetchingSubject,
    data: subjects,
  } = useGetSubjectsQuery({ levels: levels });
  const {
    isError: isErrorAssignment,
    isFetching: isFetchingAssignment,
    data: assignments,
  } = useGetAssignmentsQuery({ levels: levels });

  const isLoading = isFetchingSubject || isFetchingAssignment;
  const isError = isErrorSubject || isErrorAssignment;

  const [ref, setRef] = useState<ScrollView | null>(null);

  return (
    <ScrollView style={styles.container} ref={(ref) => setRef(ref)}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {subjects && subjects.data && assignments && assignments.data ? (
            <Level
              subjects={subjects.data}
              assignments={assignments.data}
              scrollRef={ref}
            />
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
