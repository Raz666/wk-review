import React from "react";
import { ActivityIndicator } from "react-native";

import { H2, Divider } from "../../styles";
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

  const getTitle = (object: SubjectType) => {
    switch (object) {
      case "radical":
        return "Found In Knaji";
      case "vocabulary":
        return "Kanji Composition";
      default:
        return "Found In Vocabulary";
    }
  };
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
      <H2>{getTitle(type)}</H2>
      <Divider />

      <SubjectList
        type={getSubjectListType(type)}
        subjects={data.data}
        goToSubject={goToSubject}
      />
    </>
  ) : null;
};
