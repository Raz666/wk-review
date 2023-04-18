import React from "react";
import { View } from "react-native";
import styled from "@emotion/native";

import { SubjectResource, SubjectType } from "../../api/models";
import { H1 } from "../../styles";
import { SubjectList } from "../common";
import { AssignedSubjectResource } from "./models";

type Props = {
  type: SubjectType;
  header: string;
  subjects: AssignedSubjectResource[];
  goToSubject: (subjectId: number) => void;
};

export const TypeSection = ({ type, header, subjects, goToSubject }: Props) => {
  return (
    <View>
      <Header>{header}</Header>
      <SubjectList type={type} subjects={subjects} goToSubject={goToSubject} />
    </View>
  );
};

const Header = styled(H1)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
