import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { SubjectResource, SubjectType } from "../../api/models";
import { H1 } from "../../styles";
import { AssignedSubjectResource, SubjectList } from "../common";

type Props = {
  type: SubjectType;
  header: string;
  subjects: AssignedSubjectResource[];
  goToSubject: (subjectId: number) => void;
};

export const TypeSection = ({ type, header, subjects, goToSubject }: Props) => {
  const sortedSubjects = subjects.sort((a, b) => {
    const aMeaning = a.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");
    const bMeaning = b.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");
    return aMeaning && bMeaning ? aMeaning?.localeCompare(bMeaning) : -1;
  });
  return (
    <View>
      <Header>{header}</Header>
      <SubjectList
        type={type}
        subjects={sortedSubjects}
        goToSubject={goToSubject}
      />
    </View>
  );
};

const Header = styled(H1)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
