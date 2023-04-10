import React from "react";
import styled from "@emotion/native";

import { SubjectsCollection } from "../../api/models";
import { SubjectList } from "../common";
import { H1 } from "../../styles";
import { TypeSection } from "./TypeSection";

type Props = {
  subjects: SubjectsCollection;
  goToSubject: (subjectId: number) => void;
};

export const Level = ({ subjects, goToSubject }: Props) => {
  const radicals = subjects.data.filter((d) => d.object === "radical");
  const kanji = subjects.data.filter((d) => d.object === "kanji");
  const vocabs = subjects.data.filter((d) => d.object === "vocabulary");

  return (
    <Container>
      <Col>
        <TypeSection
          type={"radical"}
          header="Radicals"
          subjects={radicals}
          goToSubject={goToSubject}
        />
        <TypeSection
          type={"kanji"}
          header="Kanji"
          subjects={kanji}
          goToSubject={goToSubject}
        />
        <TypeSection
          type={"vocabulary"}
          header="Vocabulary"
          subjects={vocabs}
          goToSubject={goToSubject}
        />
      </Col>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px 4px 30px 4px;
  background-color: "#eee";
`;

const Col = styled.View`
  flex-direction: column;
  gap: 24px;
`;

const Header = styled(H1)`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.hintBg};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
