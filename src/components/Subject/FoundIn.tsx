import React from "react";
import { ActivityIndicator } from "react-native";

import { SubjectType } from "../../api/models";
import { SubjectList } from "../common";
import { useGetSubjectsQuery } from "../../api/subjectApi";

type Props = {
  type: SubjectType;
  goToSubject: (subjectId: number) => void;
  subjectIds?: number[];
};

export const FoundIn = ({ subjectIds, type, goToSubject }: Props) => {
  const { data, isFetching } = useGetSubjectsQuery({
    subjectIds: subjectIds ?? [],
  });

  const getSubjectListType = (object: SubjectType): SubjectType => {
    switch (object) {
      case "kanji":
        return "vocabulary";
      default:
        return "kanji";
    }
  };

  return isFetching ? (
    <ActivityIndicator />
  ) : data ? (
    <>
      <SubjectList
        type={getSubjectListType(type)}
        subjects={data.data}
        goToSubject={goToSubject}
      />
    </>
  ) : (
    <></>
  );
};
