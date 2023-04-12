import React from "react";
import styled from "@emotion/native";

import { SubjectsCollection } from "../../api/models";
import { SubjectList } from "../common";
import { H1, H2, H3, P } from "../../styles";
import { TypeSection } from "./TypeSection";
import { numberToPx } from "../../styles/helpers";
import { Legend } from "./Legend";

type Props = {
  subjects: SubjectsCollection;
  goToSubject: (subjectId: number) => void;
};

export const Level = ({ subjects, goToSubject }: Props) => {
  const radicals = subjects.data.filter((d) => d.object === "radical");
  const kanji = subjects.data.filter((d) => d.object === "kanji");
  const vocabs = subjects.data.filter((d) => d.object === "vocabulary");
  const level = subjects.data[0].data.level;

  return (
    <Container>
      <Col>
        <Row>
          <H1>Level {level}</H1>
          <StyledH2>Radicals, kanji & vocabulary</StyledH2>
        </Row>

        <Legend />

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

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledH2 = styled(H3)`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-transform: capitalize;
`;
