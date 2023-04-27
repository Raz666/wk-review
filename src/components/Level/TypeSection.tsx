import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { SubjectType } from "../../api/models";
import { H1 } from "../../styles";
import { AssignedSubjectResource, ProgressBar, SubjectList } from "../common";

type Props = {
  type: SubjectType;
  header: string;
  subjects: AssignedSubjectResource[];
};

export const TypeSection = ({ type, header, subjects }: Props) => {
  const sortedSubjects = subjects.sort((a, b) => {
    const aMeaning = a.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");
    const bMeaning = b.data.meanings
      .find((m) => m.primary)
      ?.meaning?.replaceAll(" ", "");

    return aMeaning && bMeaning ? aMeaning?.localeCompare(bMeaning) : -1;
  });
  const subjectCount = subjects.length;
  const unlockedSubjectCount = subjects.reduce(
    (acc, s) => (!s.isLocked ? acc + 1 : acc),
    0
  );

  return (
    <Col>
      <View>
        <Header>{header}</Header>
        <ProgressBar count={unlockedSubjectCount} total={subjectCount} />
      </View>
      <View>
        <SubjectList type={type} subjects={sortedSubjects} />
      </View>
    </Col>
  );
};

const Col = styled.View`
  gap: 4px;
`;

const Header = styled(H1)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
